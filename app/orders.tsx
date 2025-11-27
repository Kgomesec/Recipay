import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Order() {
    const router = useRouter();

    return (
        <View style={[styles.body]}>
            <View style={[styles.header]}>
                <View style={styles.containerUser}>
                    <View style={styles.user}><Image source={require('@/assets/images/user.jpg')} style={styles.userImage}></Image></View>
                    <Text style={styles.text}>Olá, Miguel</Text>
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
            <ScrollView style={{width: "100%"}}>
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
                            <View style={styles.box}>
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
                            </View>

                            <View style={styles.box}>
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
                            </View>
                            <View style={styles.box}>
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
                            </View>
                            <View style={styles.box}>
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
                            </View>
                            <View style={styles.box}>
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
                            </View>
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
        fontSize: 25,
        fontWeight: 700,
    },
    historyContainer: {
        width: "90%",
        borderRadius: 10,
        gap: 15,
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
        fontWeight: '600',
    },
    textSmall: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
    },
    });