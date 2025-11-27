import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function InputChecklist({ label, checked, onChange }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onChange}>
      <View style={[styles.checkbox, checked && styles.checkedBox]}>
        {checked && (
          <Feather name="check" size={20} color="#2ecc71" />
        )}
      </View>

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },

  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#222',
    borderWidth: 2,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  checkedBox: {
    borderColor: '#2ecc71',
    backgroundColor: '#2ecc7155',
  },

  label: {
    fontSize: 18,
    color: '#fff',
  },
});
