import React from 'react'
import {
  GestureResponderEvent,
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  title: string
  onPress: (event: GestureResponderEvent) => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  variant?: ButtonVariant
  icon?: React.ReactNode  
  iconStyle?: ImageStyle
}

export default function Button({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary',
  icon,
  iconStyle,
}: ButtonProps) {
  const getBackgroundColor = () => {
    if (disabled) return '#aaa'

    switch (variant) {
      case 'secondary':
        return '#FFFFFF'
      case 'primary':
      default:
        return '#36C23E'
    }
  }

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: getBackgroundColor() }, style]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {variant === 'secondary' && icon ? (
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
})
