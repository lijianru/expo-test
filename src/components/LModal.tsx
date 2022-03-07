import React, { ReactElement } from 'react';
import { Button, Modal } from 'native-base';

type Props = {
  title: string;
  visiable: boolean;
  onClose: () => void;
  onSave: () => void;
  children: ReactElement<any>;
};

export function LModal({ visiable, onClose, title, onSave, children }: Props) {
  return (
    <Modal isOpen={visiable} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
              取消
            </Button>
            <Button onPress={onSave}>保存</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
