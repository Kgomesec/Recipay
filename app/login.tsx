import Button from '@/components/Button';
import Input from 'components/Input';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [emailError, setEmailError] = useState('');
  const [senhaError, setSenhaError] = useState('');

  const handleLogin = () => {
    let hasError = false;

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

    if (!hasError) {
      Alert.alert('Login bem-sucedido!');
    }
  };

  return (
    <View style={styles.body}>
        <View style={{ position: 'absolute', top: 0, backgroundColor: '#36C23E', width: '100%', height: 15}} />
        <Button title="X" onPress={() => router.back()} style={{ position: 'absolute', top: 65, left: 20, paddingHorizontal: 15, paddingVertical: 10, backgroundColor: "#303030", borderRadius: '50%'}} textStyle={{ fontSize: 16, color: "#67EB60" }} />
        <View style={styles.container}>
            <Text style={{color: '#FFF', fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>Entrar</Text>
            <View style={{ gap: 15 }}>
                <Input 
                    label='Email'
                    placeholder=''
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                    error={emailError}
                />

                <Input 
                    label="Senha"
                    placeholder=""  
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                    error={senhaError}
                />
                
                <Button title="Entrar" onPress={handleLogin} />
                <Text style={{ color: '#999', marginTop: 10 }}>Problemas ao acessar a conta?</Text>
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
