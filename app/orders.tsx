import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export type MaterialType = 'plastico' | 'vidro' | 'metal' | 'papel';
export type QuantityType = 'pequeno' | 'medio' | 'grande';
export type StatusType = 'pending' | 'approved' | 'rejected' | string;

export type RequestType = {
    id?: number;
    userId?: number;
    materialType: MaterialType;
    quantity: QuantityType;
    address: string;
    status: StatusType;
    createdAt?: string;
    updatedAt?: string;
};

export default function Order() {
    const router = useRouter();
    const [requests, setRequests] = useState<RequestType[]>([]);
    const [firstName, setFirstName] = useState<string>("");

    useEffect(() => {
        async function loadUser() {
            const sessionStr = await AsyncStorage.getItem('session');
            if (!sessionStr) return;

            const session = JSON.parse(sessionStr);
            setFirstName(session.name?.split(" ")[0] ?? "");
        }
        loadUser();
    }, []);

    function calcRP(material: MaterialType, quantity: QuantityType): number {
        let base = 0;

        switch (material) {
            case "plastico": base = 20; break;
            case "vidro": base = 25; break;
            case "metal": base = 40; break;
            case "papel": base = 15; break;
            default: base = 0;
        }

        const mult: Record<QuantityType, number> = {
            pequeno: 1,
            medio: 2.5,
            grande: 5
        };

        const m = mult[quantity] ?? 1;
        return Math.floor(base * m);
    }

    useEffect(() => {
        async function loadRequests() {
            try {
                const sessionStr = await AsyncStorage.getItem('session');
                if (!sessionStr) return;

                const session = JSON.parse(sessionStr);

                const response = await fetch(`http://192.168.15.12:3000/requests/user/${session.userId}`, {
                    credentials: 'include'
                });
                const data = await response.json();

                const arr: RequestType[] = Array.isArray(data) ? data : data.requests ?? [];
                setRequests(arr);


                let pending = 0, approved = 0, rejected = 0;

                arr.forEach(req => {
                    const rp = calcRP(req.materialType, req.quantity);
                    if (req.status === "pending") pending += rp;
                    else if (req.status === "approved") approved += rp;
                    else if (req.status === "rejected") rejected += rp;
                });

                await AsyncStorage.setItem('rpPendentes', pending.toString());
                await AsyncStorage.setItem('rpAprovadas', approved.toString());
                await AsyncStorage.setItem('rpRecusadas', rejected.toString());
            } catch (err) {
                console.log("Erro ao carregar solicitações:", err);
            }
        }

        loadRequests();
    }, []);

    function getStatusImage(status: StatusType) {
        switch (status) {
            case "pending":
                return require("@/assets/images/pendente.png");
            case "approved":
                return require("@/assets/images/aprovada.png");
            case "rejected":
                return require("@/assets/images/recusada.png");
            default:
                return require("@/assets/images/pendente.png");
        }
    }

    function getStatusName(status: StatusType) {
        switch (status) {
            case "pending": return "Pendente";
            case "approved": return "Aprovada";
            case "rejected": return "Recusada";
            default: return "Desconhecido";
        }
    }



    return (
        <View style={[styles.body]}>
            <View style={[styles.header]}>
                <View style={styles.containerUser}>
                    <View style={styles.user}>
                        <Image source={require('@/assets/images/profile.png')} style={styles.userImage}></Image>
                    </View>
                    <Text style={styles.text}>Olá, {firstName}</Text>
                </View>

                <View style={styles.containerLogo}>
                    <View style={styles.containerLeaf}>
                        <Button
                            variant="transparent"
                            onPress={() => router.replace('/newOrder')}
                        />
                    </View>
                </View>
            </View>

            <ScrollView style={{ width: "100%" }}>
                <View style={styles.main}>
                    <View style={styles.containerBack}>
                        <Button
                            variant="image"
                            imageSource={require('@/assets/images/voltar.png')}
                            onPress={() => router.back()}
                        />
                    </View>

                    <View style={styles.historyContainer}>
                        <Text style={styles.title}>Solicitações</Text>

                        <View style={styles.boxHistoryContainer}>
                            {requests.map((req: RequestType, index: number) => (
                                <View key={index} style={styles.box}>
                                    <View style={styles.imageHistoryContainer}>
                                        <Image
                                            source={getStatusImage(req.status)}
                                            style={styles.imageHistory}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.textBig}>
                                            {calcRP(req.materialType as MaterialType, req.quantity as QuantityType)} RP
                                        </Text>
                                        <Text style={styles.textSmall}>
                                            {getStatusName(req.status)}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#1D1D1D",
    },
    header: {
        backgroundColor: "#171717",
        width: "100%",
        height: 75,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        shadowColor: 'rgba(80, 230, 0, 1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 6,
        elevation: 25
    },
    containerUser: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    user: {
        width: 60,
        height: 60,
        borderRadius: 100,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: "#05FF3B"
    },
    userImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    // ADICIONEI containerLogo E containerLeaf pra evitar erro TS
    containerLogo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    containerLeaf: {
        width: 60,
        height: 60,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600' as any,
    },
    main: {
        width: "100%",
        alignItems: "center"
    },
    containerBack: {
        width: "100%",
        margin: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    historyContainer: {
        width: "90%",
        borderRadius: 10,
        gap: 15,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '700' as any,
    },
    boxHistoryContainer: {
        gap: 10
    },
    box: {
        height: 88,
        backgroundColor: "#282828",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        gap: 20,
        padding: 6
    },
    imageHistoryContainer: {
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    imageHistory: {
        width: 70,
        height: 70
    },
    textBig: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '600' as any,
    },
    textSmall: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600' as any,
    },
});

{/* <View style={styles.box}>
                                <View style={styles.imageHistoryContainer}>
                                    <Image source={require("@/assets/images/pendente.png")} style={styles.imageHistory}></Image>
                                </View>
                                <View>
                                    <Text style={styles.textBig}>300,32 RP</Text> 
                                    <Text style={styles.textSmall}>Pendente</Text>
                                </View>
                            </View>
                            <View style={styles.box}>
                                <View style={styles.imageHistoryContainer}>  
                                    <Image source={require("@/assets/images/aprovada.png")} style={styles.imageHistory}></Image>
                                </View>
                                <View>
                                    <Text style={styles.textBig}>750 RP</Text>
                                    <Text style={styles.textSmall}>Aprovada</Text>
                                </View>
                            </View>
                            <View style={styles.box}>
                                <View style={styles.imageHistoryContainer}> 
                                    <Image source={require("@/assets/images/recusada.png")} style={styles.imageHistory}></Image>
                                </View>
                                <View>
                                    <Text style={styles.textBig}>200 RP</Text>
                                    <Text style={styles.textSmall}>Recusada</Text>
                                </View>
                            </View> */}