import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function AddMedicineScreen() {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [timesPerDay, setTimesPerDay] = useState(1);
  const [reminderTimes, setReminderTimes] = useState<string[]>(['']);
  const [timePickersVisible, setTimePickersVisible] = useState<boolean[]>([false]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [medicineFrequency, setMedicineFrequency] = useState('');
  const [notes, setNotes] = useState('');
  const [doctor, setDoctor] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleTimeChange = (index: number, event: any, selectedDate?: Date) => {
    const currentTime = selectedDate || new Date();
    const newTimes = [...reminderTimes];
    newTimes[index] = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setReminderTimes(newTimes);

    const visibility = [...timePickersVisible];
    visibility[index] = false;
    setTimePickersVisible(visibility);
  };

  const handleTimesPerDayChange = (count: number) => {
    setTimesPerDay(count);
    setReminderTimes(Array(count).fill(''));
    setTimePickersVisible(Array(count).fill(false));
  };

  const saveReminder = async () => {
    if (
      !medicineName ||
      !startDate ||
      !reminderTimes.every(time => time) ||
      !dosage ||
      !medicineFrequency
    ) {
      Alert.alert('Please fill all required fields.');
      return;
    }

    const newReminder = {
      id: Date.now().toString(),
      medicineName,
      dosage,
      timesPerDay,
      reminderTimes,
      startDate: startDate.toISOString(),
      medicineFrequency,
      notes,
      doctor,
      notificationEnabled,
    };

    try {
      const stored = await AsyncStorage.getItem('medicine_reminders');
      const current = stored ? JSON.parse(stored) : [];
      current.push(newReminder);
      await AsyncStorage.setItem('medicine_reminders', JSON.stringify(current));
      Alert.alert('💊 Medicine Reminder Saved!');
      // reset
      setMedicineName('');
      setDosage('');
      setTimesPerDay(1);
      setReminderTimes(['']);
      setTimePickersVisible([false]);
      setStartDate(null);
      setMedicineFrequency('');
      setNotes('');
      setDoctor('');
      setNotificationEnabled(true);
    } catch (err) {
      console.error('Error saving reminder:', err);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>💊 Add Medicine Reminder</Text>
        <View style={styles.card}>
          <TextInput style={styles.input} placeholder="Medicine Name" value={medicineName} onChangeText={setMedicineName} />
          <TextInput style={styles.input} placeholder="Dosage (e.g., 500mg)" value={dosage} onChangeText={setDosage} />

          <Text style={styles.label}>How many times per day?</Text>
          <View style={styles.dropdown}>
            <Picker selectedValue={timesPerDay} onValueChange={(value) => handleTimesPerDayChange(value)}>
              {[1, 2, 3, 4].map((n) => (
                <Picker.Item key={n} label={`${n} time${n > 1 ? 's' : ''}`} value={n} />
              ))}
            </Picker>
          </View>

          {reminderTimes.map((time, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => {
                  const newVis = [...timePickersVisible];
                  newVis[index] = true;
                  setTimePickersVisible(newVis);
                }}
              >
                <Text style={styles.dateButtonText}>⏰ {time || `Select time ${index + 1}`}</Text>
              </TouchableOpacity>
              {timePickersVisible[index] && (
                <DateTimePicker
                  value={new Date()}
                  mode="time"
                  display="default"
                  onChange={(e, selectedTime) => handleTimeChange(index, e, selectedTime)}
                />
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>📅 Select Start Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={startDate || new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onChangeDate}
            />
          )}
          {startDate && <Text style={styles.selectedDate}>Start Date: {startDate.toDateString()}</Text>}

          <Text style={styles.label}>Medicine Frequency</Text>
          <View style={styles.dropdown}>
            <Picker selectedValue={medicineFrequency} onValueChange={(value) => setMedicineFrequency(value)}>
              <Picker.Item label="Select Frequency" value="" />
              <Picker.Item label="Daily" value="Daily" />
              <Picker.Item label="Alternate Days" value="Alternate Days" />
              <Picker.Item label="Weekly" value="Weekly" />
              <Picker.Item label="Every 15 Days" value="Every 15 Days" />
              <Picker.Item label="Monthly" value="Monthly" />
            </Picker>
          </View>

          <TextInput style={styles.input} placeholder="Doctor Name (optional)" value={doctor} onChangeText={setDoctor} />
          <TextInput style={styles.input} placeholder="Notes (optional)" value={notes} onChangeText={setNotes} />

          <View style={styles.toggleRow}>
            <Text style={styles.label}>Enable Notification</Text>
            <Switch value={notificationEnabled} onValueChange={setNotificationEnabled} />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveReminder}>
            <Text style={styles.saveButtonText}>💾 Save Reminder</Text>
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
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
    backgroundColor: '#6c63ff',
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
