import { loginRequest } from '@/backend/services/auth';
import Button from '@/components/Button';
import Input from '@/components/Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const handleLogin = async () => {
    let hasError = false;

    // validação simples
    if (!email.includes('@')) {
      setEmailError('Email inválido');
      hasError = true;
    } else {
      setEmailError('');
    }

    if (senha.length < 4) {
      setSenhaError('Senha inválida');
      hasError = true;
    } else {
      setSenhaError('');
    }

    if (hasError) return;

    try {
      const result = await loginRequest(email, senha);

      if (!result.session?.userId) {
        Alert.alert("Erro", "Sessão inválida.");
        return;
      }

      // salva token (sessão)
      // await AsyncStorage.setItem('token', result.token);
      await AsyncStorage.setItem('session', JSON.stringify(result.session));

      // salva informações do usuário
      if (result.user) {
        await AsyncStorage.setItem('userId', String(result.user.id));
        await AsyncStorage.setItem('userEmail', result.user.email);
        await AsyncStorage.setItem('userRole', result.user.role);
      }

      Alert.alert('Sucesso!', 'Login realizado!');

      router.push('/dashboard');

    } catch (err: any) {
      console.log(err);
      Alert.alert('Erro', err.response?.data?.error || 'Falha na autenticação');
    }
  };

  return (
    <View style={styles.body}>
        <View style={{ position: 'absolute', top: 0, backgroundColor: '#36C23E', width: '100%', height: 15}} />
        
        <Button 
          title="X" 
          onPress={() => router.back()} 
          style={{ position: 'absolute', top: 65, left: 20, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#303030", borderRadius: '50%' }} 
          textStyle={{ fontSize: 16, color: "#67EB60" }} 
        />

        <View style={styles.container}>
            <Text style={{color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Entrar</Text>

            <View style={{ gap: 15 }}>
                <Input 
                    label='Email'
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    error={emailError}
                />

                <Input 
                    label="Senha"
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    error={senhaError}
                />
                
                <Button title="Entrar" onPress={handleLogin} />

                <Text style={{ color: '#999', marginTop: 10 }}>
                  Problemas ao acessar a conta?
                </Text>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#1D1D1D",
  },
  container: {
    padding: 20,
    marginTop: 130,
    width: '90%',
    alignSelf: 'center',
    gap: 15,
  },
});
