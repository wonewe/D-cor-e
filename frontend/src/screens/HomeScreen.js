import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { Button, Text, useTheme } from 'react-native-paper';
import ROUTES from '../navigation/routes';

const heroImage =
  'https://images.unsplash.com/photo-1508804052814-cd3ba865a116?auto=format&fit=crop&w=1600&q=80';

export default function HomeScreen({ navigation }) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: heroImage }}
        resizeMode="cover"
        style={styles.hero}
        imageStyle={styles.heroImage}
      >
        <View style={styles.overlay}>
          <Text variant="headlineLarge" style={styles.headline}>
            The Local Companion
          </Text>
          <Text variant="bodyMedium" style={styles.subheading}>
            Le compagnon qui décode Séoul et la Corée, chaque semaine.
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.actions}>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          onPress={() => navigation.navigate(ROUTES.TREND_REPORT)}
        >
          Explorer les tendances
        </Button>
        <Button
          mode="contained"
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          onPress={() => navigation.navigate(ROUTES.EVENT_CALENDAR)}
        >
          Calendrier K-Culture
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          textColor={theme.colors.primary}
          onPress={() => navigation.navigate(ROUTES.PHRASEBOOK)}
        >
          Carnet de phrases
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7F3',
  },
  hero: {
    flex: 1.3,
    justifyContent: 'flex-end',
  },
  heroImage: {
    opacity: 0.85,
  },
  overlay: {
    paddingHorizontal: 24,
    paddingVertical: 36,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  headline: {
    color: '#FFFFFF',
    fontWeight: '700',
    marginBottom: 12,
  },
  subheading: {
    color: '#F6F6F6',
  },
  actions: {
    flex: 1,
    padding: 24,
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    paddingVertical: 6,
  },
});
