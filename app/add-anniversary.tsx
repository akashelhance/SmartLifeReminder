import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function AddAnniversaryScreen() {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [hasSelectedDate, setHasSelectedDate] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const onChangeDate = (_event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setHasSelectedDate(true);
    }
  };

  const saveAnniversary = async () => {
    if (!name.trim()) {
      Alert.alert('Please enter a couple\'s name.');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      name,
      date: date.toISOString(),
      type: 'anniversary',
      notificationEnabled,
    };

    try {
      const stored = await AsyncStorage.getItem('anniversaries');
      const current = stored ? JSON.parse(stored) : [];
      current.push(newEntry);
      await AsyncStorage.setItem('anniversaries', JSON.stringify(current));
      Alert.alert('🎊 Anniversary saved!');
      resetForm();
    } catch (e) {
      console.error('Failed to save anniversary', e);
      Alert.alert('❌ Failed to save reminder');
    }
  };

  const resetForm = () => {
    setName('');
    setDate(new Date());
    setHasSelectedDate(false);
    setNotificationEnabled(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>💍 Add Anniversary</Text>

      <View style={styles.card}>
        <TextInput
          style={styles.input}
          placeholder="Couple's Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#999"
        />

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

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>🔔 Enable Notification</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={setNotificationEnabled}
            trackColor={{ false: '#ccc', true: '#6c63ff' }}
            thumbColor={notificationEnabled ? '#fff' : '#888'}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveAnniversary}>
          <Text style={styles.saveButtonText}>💾 Save Anniversary</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
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
  dateButton: {
    backgroundColor: '#eeeeff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
