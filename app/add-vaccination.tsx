import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function AddVaccinationScreen() {
  const [name, setName] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dose, setDose] = useState('');
  const [type, setType] = useState('');
  const [doctor, setDoctor] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [frequency, setFrequency] = useState('');

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const saveVaccination = async () => {
    if (!name.trim() || !vaccine.trim() || !date || !type || !frequency) {
      Alert.alert('Please fill all required fields.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      name,
      vaccine,
      date: date.toISOString(),
      dose,
      type,
      doctor,
      location,
      notes,
      notificationEnabled,
      frequency,
    };

    try {
      const stored = await AsyncStorage.getItem('vaccinations');
      const current = stored ? JSON.parse(stored) : [];
      current.push(newEntry);
      await AsyncStorage.setItem('vaccinations', JSON.stringify(current));
      Alert.alert('💉 Vaccination saved!');
      setName('');
      setVaccine('');
      setDate(null);
      setDose('');
      setType('');
      setDoctor('');
      setLocation('');
      setNotes('');
      setNotificationEnabled(true);
      setFrequency('');
    } catch (e) {
      console.error('Failed to save vaccination', e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>💉 Add Vaccination</Text>

        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Person/Pet Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Vaccine Name"
            value={vaccine}
            onChangeText={setVaccine}
          />

          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>📅 Select Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
            />
          )}
          {date && <Text style={styles.selectedDate}>Selected: {date.toDateString()}</Text>}

          <TextInput
            style={styles.input}
            placeholder="Dose Number (e.g., 1st, Booster)"
            value={dose}
            onChangeText={setDose}
          />

          <Text style={styles.label}>Vaccination Type</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={type} onValueChange={setType}>
              <Picker.Item label="Select Type" value="" />
              <Picker.Item label="Human" value="Human" />
              <Picker.Item label="Pet" value="Pet" />
              <Picker.Item label="Child" value="Child" />
              <Picker.Item label="Adult" value="Adult" />
            </Picker>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Doctor/Hospital Name"
            value={doctor}
            onChangeText={setDoctor}
          />
          <TextInput
            style={styles.input}
            placeholder="Clinic Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
          />

          <View style={styles.toggleRow}>
            <Text style={styles.label}>Enable Notification</Text>
            <Switch value={notificationEnabled} onValueChange={setNotificationEnabled} />
          </View>

          <Text style={styles.label}>Reminder Frequency</Text>
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={frequency} onValueChange={setFrequency}>
              <Picker.Item label="Select Frequency" value="" />
              <Picker.Item label="One-time" value="One-time" />
              <Picker.Item label="Yearly" value="Yearly" />
              <Picker.Item label="Every 6 months" value="Every 6 months" />
              <Picker.Item label="Custom" value="Custom" />
            </Picker>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveVaccination}>
            <Text style={styles.saveButtonText}>💾 Save Vaccination</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f8fa',
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
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
    marginBottom: 12,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#444',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 16,
  },
  dateButton: {
    backgroundColor: '#eeeeff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#444',
  },
  selectedDate: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
    fontSize: 15,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#5a67d8',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
