import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

interface Birthday {
  name: string;
  date: string;
}

export default function BirthdaysScreen() {
  const [birthdays, setBirthdays] = useState<Birthday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBirthdays();
  }, []);

  const loadBirthdays = async () => {
    try {
      const stored = await AsyncStorage.getItem('birthdays');
      const data = stored ? JSON.parse(stored) : [];
      setBirthdays(data);
    } catch (error) {
      console.error('Failed to load birthdays:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBirthdayItem = ({ item }: { item: Birthday }) => (
    <View style={styles.birthdayItem}>
      <Text style={styles.birthdayName}>{item.name}</Text>
      <Text style={styles.birthdayDate}>{new Date(item.date).toLocaleDateString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Birthdays</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#5a67d8" />
      ) : birthdays.length > 0 ? (
        <FlatList
          data={birthdays}
          renderItem={renderBirthdayItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.birthdayList}
        />
      ) : (
        <Text style={styles.emptyText}>No birthdays added yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 24,
  },
  birthdayList: {
    flex: 1,
  },
  birthdayItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  birthdayName: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,
  },
  birthdayDate: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
}); 