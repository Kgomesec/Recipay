import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function ModalCenter({ isVisible, children, onClose }: Props) {
  return (
    <View>
        <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
            <Text style={styles.title}>Todas as solicitações</Text>
            <Pressable onPress={onClose}>
                <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
            </View>
            {children}
        </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    modalContent: {
        height: '60%',
        width: '90%',
        backgroundColor: '#25292e',
        borderRadius: 18,
        position: 'absolute',
        top: '20%',
        right: '5%',
    },
    titleContainer: {
        height: '10%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
});