import { useRouter } from 'expo-router';
import React from 'react';
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type ReminderPath =
  | '/add-birthday'
  | '/add-anniversary'
  | '/add-health-checkup'
  | '/add-vaccination'
  | '/add-medicine'
  | '';

interface ReminderType {
  icon: string;
  title: string;
  description: string;
  path: ReminderPath;
}

const reminderTypes: ReminderType[] = [
  {
    icon: '🎂',
    title: 'Birthday Reminder',
    description: 'Never forget birthdays. Get templates to send wishes instantly.',
    path: '/add-birthday',
  },
  {
    icon: '💍',
    title: 'Anniversary Reminder',
    description: 'Track relationship milestones and send romantic surprises.',
    path: '/add-anniversary',
  },
  {
    icon: '🩺',
    title: 'Health Check-up',
    description: 'Stay ahead with scheduled health checkup alerts.',
    path: '/add-health-checkup',
  },
  {
    icon: '💉',
    title: 'Vaccination Reminder',
    description: 'Track vaccinations for family, kids, and pets.',
    path: '/add-vaccination',
  },
  {
    icon: '💊',
    title: 'Medicine Reminder',
    description: "Get notified when it's time to take your medicines.",
    path: '/add-medicine',
  },
];

export default function HomeScreen() {
  const scale = React.useRef(new Animated.Value(0.9)).current;
  const router = useRouter();

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 100,
    }).start();
  }, []);

  const handleReminderPress = (path: ReminderPath) => {
    if (path) {
      router.push(path);
    } else {
      Alert.alert('Coming Soon', 'This feature is under development 🚧');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Animated.View style={{ transform: [{ scale }] }}>
        <Text style={styles.heading}>✨ Smart Life Reminder</Text>
        <Text style={styles.subheading}>Stay on top of what matters</Text>

        {reminderTypes.map((reminder, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.iconWrapper}>
              <Text style={styles.icon}>{reminder.icon}</Text>
            </View>
            <Text style={styles.title}>{reminder.title}</Text>
            <Text style={styles.description}>{reminder.description}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleReminderPress(reminder.path)}
            >
              <Text style={styles.buttonText}>➕ Add Reminder</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eef1f7',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  heading: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1a1a2e',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    marginBottom: 22,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#e6e8ec',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    alignSelf: 'center',
  },
  icon: {
    fontSize: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2b2d42',
    textAlign: 'center',
    marginBottom: 6,
  },
  description: {
    fontSize: 15,
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#6c63ff',
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#6c63ff',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});
