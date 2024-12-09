import * as React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { DialogModalProps } from './types';
import { styles } from './styles';

export default function DialogModal({ mode, openModal, setOpenModal, onConfirm, onCancel, title, description, backgroundStyle }: DialogModalProps) {

    return (
        <View>
            <Portal>
                <Dialog style={[{backgroundColor: backgroundStyle.backgroundColor}, styles.dialogContainer]} visible={openModal} onDismiss={() => setOpenModal(false)}>
                    <Dialog.Title style={{color: backgroundStyle.color}}>{title}</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium" style={{color: backgroundStyle.color}}>{description}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onCancel} textColor={backgroundStyle.color}>CANCEL</Button>
                        <Button onPress={onConfirm} textColor={mode === 'DELETE' ? 'red' : backgroundStyle.primary}>{mode === 'DELETE' ? 'DELETE' : 'CONFIRM'}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}
