import React from 'react';
import { Button, Modal } from 'native-base';

type Props = {
  title: string;
  visible: boolean;
  onClose: () => void;
  onCancelText?: string;
  onCancel?: () => void;
  onSaveText?: string;
  onSave: () => void;
  children: any;
};

export function LModal({
  visible: visible,
  onClose,
  title,
  onCancelText = '取消',
  onCancel = onClose,
  onSave,
  onSaveText = '保存',
  children,
}: Props) {
  return (
    <Modal isOpen={visible} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}>
              {onCancelText}
            </Button>
            <Button onPress={onSave}>{onSaveText}</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
