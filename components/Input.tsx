import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  value,
  secureTextEntry,
  onFocus,
  onBlur,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur && onBlur(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const hasValue = !!value && value.toString().length > 0;

  const getBorderColor = () => {
    if (error) return '#FF4D4F';
    if (isFocused || hasValue) return '#67EB60';
    return 'transparent';
  };

  const getBackgroundColor = () => {
    if (isFocused || hasValue) return '#1D1D1D';
    return '#403E3E';
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
          style,
        ]}
      >
        <TextInput
          {...props}
          value={value}
          secureTextEntry={secureTextEntry && !showPassword}
          style={styles.input}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#999"
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Image
              source={
                showPassword
                  ? require('@/assets/images/eye-open.png') 
                  : require('@/assets/images/eye-closed.png') 
              }
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    fontSize: 16,
    color: '#FFF',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#FFF',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#999',
  },
  errorText: {
    color: '#FF4D4F',
    marginTop: 4,
    fontSize: 13,
  },
});
