import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";

export default function Dashboard() {
  const router = useRouter();

  return (
    <View style={[styles.body]} >
        <View style={[styles.header]}>
            <View style={styles.containerUser}>
                <View style={styles.user}><Image source={require('assets/images/user.jpg')} style={styles.userImage}></Image></View>
                <Text style={styles.text}>Olá, Miguel</Text>
            </View>
            <View style={styles.containerLogo}> 
                <Image source={require('assets/images/eye-open.png')} style={styles.eye}></Image>
                <View style={styles.containerLeaf}>
                    <Image source={require('assets/images/leaf.png')} style={styles.imageLeaf}></Image>
                </View>
            </View>
        </View>
        <View style={styles.main}>
          <View style={styles.solicitacoes}>
            <View style={styles.headerSolicitacoes}>
              <Text style={{fontWeight: "700", fontSize: 20, color: "#FFFFFF"}}>Solicitações</Text>
              <Text style={{fontWeight: "700", fontSize: 12, color: "#67EB60"}}>Ver todas</Text>
            </View>
            <View style={styles.boxSolicitacoesContainer}>
              <View style={styles.box}>
                <View style={styles.imageSolicitacoesContainer}>
                  <Image source={require("assets/images/pendente.png")} style={styles.imageSolicitacoes}></Image>
                </View>
                <View>
                  <Text>******</Text>
                  <Text>Pendente</Text>
                </View>
              </View>
              <View style={styles.box}>
                <View style={styles.imageSolicitacoesContainer}>  
                  <Image source={require("assets/images/aprovada.png")} style={styles.imageSolicitacoes}></Image>
                </View>
                <View>
                  <Text>******</Text>
                  <Text>Aprovada</Text>
                </View>
              </View>
              <View style={styles.box}>
                <View style={styles.imageSolicitacoesContainer}> 
                  <Image source={require("assets/images/recusada.png")} style={styles.imageSolicitacoes}></Image>
                </View>
                <View>
                  <Text>******</Text>
                  <Text>Recusada</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerContent}>
              <Image source={require('assets/images/home-green.png')} style={styles.image}></Image>
            <Text style={styles.textFooter}>Home</Text>
          </View>
          <View style={styles.footerContent}>
              <Image source={require('assets/images/ranking.png')} style={styles.image}></Image>
            <Text style={styles.textFooter}>Ranking</Text>
          </View>
          <View style={styles.footerContent}>
              <Image source={require('assets/images/trocar-verde.png')} style={styles.image}></Image>
            <Text style={styles.textFooter}>Trocas</Text>
          </View>
          <View style={styles.footerContent}> 
              <Image source={require('assets/images/tag-green.png')} style={styles.image}></Image>
            <Text style={styles.textFooter}>Loja</Text>
          </View>
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
  imageLeaf: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  main: {
    width: "100%",
    alignItems: "center"
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
    borderRadius: 15
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
  }
});