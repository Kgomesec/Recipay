import Button from '@/components/Button';
import InputChecklist from '@/components/Checklist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function NewOrder() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState('');
    const [selectedMaterial, setSelectedMaterial] = useState('');

    useEffect(() => {
        const loadUser = async () => {
            try {
                const sessionStr = await AsyncStorage.getItem('session');
                if (sessionStr) {
                    const session = JSON.parse(sessionStr);
                    const nomeCompleto = session.name || "Usuário";
                    const primeiroNome = nomeCompleto.split(' ')[0];
                    setFirstName(primeiroNome);
                }
            } catch (err) {
                console.log('Erro ao carregar usuário:', err);
            }
        };

        loadUser();
    }, []);

    // const [item1, setItem1] = useState(false);
    // const [item2, setItem2] = useState(false);
    // const [item3, setItem3] = useState(false);
    // const [item4, setItem4] = useState(false);

    const handleNewOrder = async () => {
        const sessionStr = await AsyncStorage.getItem('session');
        if (!sessionStr) return alert("Erro: usuário não logado");

        const session = JSON.parse(sessionStr);

        if (!selectedMaterial) return alert("Selecione um material");
        if (!selectedQuantity) return alert("Selecione a quantidade");

        const body = {
            userId: session.userId,
            materialType: selectedMaterial,
            quantity: selectedQuantity,
            address: "Rua Marcial, 25 — Mooca, SP"
        };

        console.log("Enviando solicitação:", body);


        const response = await fetch("http://192.168.15.12:3000/requests/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: 'include'
        });

        const data = await response.json();
        console.log("Resposta do backend:", data);

        if (response.ok) {
            alert("Solicitação criada com sucesso!");
            router.push("/dashboard");
        } else {
            alert("Erro ao criar solicitação");
        }
    };

    return (
        <View style={[styles.body]}>
            <View style={[styles.header]}>
                <View style={styles.containerUser}>
                    <View style={styles.user}><Image source={require('@/assets/images/user.jpg')} style={styles.userImage}></Image></View>
                    <Text style={styles.text}>Olá, {firstName}</Text>
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

                    <View style={styles.orderContainer}>
                        <View style={styles.materialsContainer}>
                            <Text style={styles.title}>Materiais</Text>
                            <View style={styles.itemsContainer}>

                                <View style={styles.item}>
                                    <InputChecklist
                                        label="Plástico"
                                        checked={selectedMaterial === "plastico"}
                                        onChange={() => setSelectedMaterial("plastico")}
                                    />
                                </View>

                                <View style={styles.item}>
                                    <InputChecklist
                                        label="Vidro"
                                        checked={selectedMaterial === "vidro"}
                                        onChange={() => setSelectedMaterial("vidro")}
                                    />
                                </View>

                                <View style={styles.item}>
                                    <InputChecklist
                                        label="Metal"
                                        checked={selectedMaterial === "metal"}
                                        onChange={() => setSelectedMaterial("metal")}
                                    />
                                </View>

                                <View style={styles.item}>
                                    <InputChecklist
                                        label="Papel"
                                        checked={selectedMaterial === "papel"}
                                        onChange={() => setSelectedMaterial("papel")}
                                    />
                                </View>

                            </View>
                        </View>


                        <View style={styles.quantContainer}>
                            <Text style={styles.title}>Quantidade</Text>

                            <View style={styles.itemsContainer}>
                                <View style={styles.item}>
                                    <InputChecklist
                                        label="Grande escala (20 kg+)"
                                        checked={selectedQuantity === "grande"}
                                        onChange={() => setSelectedQuantity("grande")}
                                    />
                                </View>

                                <View style={styles.item}>
                                    <InputChecklist
                                        label="Média escala (10 - 19 kg)"
                                        checked={selectedQuantity === "medio"}
                                        onChange={() => setSelectedQuantity("medio")}
                                    />
                                </View>

                                <View style={styles.item}>
                                    <InputChecklist
                                        label="Pequena escala (1 - 9 kg)"
                                        checked={selectedQuantity === "pequeno"}
                                        onChange={() => setSelectedQuantity("pequeno")}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.localContainer}>
                            <Text style={styles.title}>Endereço</Text>
                            <View style={styles.itemsContainer}>
                                <Button
                                    variant="address"
                                    street="Rua Marcial, 25"
                                    city="Mooca — São Paulo, SP"
                                    onPress={() => alert("Endereço selecionado")}
                                />
                            </View>
                        </View>

                        <View style={styles.anexoContainer}>
                            <Text style={styles.title}>Anexos</Text>
                            <Button
                                variant="image"
                                imageSource={require('@/assets/images/anexo.png')}
                                onPress={() => alert("Adicionar anexo")}
                                style={{ justifyContent: "flex-start" }}
                            />
                        </View>
                        
                        <Button
                            variant="primary"
                            title="NOVA SOLICITAÇÃO"
                            onPress={handleNewOrder}
                            style={{ marginBottom: 50 }}
                        />
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
    text: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 600,
    },
    main: {
        width: "100%",
        alignItems: "center",
    },
    containerBack: {
        width: "100%",
        margin: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    orderContainer: {
        width: "90%",
        borderRadius: 10,
    },
    materialsContainer: {
        width: "100%",
        padding: 15,
        gap: 10
    },
    quantContainer: {
        width: "100%",
        padding: 15,
        gap: 10
    },
    title: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 700,
    },
    itemsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
    },
    item: {
        height: 40,
        display: "flex",
        justifyContent: "center",
    },
    localContainer: {
        width: "100%",
        padding: 15,
        gap: 10
    },
    anexoContainer: {
        width: "100%",
        padding: 15,
        gap: 10
    },
});