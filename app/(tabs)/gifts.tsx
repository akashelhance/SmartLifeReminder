import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function GiftsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gift Ideas</Text>
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎁 Popular Gift Categories</Text>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Electronics</Text>
            <Text style={styles.cardText}>• Smart watches</Text>
            <Text style={styles.cardText}>• Wireless earbuds</Text>
            <Text style={styles.cardText}>• Portable chargers</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Fashion</Text>
            <Text style={styles.cardText}>• Designer accessories</Text>
            <Text style={styles.cardText}>• Trendy clothing</Text>
            <Text style={styles.cardText}>• Luxury watches</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Experiences</Text>
            <Text style={styles.cardText}>• Concert tickets</Text>
            <Text style={styles.cardText}>• Spa packages</Text>
            <Text style={styles.cardText}>• Cooking classes</Text>
          </View>
        </View>
      </ScrollView>
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
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  card: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
}); 