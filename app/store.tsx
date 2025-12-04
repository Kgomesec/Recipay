import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Store() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
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

    return (
        <View style={[styles.body]}>
            <View style={[styles.header]}>
                <View style={styles.containerUser}>
                    <View style={styles.user}><Image source={require('@/assets/images/profile.png')} style={styles.userImage}></Image></View>
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
            <View style={styles.main}>
                <View style={styles.containerBack}>
                    <Button
                        variant="image"
                        imageSource={require('@/assets/images/voltar.png')}
                        onPress={() => router.back()}
                    />
                </View>
                <View style={{ width: "100%" }}>
                    <Text style={styles.title}>Serviços Digitais</Text>
                    <View style={{ height: 575, width: "100%", marginTop: 20 }}>
                        <ScrollView style={{width: "100%", height: "100%"}}>
                            <View style={styles.card}>
                                <Image source={require('@/assets/images/ps60.png')} style={{ width: 300, height: 300 }}></Image>
                                <Button
                                    variant="primary"
                                    title="1200 RP"
                                    onPress={() => { }}
                                    style={{ width: "55%", paddingTop: 15, paddingBottom: 15 }}
                                />
                            </View>
                            <View style={styles.card}>
                                <Image source={require('@/assets/images/ps100.png')} style={{ width: 300, height: 300 }}></Image>
                                <Button
                                    variant="primary"
                                    title="2000 RP"
                                    onPress={() => { }}
                                    style={{ width: "55%", paddingTop: 15, paddingBottom: 15 }}
                                />
                            </View>
                            <View style={styles.card}>
                                <Image source={require('@/assets/images/gamepass.png')} style={{ width: 300, height: 300 }}></Image>
                                <Button
                                    variant="primary"
                                    title="2000 RP"
                                    onPress={() => { }}
                                    style={{ width: "55%", paddingTop: 15, paddingBottom: 15 }}
                                />
                            </View>
                            <View style={styles.card}>
                                <Image source={require('@/assets/images/razer50.png')} style={{ width: 300, height: 300 }}></Image>
                                <Button
                                    variant="primary"
                                    title="1000 RP"
                                    onPress={() => { }}
                                    style={{ width: "55%", paddingTop: 15, paddingBottom: 15 }}
                                />
                            </View>
                            <View style={styles.card}>
                                <Image source={require('@/assets/images/xbox5.png')} style={{ width: 300, height: 300 }}></Image>
                                <Button
                                    variant="primary"
                                    title="125 RP"
                                    onPress={() => { }}
                                    style={{ width: "55%", paddingTop: 15, paddingBottom: 15 }}
                                />
                            </View>
                            <View style={styles.card}>
                                <Image source={require('@/assets/images/xbox10.png')} style={{ width: 300, height: 300 }}></Image>
                                <Button
                                    variant="primary"
                                    title="230 RP"
                                    onPress={() => { }}
                                    style={{ width: "55%", paddingTop: 15, paddingBottom: 15 }}
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
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
        fontSize: 24,
        fontWeight: 600,
    },
    card: {
        paddingTop: 20,
        paddingBottom: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // marginHorizontal: -40
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
    title: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 700,
        marginLeft: 20
    },
});