import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [pendingRP, setPendingRP] = useState(0);
  const [approvedRP, setApprovedRP] = useState(0);
  const [rejectedRP, setRejectedRP] = useState(0);

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

  useFocusEffect(
    useCallback(() => {
      const loadRP = async () => {
        try {
          const pending = parseInt(await AsyncStorage.getItem('rpPendentes') || '0');
          const approved = parseInt(await AsyncStorage.getItem('rpAprovadas') || '0');
          const rejected = parseInt(await AsyncStorage.getItem('rpRecusadas') || '0');

          setPendingRP(pending);
          setApprovedRP(approved);
          setRejectedRP(rejected);
        } catch (err) {
          console.log('Erro ao carregar RP:', err);
        }
      };

      loadRP();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('session');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userRole');

      await AsyncStorage.removeItem('rpPendentes');
      await AsyncStorage.removeItem('rpAprovadas');
      await AsyncStorage.removeItem('rpRecusadas');

      await fetch('http://192.168.15.12:3000/auth/logout', { method: 'POST', credentials: 'include' });

      Alert.alert('Logout', 'Você saiu da conta');
      router.replace('/login');
    } catch (err) {
      console.log('Erro no logout:', err);
      Alert.alert('Erro', 'Falha ao sair da conta');
    }
  };

  return (
    <View style={[styles.body]} >
      <View style={[styles.header]}>
        <View style={styles.containerUser}>
          <View style={styles.user}>
            <Image source={require('@/assets/images/profile.png')} style={styles.userImage}></Image>
          </View>
          <Text style={styles.text}>Olá, {firstName}</Text>
        </View>
        <View style={styles.containerLogo}>
          <Pressable onPress={handleLogout}>
            <Image source={require('@/assets/images/exit.png')} style={styles.eye}></Image>
          </Pressable>
          <View style={styles.containerLeaf}>
            <Button
              variant="transparent"
              onPress={() => router.push('/newOrder')}
            />
          </View>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.carteira}>
          <Text style={styles.textCarteira}>Total em carteira</Text>
          <View>
            <Text style={styles.textBig}>{approvedRP + pendingRP} RP</Text>
            <Text style={{ fontWeight: "600", fontSize: 16, color: "#67EB60" }}>{approvedRP} RP liquído</Text>
          </View>
        </View>
        <View style={styles.solicitacoes}>
          <View style={styles.headerSolicitacoes}>
            <Text style={{ fontWeight: "700", fontSize: 20, color: "#FFFFFF" }}>Solicitações</Text>
            <Text style={{ fontWeight: "700", fontSize: 12, color: "#67EB60" }} onPress={() => router.push('/orders')}>Ver todas</Text>
          </View>
          <View style={styles.boxSolicitacoesContainer}>
            <View style={styles.box}>
              <View style={styles.imageSolicitacoesContainer}>
                <Image source={require("@/assets/images/pendente.png")} style={styles.imageSolicitacoes}></Image>
              </View>
              <View>
                <Text style={styles.textBig}>{pendingRP} RP</Text>
                <Text style={styles.textSmall}>Pendente</Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.imageSolicitacoesContainer}>
                <Image source={require("@/assets/images/aprovada.png")} style={styles.imageSolicitacoes}></Image>
              </View>
              <View>
                <Text style={styles.textBig}>{approvedRP} RP</Text>
                <Text style={styles.textSmall}>Aprovada</Text>
              </View>
            </View>
            <View style={styles.box}>
              <View style={styles.imageSolicitacoesContainer}>
                <Image source={require("@/assets/images/recusada.png")} style={styles.imageSolicitacoes}></Image>
              </View>
              <View>
                <Text style={styles.textBig}>{rejectedRP} RP</Text>
                <Text style={styles.textSmall}>Recusada</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Image source={require('@/assets/images/home-green.png')} style={styles.image}></Image>
          <Text style={styles.textFooter}>Home</Text>
        </View>
        <Pressable style={styles.footerContent} onPress={() => router.push('/ranking')}>
          <Image source={require('@/assets/images/ranking.png')} style={styles.image}></Image>
          <Text style={styles.textFooter}>Ranking</Text>
        </Pressable>
        <Pressable style={styles.footerContent} onPress={() => router.push('/trade')}>
          <Image source={require('@/assets/images/trocar-verde.png')} style={styles.image}></Image>
          <Text style={styles.textFooter}>Trocas</Text>
        </Pressable>
        <Pressable style={styles.footerContent} onPress={() => router.push('/store')}>
          <Image source={require('@/assets/images/tag-green.png')} style={styles.image}></Image>
          <Text style={styles.textFooter}>Loja</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1D1D1D"
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
  // imageLeaf: {
  //   width: "100%",
  //   height: "100%",
  //   objectFit: "cover"
  // },
  main: {
    width: "100%",
    alignItems: "center"
  },
  carteira: {
    width: "90%",
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  solicitacoes: {
    width: "100%",
    padding: 20,
    gap: 10
  },
  headerSolicitacoes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  boxSolicitacoesContainer: {
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
  imageSolicitacoesContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  imageSolicitacoes: {
    width: 70,
    height: 70
  },
  footer: {
    width: "90%",
    height: "auto",
    backgroundColor: "#171717",
    position: "absolute",
    bottom: 0,
    margin: 40,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 18,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    shadowColor: 'rgba(80, 230, 0, 1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 10
  },
  footerContent: {
    alignItems: "center"
  },
  image: {
    width: 48,
    height: 48
  },
  textFooter: {
    color: "#67EB60",
    fontSize: 14,
    fontWeight: "700"
  },
  primaryButtonContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 10
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 600,
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
  textCarteira: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '400',
  },
});