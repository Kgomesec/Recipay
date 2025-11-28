import Button from '@/components/Button';
import HorizontalScrollbar from '@/components/HorizontalScrollbar';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";

export default function Store() {
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
            <HorizontalScrollbar height={320}>
                <Image source={require('@/assets/images/ps60.png')} style={{ width: 300, height: 300 }}></Image>
                <Image source={require('@/assets/images/ps60.png')} style={{ width: 300, height: 300 }}></Image>
                <Image source={require('@/assets/images/ps60.png')} style={{ width: 300, height: 300 }}></Image>
                <Image source={require('@/assets/images/ps60.png')} style={{ width: 300, height: 300 }}></Image>
                <Image source={require('@/assets/images/ps60.png')} style={{ width: 300, height: 300 }}></Image>
                <Image source={require('@/assets/images/ps60.png')} style={{ width: 300, height: 300 }}></Image>
            </HorizontalScrollbar>
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
});