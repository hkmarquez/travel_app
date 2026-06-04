import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { styles } from '../styles/createStyles';

const AddTaskModal = ({
  visible,
  modalDate,
  newTaskName,
  setNewTaskName,
  onClose,
  onSave,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalBox}>
          <Text style={styles.modalTitle}>
            Add task for{' '}
            {modalDate
              ? `${modalDate.toLocaleString('default', {
                  month: 'short',
                })} ${String(modalDate.getDate()).padStart(2, '0')}`
              : ''}
          </Text>

          <TextInput
            value={newTaskName}
            onChangeText={setNewTaskName}
            placeholder="e.g. Visit the Acropolis"
            placeholderTextColor="#aaa"
            autoFocus
            style={styles.modalInput}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.modalCancel}>
              <Text style={{ color: '#555', fontSize: 14 }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onSave} style={styles.modalSave}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddTaskModal;
