import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
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
  View,
  ViewStyle,
} from 'react-native'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'transparent'
  | 'image'
  | 'address'

interface ButtonProps {
  title?: string
  onPress: (event: GestureResponderEvent) => void
  style?: ViewStyle
  textStyle?: TextStyle
  disabled?: boolean
  variant?: ButtonVariant
  icon?: React.ReactNode
  iconStyle?: ImageStyle

  imageSource?: ImageSourcePropType
  imageStyle?: ImageStyle

  street?: string
  city?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
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
  imageStyle,
  street,
  city,
  leftIcon,
  rightIcon,
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
      case 'address':
        return '#2a2a2a'
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
        variant === 'address' && styles.addressContainer,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {variant === 'address' ? (
        <>
          {leftIcon || <Feather name="home" size={28} color="#fff" />}

          <View style={styles.addressTextContainer}>
            <Text style={styles.addressStreet}>{street}</Text>
            <Text style={styles.addressCity}>{city}</Text>
          </View>

          {/* Ícone direita */}
          {rightIcon || (
            <MaterialCommunityIcons name="sync" size={24} color="#fff" />
          )}
        </>
      ) : variant === 'transparent' ? (
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
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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

  addressContainer: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 16,
    gap: 14,
  },

  addressTextContainer: {
    flex: 1,
  },

  addressStreet: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  addressCity: {
    color: '#ccc',
    fontSize: 14,
  },
})
