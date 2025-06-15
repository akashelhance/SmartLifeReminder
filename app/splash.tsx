import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet
} from 'react-native';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const titleAnim = useRef(new Animated.Value(0)).current;
  const subtitleAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          friction: 4,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(titleAnim, {
        toValue: 1,
        duration: 700,
        delay: 100,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 1,
        duration: 700,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.replace('/');
      }, 1500);
    });
  }, []);

  return (
    <LinearGradient
      colors={['#6c63ff', '#89f7fe']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Animated.Text
        style={[
          styles.logo,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        🎯
      </Animated.Text>
      <Animated.Text style={[styles.title, { opacity: titleAnim }]}>
        Smart Life Reminder
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: subtitleAnim }]}>
        Never miss a moment again.
      </Animated.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 80,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: '#f0f0f0',
    marginTop: 8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
