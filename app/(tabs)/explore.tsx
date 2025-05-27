import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="sparkles"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Features</ThemedText>
      </ThemedView>
      
      <ThemedText style={styles.subtitle}>
        Discover what makes this app special
      </ThemedText>

      <Collapsible title="Smart Task Management">
        <ThemedText>
          Organize your tasks with our intuitive interface. Features include:
        </ThemedText>
        <ThemedText style={styles.featureItem}>• Priority levels for important tasks</ThemedText>
        <ThemedText style={styles.featureItem}>• Due date reminders</ThemedText>
        <ThemedText style={styles.featureItem}>• Category organization</ThemedText>
      </Collapsible>

      <Collapsible title="Cross-Platform Sync">
        <ThemedText>
          Access your tasks anywhere, anytime. Our app works seamlessly across:
        </ThemedText>
        <ThemedText style={styles.featureItem}>• iOS devices</ThemedText>
        <ThemedText style={styles.featureItem}>• Android phones</ThemedText>
        <ThemedText style={styles.featureItem}>• Web browsers</ThemedText>
      </Collapsible>

      <Collapsible title="Customization">
        <ThemedText>
          Make the app your own with these features:
        </ThemedText>
        <ThemedText style={styles.featureItem}>• Light and dark mode support</ThemedText>
        <ThemedText style={styles.featureItem}>• Custom categories and tags</ThemedText>
        <ThemedText style={styles.featureItem}>• Personalized notifications</ThemedText>
      </Collapsible>

      <Collapsible title="Productivity Tools">
        <ThemedText>
          Boost your productivity with our built-in tools:
        </ThemedText>
        <ThemedText style={styles.featureItem}>• Progress tracking</ThemedText>
        <ThemedText style={styles.featureItem}>• Task analytics</ThemedText>
        <ThemedText style={styles.featureItem}>• Quick task creation</ThemedText>
      </Collapsible>

      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Start organizing your tasks today!
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    opacity: 0.8,
  },
  featureItem: {
    marginLeft: 16,
    marginVertical: 4,
  },
  footer: {
    marginTop: 30,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
