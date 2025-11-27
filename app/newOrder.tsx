import Button from '@/components/Button';
import InputChecklist from '@/components/Checklist';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function NewOrder() {
    const router = useRouter();
    // const [checked, setChecked] = useState(false); -- isso daqui é pra quando for selecionar todos
    const [item1, setItem1] = useState(false);
    const [item2, setItem2] = useState(false);
    const [item3, setItem3] = useState(false); 
    const [item4, setItem4] = useState(false);
    const [item5, setItem5] = useState(false);
    const [item6, setItem6] = useState(false);
    const [item7, setItem7] = useState(false);

    return (
        <View style={[styles.body]}>
            <View style={[styles.header]}>
                <View style={styles.containerUser}>
                    <View style={styles.user}><Image source={require('@/assets/images/user.jpg')} style={styles.userImage}></Image></View>
                    <Text style={styles.text}>Olá, Miguel</Text>
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
                    <View style={styles.orderContainer}>
                        <View style={styles.materialsContainer}>
                            <Text style={styles.title}>Materiais</Text> 
                            <View style={styles.itemsContainer}>
                                <View style={styles.item}>
                                    <InputChecklist 
                                    label = "Plástico"
                                    checked = {item1}
                                    onChange = {() => setItem1(!item1)} 
                                    />
                                </View>
                                <View style={styles.item}>
                                    <InputChecklist 
                                    label = "Vidro"
                                    checked = {item2}
                                    onChange = {() => setItem2(!item2)} 
                                    />
                                </View>
                                <View style={styles.item}>
                                    <InputChecklist 
                                    label = "Metal"
                                    checked = {item3}
                                    onChange = {() => setItem3(!item3)} 
                                    />
                                </View>
                                <View style={styles.item}>
                                    <InputChecklist 
                                    label = "Papel"
                                    checked = {item4}
                                    onChange = {() => setItem4(!item4)} 
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={styles.quantContainer}>
                            <Text style={styles.title}>Quantidade</Text> 
                            <View style={styles.itemsContainer}>
                                <View style={styles.item}>
                                    <InputChecklist 
                                    label = "Grande escala (100 kg+)"
                                    checked = {item5}
                                    onChange = {() => setItem5(!item5)} 
                                    />
                                </View>
                                <View style={styles.item}>
                                    <InputChecklist 
                                    label = "Média escala (30 - 60 kg)"
                                    checked = {item6}
                                    onChange = {() => setItem6(!item6)} 
                                    />
                                </View>
                                <View style={styles.item}>
                                    <InputChecklist 
                                    label = "Pequena escala (10 - 29 kg)"
                                    checked = {item7}
                                    onChange = {() => setItem7(!item7)} 
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
                                    onPress={() => alert("Clicou no endereço")}
                                />
                            </View>
                        </View>

                        <View style={styles.anexoContainer}>
                            <Text style={styles.title}>Anexos</Text> 
                            <Button
                                variant="image"
                                imageSource={require('@/assets/images/anexo.png')}
                                onPress={() => alert("Adicionar anexo")}
                                style={{justifyContent: "flex-start"}}
                            />
                        </View>

                        <Button
                            variant="primary"
                            title="NOVA SOLICITAÇÃO"
                            onPress={() => router.push('/newOrder')}
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
    // itemText: {
    //     color: '#FFFFFF',
    //     fontSize: 16,
    //     fontWeight: 500,
    //     textAlign: "center",
    // },
});