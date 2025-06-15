import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AddHealthCheckupScreen() {
  const [name, setName] = useState('');
  const [checkupType, setCheckupType] = useState('');
  const [date, setDate] = useState(new Date());
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [reminderFrequency, setReminderFrequency] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [clinicLocation, setClinicLocation] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [notes, setNotes] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setHasSelectedDate(true);
    }
  };

  const saveCheckup = async () => {
    if (!name.trim() || !checkupType.trim() || !reminderFrequency.trim()) {
      Alert.alert('Please fill all required fields: name, check-up type, and frequency.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      name,
      checkupType,
      date: date.toISOString(),
      reminderFrequency,
      doctorName,
      clinicLocation,
      notificationEnabled,
      notes,
      type: 'health-checkup',
    };

    try {
      const stored = await AsyncStorage.getItem('healthCheckups');
      const current = stored ? JSON.parse(stored) : [];
      current.push(newEntry);
      await AsyncStorage.setItem('healthCheckups', JSON.stringify(current));
      Alert.alert('🩺 Health Check-up reminder saved!');
      resetForm();
    } catch (e) {
      console.error('Failed to save checkup', e);
      Alert.alert('❌ Error saving reminder');
    }
  };

  const resetForm = () => {
    setName('');
    setCheckupType('');
    setReminderFrequency('');
    setDoctorName('');
    setClinicLocation('');
    setNotificationEnabled(true);
    setNotes('');
    setDate(new Date());
    setHasSelectedDate(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>🩺 Add Health Check-up</Text>
      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Name (e.g., Dad, Riya)"
          value={name}
          onChangeText={setName}
        />

        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>🩺 Check-up Type</Text>
          <Picker
            selectedValue={checkupType}
            onValueChange={(value) => setCheckupType(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select type" value="" />
            <Picker.Item label="Full Body" value="Full Body" />
            <Picker.Item label="Dental" value="Dental" />
            <Picker.Item label="Eye" value="Eye" />
            <Picker.Item label="Blood Test" value="Blood Test" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>📅 Select Date</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChangeDate}
          />
        )}

        {hasSelectedDate && (
          <Text style={styles.selectedDate}>Selected: {date.toDateString()}</Text>
        )}

        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>⏰ Reminder Frequency</Text>
          <Picker
            selectedValue={reminderFrequency}
            onValueChange={(value) => setReminderFrequency(value)}
            style={styles.picker}
          >
            <Picker.Item label="Select frequency" value="" />
            <Picker.Item label="Once" value="Once" />
            <Picker.Item label="Every 6 Months" value="6 Months" />
            <Picker.Item label="Yearly" value="Yearly" />
          </Picker>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Doctor's Name (optional)"
          value={doctorName}
          onChangeText={setDoctorName}
        />

        <TextInput
          style={styles.input}
          placeholder="Clinic Location (optional)"
          value={clinicLocation}
          onChangeText={setClinicLocation}
        />

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>🔔 Enable Notification</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={setNotificationEnabled}
            trackColor={{ false: '#ccc', true: '#6c63ff' }}
            thumbColor={notificationEnabled ? '#fff' : '#888'}
          />
        </View>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Notes (optional)"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        <TouchableOpacity style={styles.saveButton} onPress={saveCheckup}>
          <Text style={styles.saveButtonText}>💾 Save Check-up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f7f8fa',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: '#eeeeff',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#444',
  },
  selectedDate: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    fontSize: 15,
  },
  pickerWrapper: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: '600',
    padding: 10,
    backgroundColor: '#f3f4f6',
    color: '#333',
  },
  picker: {
    height: 50,
    color: '#333',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#444',
  },
  saveButton: {
    backgroundColor: '#5a67d8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
