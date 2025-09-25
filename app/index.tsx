import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={[styles.body]} >
      <View style={{ position: 'absolute', top: 0, backgroundColor: '#36C23E', width: '100%', height: 15}} />
      <View style={{ alignItems: 'center'}}>
        <Image source={require('assets/images/coins.png')} style={{ width: 378, height: 378, marginBottom: 20 }} />
        <View style={[styles.textContainer]}>
          <Text style={[styles.text]}>RECICLE POR RECOMPENSAS</Text>
          <Text style={[styles.text]}>O SEU GESTO VALE AQUI</Text>
        </View>
      </View>
      <View style={{ gap: 15, alignItems: 'center', width: '80%' }}>
        <View style={[styles.primaryButtonContainer]}>
          <Button title="Entrar" onPress={() => router.push('/login')}/>
          <Button title="Cadastrar" onPress={() => router.push('/dashboard')} />
        </View>
        {/* <View style={{width: '80%'}}>
          <Button title="" onPress={() => alert('Secondary clicked')} variant="secondary" icon={<Icon width={24} height={24}/>} />
        </View> */}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1D1D1D"
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