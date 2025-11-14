import React from 'react'
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type ButtonVariant = 'primary' | 'secondary' | 'transparent' | 'image'

interface ButtonProps {
  title?: string
  onPress: (event: GestureResponderEvent) => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  variant?: ButtonVariant
  icon?: React.ReactNode  
  iconStyle?: ImageStyle

  // Novo prop para botão com imagem
  imageSource?: ImageSourcePropType
  imageStyle?: ImageStyle
}

export default function Button({
  title = '',
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary',
  icon,
  iconStyle,
  imageSource,
  imageStyle
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return '#aaa'

    switch (variant) {
      case 'secondary':
        return '#FFFFFF'
      case 'transparent':
        return 'transparent'
      case 'image':
        return 'transparent'
      case 'primary':
      default:
        return '#36C23E'
    }
  }

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'transparent' && styles.transparentButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {variant === 'transparent' ? (
        <Text style={styles.plusText}>+</Text>
      ) : variant === 'image' && imageSource ? (
        <Image source={imageSource} style={[styles.imageButton, imageStyle]} />
      ) : variant === 'secondary' && icon ? (
        typeof icon === 'string' ? (
          <Image source={{ uri: icon }} style={[styles.icon, iconStyle]} />
        ) : (
          icon
        )
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  transparentButton: {
    borderWidth: 2,
    borderColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  plusText: {
    fontSize: 28,
    color: '#36C23E',
    fontWeight: 'bold',
  },

  imageButton: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
})
