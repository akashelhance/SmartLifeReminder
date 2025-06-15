import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { auth } from '../firebaseConfig';

const { width } = Dimensions.get('window');

interface Slide {
  id: number;
  title: string;
  description: string;
  image: ImageSourcePropType | null;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Never Miss Important Dates',
    description: 'Keep track of birthdays, anniversaries, and special occasions.',
    image: null, // Replace with actual image if needed
  },
  {
    id: 2,
    title: 'Smart Reminders',
    description: 'Get timely notifications and never forget to celebrate.',
    image: null,
  },
  {
    id: 3,
    title: 'Gift Ideas & Templates',
    description: 'Find perfect gift suggestions and ready-to-use message templates.',
    image: null,
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace('/(tabs)');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSkip();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      <Animated.View>
        <FlatList
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              {item.image ? (
                <Image source={item.image} style={styles.image} />
              ) : (
                <View style={[styles.image, { backgroundColor: '#eee' }]} />
              )}
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Animated.View>

      <View style={styles.footer}>
        <View style={styles.pagination}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 20, 8],
              extrapolate: 'clamp',
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                key={index}
                style={[
                  styles.dot,
                  {
                    width: dotWidth,
                    opacity,
                  },
                ]}
              />
            );
          })}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  slide: {
    width,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: 'contain',
    marginBottom: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5a67d8',
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: '#5a67d8',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
