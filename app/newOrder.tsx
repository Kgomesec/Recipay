import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";

export default function NewOrder() {
    const router = useRouter();

    return (
        <View style={[styles.body]}>
            <View style={[styles.header]}>
                <View style={styles.containerUser}>
                    <View style={styles.user}><Image source={require('@/assets/images/user.jpg')} style={styles.userImage}></Image></View>
                    <Text style={styles.text}>Olá, Miguel</Text>
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
                <View style={styles.orderContainer}>
                    <View style={styles.materialsContainer}>
                        <Text style={styles.textMaterials}>Materiais</Text> 
                        <View style={styles.itemsContainer}>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Plástico</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Vidro</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Metal</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Papel</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.materialsContainer}>
                        <Text style={styles.textMaterials}>Quantidade</Text> 
                        <View style={styles.itemsContainer}>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Grande escala (100 kg+)</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Média escala (30 - 60 kg)</Text>
                            </View>
                            <View style={styles.item}>
                                <Text style={styles.itemText}>Pequena escala (10 - 29 kg)</Text>
                            </View>
                        </View>
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
        height: "80%",
        backgroundColor: "#292929",
        borderRadius: 10,
    },
    materialsContainer: {
        width: "100%",
        padding: 15,
        gap: 10
    },
    textMaterials: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 600,
    },
});