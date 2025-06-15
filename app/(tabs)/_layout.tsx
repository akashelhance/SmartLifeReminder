import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#5a67d8',
      tabBarInactiveTintColor: '#666',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="birthdays"
        options={{
          title: 'Birthdays',
          tabBarIcon: ({ color }) => <FontAwesome name="calendar" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="gifts"
        options={{
          title: 'Gifts',
          tabBarIcon: ({ color }) => <FontAwesome name="gift" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
