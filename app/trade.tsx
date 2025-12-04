import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Trade() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');

    const [rp, setRp] = useState("");
    const [reais, setReais] = useState("");
    const [userRp, setUserRp] = useState(0);

    const RP_VALUE = 5 / 125; // cada RP vale R$0,04

    useEffect(() => {
        const loadUser = async () => {
            try {
                const sessionStr = await AsyncStorage.getItem('session');
                const userRP = await AsyncStorage.getItem('rpAprovadas');
                if (sessionStr) {
                    const session = JSON.parse(sessionStr);
                    const nomeCompleto = session.name || "Usuário";
                    const primeiroNome = nomeCompleto.split(' ')[0];
                    setFirstName(primeiroNome);
                    setUserRp(parseInt(await AsyncStorage.getItem('rpAprovadas') || "0", 10));
                }
            } catch (err) {
                console.log('Erro ao carregar usuário:', err);
            }
        };

        loadUser();
    }, []);

    function handleRpChange(value: string) {

        let numeric = parseFloat(value.replace(",", "."));

        if (isNaN(numeric)) {
            setRp("");
            setReais("R$ 0.00");
            return;
        }

        if (numeric > userRp) {
            numeric = userRp;
            setRp(String(userRp));
        } else {
            setRp(value);
        }

        const calc = numeric * RP_VALUE;
        setReais(`R$ ${calc.toFixed(2)}`);
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
                            onPress={() => router.push('/newOrder')}
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

                    <View style={styles.tradeContainer}>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Quantidade de RP</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="0.00 RP"
                                placeholderTextColor="#888"
                                keyboardType="numeric"
                                value={rp}
                                onChangeText={handleRpChange}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Valor em Reais</Text>
                            <TextInput
                                editable={false}
                                style={[styles.input, { backgroundColor: "#2C2C2C" }]}
                                value={reais}
                            />
                        </View>

                        <Button
                            variant="primary"
                            title="CONFIRMAR TROCA"
                            onPress={() => alert("Troca confirmada!")}
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
    containerLogo: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    eye: {
        width: 40,
        height: 40
    },
    containerLeaf: {
        width: 60,
        height: 60,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    imageLeaf: {
        width: "100%",
        height: "100%",
        objectFit: "cover"
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
    main: {
        width: "100%",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#FFFFFF',
        marginBottom: 10,
    },
    tradeContainer: {
        backgroundColor: '#1E1E1E',
        width: '90%',
        gap: 15,
    },
    inputContainer: {
        width: '100%',
        gap: 8,
    },
    inputLabel: {
        color: '#CCCCCC',
        fontSize: 16,
        fontWeight: '600',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#2C2C2C',
        borderRadius: 12,
        paddingHorizontal: 15,
        color: '#FFFFFF',
        fontSize: 16,
    },
    containerBack: {
        width: "100%",
        margin: 15,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});