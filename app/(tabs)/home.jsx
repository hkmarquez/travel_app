
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { images } from '../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const Create = () => {
  // ── Add flow state ────────────────────────────────────────
  const [form, setForm] = useState({ task: '' });
  const [form2, setForm2] = useState({ task: '' });
  const [leaveDate, setLeaveDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [showLeavePicker, setShowLeavePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [dateError, setDateError] = useState('');

  // ── Task list ─────────────────────────────────────────────
  const [tasks, setTasks] = useState([]);

  // ── Delete confirmation state ─────────────────────────────
  const [deleteIndex, setDeleteIndex] = useState(null);

  // ── Edit flow state ───────────────────────────────────────
  const [editingIndex, setEditingIndex] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditDateForm, setShowEditDateForm] = useState(false);
  const [editName, setEditName] = useState('');
  const [editLeaveDate, setEditLeaveDate] = useState(null);
  const [editReturnDate, setEditReturnDate] = useState(null);
  const [showEditLeavePicker, setShowEditLeavePicker] = useState(false);
  const [showEditReturnPicker, setShowEditReturnPicker] = useState(false);
  const [editDateError, setEditDateError] = useState('');

  const router = useRouter();
  const { openModal } = useLocalSearchParams();

  useEffect(() => {
    if (openModal === 'true') {
      setShowForm(true);
      router.setParams({ openModal: 'false' });
    }
  }, [openModal]);

  // ── Add flow handlers ─────────────────────────────────────
  const handleNextStep = () => {
    if (form.task.trim() !== '') {
      setDateError('');
      setShowForm(false);
      setShowSecondForm(true);
    }
  };

  const handleFinalAdd = () => {
    if (!leaveDate || !returnDate) {
      setDateError('Please select both dates.');
      return;
    }
    if (returnDate <= leaveDate) {
      setDateError('Return date must be after leave date.');
      return;
    }
    const newVacation = `${form.task} (${leaveDate.toLocaleDateString()} → ${returnDate.toLocaleDateString()})`;
    setTasks([newVacation, ...tasks]);
    setForm({ task: '' });
    setForm2({ task: '' });
    setLeaveDate(null);
    setReturnDate(null);
    setDateError('');
    setShowSecondForm(false);
  };

  const onLeaveDateChange = (event, selectedDate) => {
    setShowLeavePicker(false);
    if (selectedDate) {
      setLeaveDate(selectedDate);
      setDateError('');
    }
  };

  const onReturnDateChange = (event, selectedDate) => {
    setShowReturnPicker(false);
    if (selectedDate) {
      setReturnDate(selectedDate);
      setDateError('');
    }
  };

  // ── Delete handlers ───────────────────────────────────────
  const handleDeleteTask = (index) => {
    setDeleteIndex(index);
  };

  const handleConfirmDelete = () => {
    setTasks(tasks.filter((_, i) => i !== deleteIndex));
    setDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
  };

  // ── Edit flow handlers ────────────────────────────────────
  const handleEditTask = (index) => {
    const item = tasks[index];
    const match = item.match(/^(.*)\s\((.+)\s→\s(.+)\)$/);
    setEditingIndex(index);
    setEditName(match ? match[1] : item);
    if (match) {
      const lParts = match[2].trim().split('/');
      const rParts = match[3].trim().split('/');
      if (lParts.length === 3)
        setEditLeaveDate(new Date(+lParts[2], +lParts[0] - 1, +lParts[1]));
      if (rParts.length === 3)
        setEditReturnDate(new Date(+rParts[2], +rParts[0] - 1, +rParts[1]));
    } else {
      setEditLeaveDate(new Date());
      setEditReturnDate(new Date());
    }
    setEditDateError('');
    setShowEditForm(true);
  };

  const handleEditNextStep = () => {
    if (editName.trim() !== '') {
      setEditDateError('');
      setShowEditForm(false);
      setShowEditDateForm(true);
    }
  };

  const handleEditSave = () => {
    if (!editLeaveDate || !editReturnDate) {
      setEditDateError('Please select both dates.');
      return;
    }
    if (editReturnDate <= editLeaveDate) {
      setEditDateError('Return date must be after leave date.');
      return;
    }
    const updated = `${editName} (${editLeaveDate.toLocaleDateString()} → ${editReturnDate.toLocaleDateString()})`;
    setTasks(tasks.map((t, i) => (i === editingIndex ? updated : t)));
    setEditDateError('');
    setShowEditDateForm(false);
    setEditingIndex(null);
  };

  const handleEditCancel = () => {
    setShowEditForm(false);
    setShowEditDateForm(false);
    setEditingIndex(null);
    setEditName('');
    setEditLeaveDate(null);
    setEditReturnDate(null);
    setEditDateError('');
  };

  const onEditLeaveDateChange = (event, selectedDate) => {
    setShowEditLeavePicker(false);
    if (selectedDate) {
      setEditLeaveDate(selectedDate);
      setEditDateError('');
    }
  };

  const onEditReturnDateChange = (event, selectedDate) => {
    setShowEditReturnPicker(false);
    if (selectedDate) {
      setEditReturnDate(selectedDate);
      setEditDateError('');
    }
  };

  // ── Helpers ───────────────────────────────────────────────
  const formatShortDate = (dateStr) => {
    const parts = dateStr.trim().split('/');
    if (parts.length !== 3) return dateStr;
    return `${parts[0].padStart(2, '0')}.${parts[1].padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* ══════════════ ADD DIALOG #1 — Name ══════════════ */}
      {showForm && (
        <TouchableOpacity style={styles.dialogOverlay} activeOpacity={1} onPress={() => setShowForm(false)}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: '100%' }}>
            <LinearGradient colors={['#00AAFF', '#FFFFFF']} start={{ x: 0, y: 1.2 }} end={{ x: 0, y: 0 }} style={styles.dialogBox}>
              <View style={styles.dialogHeader}>
                <Image source={images.camera_on_map_2} style={styles.dialogImage} resizeMode="cover" />
                <Text style={styles.dialogTitle}>Name your adventure</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  onChangeText={(e) => setForm({ task: e })}
                  value={form.task}
                  style={styles.dialogInput}
                  placeholder="Enter a vacation name..."
                  placeholderTextColor="#aaa"
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                />
              </View>
              <View style={styles.dialogButtons}>
                <TouchableOpacity onPress={() => { setShowForm(false); setForm({ task: '' }); }} style={styles.dialogCancel}>
                  <Text style={{ color: '#555', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextStep} style={styles.dialogSave}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Next</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* ══════════════ ADD DIALOG #2 — Dates ══════════════ */}
      {showSecondForm && (
        <TouchableOpacity style={styles.dialogOverlay} activeOpacity={1} onPress={() => setShowSecondForm(false)}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: '100%' }}>
            <LinearGradient colors={['#00AAFF', '#FFFFFF']} start={{ x: 0, y: 1.2 }} end={{ x: 0, y: 0 }} style={styles.dialogBox}>
              <View style={styles.dialogHeader}>
                <Image source={images.camera_on_map_2} style={styles.dialogImage} resizeMode="cover" />
                <Text style={styles.dialogTitle}>Select your dates</Text>
              </View>
              <View style={styles.dateRow}>
                <TouchableOpacity style={styles.dateBox} onPress={() => setShowLeavePicker(true)}>
                  <Text style={styles.dateLabel}>Leave</Text>
                  <Text style={styles.dateValue}>{leaveDate ? leaveDate.toLocaleDateString() : 'Select date'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateBox} onPress={() => setShowReturnPicker(true)}>
                  <Text style={styles.dateLabel}>Return</Text>
                  <Text style={styles.dateValue}>{returnDate ? returnDate.toLocaleDateString() : 'Select date'}</Text>
                </TouchableOpacity>
              </View>
              {showLeavePicker && (
                <View style={styles.pickerContainer}>
                  <DateTimePicker value={leaveDate || new Date()} mode="date" display="spinner" onChange={onLeaveDateChange} />
                </View>
              )}
              {showReturnPicker && (
                <View style={styles.pickerContainer}>
                  <DateTimePicker value={returnDate || new Date()} mode="date" display="spinner" onChange={onReturnDateChange} />
                </View>
              )}
              {dateError !== '' && (
                <Text style={styles.errorText}>{dateError}</Text>
              )}
              <View style={styles.dialogButtons}>
                <TouchableOpacity onPress={() => { setShowSecondForm(false); setDateError(''); }} style={styles.dialogCancel}>
                  <Text style={{ color: '#555', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleFinalAdd} style={styles.dialogSave}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Add</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* ══════════════ EDIT DIALOG #1 — Name ══════════════ */}
      {showEditForm && (
        <TouchableOpacity style={styles.dialogOverlay} activeOpacity={1} onPress={handleEditCancel}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: '100%' }}>
            <LinearGradient colors={['#00AAFF', '#FFFFFF']} start={{ x: 0, y: 1.2 }} end={{ x: 0, y: 0 }} style={styles.dialogBox}>
              <View style={styles.dialogHeader}>
                <Image source={images.camera_on_map_2} style={styles.dialogImage} resizeMode="cover" />
                <Text style={styles.dialogTitle}>Edit adventure name</Text>
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  onChangeText={(e) => setEditName(e)}
                  value={editName}
                  style={styles.dialogInput}
                  placeholder="Enter a vacation name..."
                  placeholderTextColor="#aaa"
                  mode="flat"
                  underlineColor="transparent"
                  activeUnderlineColor="transparent"
                  autoFocus
                />
              </View>
              <View style={styles.dialogButtons}>
                <TouchableOpacity onPress={handleEditCancel} style={styles.dialogCancel}>
                  <Text style={{ color: '#555', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditNextStep} style={styles.dialogSave}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Next</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* ══════════════ EDIT DIALOG #2 — Dates ══════════════ */}
      {showEditDateForm && (
        <TouchableOpacity style={styles.dialogOverlay} activeOpacity={1} onPress={handleEditCancel}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: '100%' }}>
            <LinearGradient colors={['#00AAFF', '#FFFFFF']} start={{ x: 0, y: 1.2 }} end={{ x: 0, y: 0 }} style={styles.dialogBox}>
              <View style={styles.dialogHeader}>
                <Image source={images.camera_on_map_2} style={styles.dialogImage} resizeMode="cover" />
                <Text style={styles.dialogTitle}>Edit your dates</Text>
              </View>
              <View style={styles.dateRow}>
                <TouchableOpacity style={styles.dateBox} onPress={() => setShowEditLeavePicker(true)}>
                  <Text style={styles.dateLabel}>Leave</Text>
                  <Text style={styles.dateValue}>{editLeaveDate ? editLeaveDate.toLocaleDateString() : 'Select date'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dateBox} onPress={() => setShowEditReturnPicker(true)}>
                  <Text style={styles.dateLabel}>Return</Text>
                  <Text style={styles.dateValue}>{editReturnDate ? editReturnDate.toLocaleDateString() : 'Select date'}</Text>
                </TouchableOpacity>
              </View>
              {showEditLeavePicker && (
                <View style={styles.pickerContainer}>
                  <DateTimePicker value={editLeaveDate || new Date()} mode="date" display="spinner" onChange={onEditLeaveDateChange} />
                </View>
              )}
              {showEditReturnPicker && (
                <View style={styles.pickerContainer}>
                  <DateTimePicker value={editReturnDate || new Date()} mode="date" display="spinner" onChange={onEditReturnDateChange} />
                </View>
              )}
              {editDateError !== '' && (
                <Text style={styles.errorText}>{editDateError}</Text>
              )}
              <View style={styles.dialogButtons}>
                <TouchableOpacity onPress={handleEditCancel} style={styles.dialogCancel}>
                  <Text style={{ color: '#555', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEditSave} style={styles.dialogSave}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Save</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* ══════════════ DELETE CONFIRMATION DIALOG ══════════════ */}
      {deleteIndex !== null && (
        <TouchableOpacity style={styles.dialogOverlay} activeOpacity={1} onPress={handleCancelDelete}>
          <TouchableOpacity activeOpacity={1} onPress={() => {}} style={{ width: '100%' }}>
            <LinearGradient colors={['#FF4444', '#FFFFFF']} start={{ x: 0, y: 1.2 }} end={{ x: 0, y: 0 }} style={styles.dialogBox}>
              <View style={styles.dialogHeader}>
                <Icon name="delete-forever" size={52} color="#ff4444" style={{ marginBottom: 8 }} />
                <Text style={styles.dialogTitle}>Delete vacation?</Text>
                <Text style={styles.deleteSubtitle}>
                  This will permanently remove{'\n'}
                  <Text style={{ fontWeight: '700' }}>
                    {(() => {
                      const item = tasks[deleteIndex] || '';
                      const match = item.match(/^(.*)\s\((.+)\s→\s(.+)\)$/);
                      return match ? match[1] : item;
                    })()}
                  </Text>
                  {'\n'}from your trips.
                </Text>
              </View>
              <View style={styles.dialogButtons}>
                <TouchableOpacity onPress={handleCancelDelete} style={styles.dialogCancel}>
                  <Text style={{ color: '#555', fontSize: 14 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirmDelete} style={styles.dialogDelete}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </TouchableOpacity>
      )}

      {/* ══════════════ EMPTY STATE / LIST ══════════════ */}
      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Image source={images.homepage_bg} style={styles.emptyImage} resizeMode="contain" />
          <Text style={styles.emptyText}>Where to Next?</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          renderItem={({ item, index }) => {
            const match = item.match(/^(.*)\s\((.+)\s→\s(.+)\)$/);
            const name = match ? match[1].toUpperCase() : item.toUpperCase();
            const dateRange = match
              ? `${formatShortDate(match[2])} - ${formatShortDate(match[3])}`
              : '';

            return (
              <View style={styles.cardWrapper}>
                <TouchableOpacity
                  style={styles.card}
                  activeOpacity={0.85}
                  onPress={() => router.push({ pathname: '/create', params: { task: item } })}
                >
                  <Image source={images.homepage_bg} style={styles.cardImage} resizeMode="cover" />
                  <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} style={styles.cardOverlay} />
                  <View style={styles.cardCenter}>
                    <Text style={styles.cardTitle}>{name}</Text>
                    {dateRange ? <Text style={styles.cardDates}>{dateRange}</Text> : null}
                    <View style={styles.cardActions}>
                      <TouchableOpacity onPress={() => handleEditTask(index)} style={styles.cardActionBtn}>
                        <Icon name="edit" size={18} color="#fff" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleDeleteTask(index)} style={styles.cardActionBtn}>
                        <Icon name="delete" size={18} color="#fff" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      )}

      <StatusBar backgroundColor="#fff" style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  // ── Dialogs ───────────────────────────────────────────────
  dialogOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    zIndex: 999,
  },
  dialogBox: {
    width: '100%',
    maxWidth: 340,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
    overflow: 'hidden',
  },
  dialogHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  dialogImage: {
    width: 120,
    height: 100,
    opacity: 1,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a2e',
    marginBottom: 10,
  },
  deleteSubtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 4,
  },
  errorText: {
    fontSize: 12,
    color: '#e53935',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputWrapper: {
    width: '75%',
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
    marginBottom: 40,
  },
  dialogInput: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    paddingHorizontal: 10,
    fontSize: 14,
    height: 40,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  dateBox: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 6,
  },
  dateLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a2e',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginTop: -10,
  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
  },
  dialogCancel: {
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginRight: 30,
    width: 100,
  },
  dialogSave: {
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    marginLeft: 30,
    width: 100,
  },
  dialogDelete: {
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: '#e53935',
    alignItems: 'center',
    marginLeft: 30,
    width: 100,
  },

  // ── Empty state ───────────────────────────────────────────
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80,
  },
  emptyImage: {
    width: 180,
    height: 180,
    marginBottom: 6,
    opacity: 0.85,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a2e',
    letterSpacing: 0.3,
    marginTop: -50,
  },

  // ── Vacation cards ────────────────────────────────────────
  cardWrapper: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#ccc',
  },
  cardImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  cardCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 1.5,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  cardDates: {
    fontSize: 17,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 6,
    fontWeight: '600',
    letterSpacing: 1,
    textAlign: 'center',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    gap: 8,
  },
  cardActionBtn: {
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 20,
    padding: 6,
  },
});

export default Create;
