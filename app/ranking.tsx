import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { MaterialType, QuantityType } from './orders';

export default function Ranking() {
    const router = useRouter();
    const [ranking, setRanking] = useState<any[]>([]);
    const [top3, setTop3] = useState<any[]>([]);

    // useEffect(() => {
    //     const fake = [
    //         { name: "Walter W.", rp: 102585 },
    //         { name: "Luigi G.", rp: 80244 },
    //         { name: "Peach", rp: 40868 },
    //         { name: "Sheldon Cooper", rp: 38244 },
    //         { name: "Leonard Rush", rp: 36524 },
    //         { name: "Rajad R. Kutrapali", rp: 35300 },
    //         { name: "Carl Galager", rp: 32444 },
    //         { name: "Fiona Galager", rp: 30103 },
    //         { name: "Philip Galager", rp: 16753 },
    //         { name: "Ian Galager", rp: 13666 },
    //         { name: "Lian Galager", rp: 11120 }
    //     ];

    //     setTop3(fake.slice(0, 3));
    //     setRanking(fake.slice(3));

    // }, []);
    useEffect(() => {
        async function loadRanking() {
            try {
                const res = await fetch("http://192.168.15.12:3000/api/ranking");
                const data = await res.json();

                // Ordenar garantido (caso o back falhe)
                data.sort((a: any, b: any) => b.points - a.points);

                setTop3(
                    data.slice(0, 3).map((u: { name: string; points: number }) => ({
                        name: u.name,
                        rp: u.points
                    }))
                );

                setRanking(
                    data.slice(3).map((u: { name: string; points: number }) => ({
                        name: u.name,
                        rp: u.points
                    }))
                );


            } catch (err) {
                console.log("Erro ao carregar ranking:", err);
            }
        }

        loadRanking();
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

        return Math.floor(base * (mult[quantity] ?? 1));
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#0D0D0D' }}>

            <View style={styles.header}>
                <View style={styles.containerBack}>
                    <Button
                        variant="image"
                        imageSource={require('@/assets/images/voltar.png')}
                        onPress={() => router.back()}
                    />
                </View>
            </View>

            <View style={styles.container}>

                <View style={styles.topArea}>

                    <View style={styles.topItem}>
                        <View style={[styles.pillar, { height: 120 }]}>
                            <Text style={styles.positionTop}>3º</Text>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.pillarValue}>
                                    {top3[2]?.rp.toLocaleString('pt-BR')}
                                </Text>

                                <View style={styles.topUserIcon} >
                                    <Image source={require('@/assets/images/profile.png')}></Image>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.topName}>{top3[2]?.name}</Text>
                    </View>

                    <View style={styles.topItem}>
                        <View style={[styles.pillar, styles.pillarCenter]}>
                            <Text style={styles.positionTop}>1º</Text>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.pillarValue, { color: '#000' }]}>
                                    {top3[0]?.rp.toLocaleString('pt-BR')}
                                </Text>


                                <View style={styles.topUserIcon} >
                                    <Image source={require('@/assets/images/profile.png')}></Image>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.topNameCenter}>{top3[0]?.name}</Text>
                    </View>

                    <View style={styles.topItem}>
                        <View style={[styles.pillar, { height: 135 }]}>
                            <Text style={styles.positionTop}>2º</Text>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.pillarValue}>
                                    {top3[1]?.rp.toLocaleString('pt-BR')}
                                </Text>

                                <View style={styles.topUserIcon} >
                                    <Image source={require('@/assets/images/profile.png')}></Image>
                                </View>
                            </View>
                        </View>
                        <Text style={styles.topName}>{top3[1]?.name}</Text>
                    </View>

                </View>

                <View style={styles.divider} />

                <FlatList
                    data={ranking}
                    keyExtractor={(item, index) => String(index)}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    renderItem={({ item, index }) => (
                        <View style={styles.card}>

                            <View style={styles.cardLeft}>
                                <View style={styles.cardUserIcon}>
                                    <Image source={require('@/assets/images/profile.png')}></Image>
                                </View>
                                <View>
                                    <Text style={styles.cardName}>{item.name}</Text>
                                    <Text style={styles.cardRP}>{item.rp.toLocaleString('pt-BR')} RP</Text>
                                </View>
                            </View>

                            <Text style={styles.cardPosition}>#{index + 4}</Text>
                        </View>
                    )}
                />

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D0D0D',
        paddingTop: 0,
        // paddingHorizontal: 22
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 20,
    },

    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginLeft: 10,
    },

    topArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        marginHorizontal: 57,
    },

    topItem: {
        alignItems: 'center'
    },

    pillar: {
        width: 80,
        backgroundColor: '#67EB60',
        borderRadius: 16,
        alignItems: 'center',
        paddingBottom: 12,
        justifyContent: "space-between"
    },

    pillarCenter: {
        height: 160,
        backgroundColor: '#05FF3B',
        alignItems: 'center',
        justifyContent: "space-between"
    },

    pillarValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6
    },

    topUserIcon: {
        width: 26,
        height: 26,
        backgroundColor: '#2a2a2a',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    topName: {
        color: '#67EB60',
        marginTop: 8,
        fontWeight: '700',
        fontSize: 13,
    },

    topNameCenter: {
        color: '#05FF3B',
        marginTop: 8,
        fontWeight: '900',
        fontSize: 14,
    },

    divider: {
        width: '100%',
        height: 2,
        backgroundColor: '#6C45CE',
        opacity: 0.4,
        borderRadius: 2,
        marginBottom: 20,
    },

    card: {
        backgroundColor: '#1A1A1A',
        borderRadius: 14,
        paddingVertical: 15,
        paddingHorizontal: 18,
        marginHorizontal: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10
    },

    cardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },

    cardUserIcon: {
        width: 36,
        height: 36,
        backgroundColor: '#2a2a2a',
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },

    cardName: {
        color: '#67EB60',
        fontWeight: '700',
        fontSize: 15,
    },

    cardRP: {
        color: '#fff',
        fontSize: 12,
    },

    cardPosition: {
        color: '#67EB60',
        fontWeight: '700',
        fontSize: 16
    },
    containerBack: {
        width: "100%",
        marginLeft: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    positionTop: {
        color: '#000000ff',
        fontSize: 20,
        fontWeight: 'bold',
        top: 0,
        textAlign: 'center'
    }
});
