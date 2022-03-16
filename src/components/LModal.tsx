import React, { ReactElement } from 'react';
import { Button, Modal } from 'native-base';

type Props = {
  title: string;
  visible: boolean;
  onCloseText?: string;
  onClose: () => void;
  onSaveText?: string;
  onSave: () => void;
  children: ReactElement<any>;
};

export function LModal({
  visible: visible,
  onClose,
  onCloseText = '取消',
  title,
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
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              {onCloseText}
            </Button>
            <Button onPress={onSave}>{onSaveText}</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
