import { StyleSheet, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useRouter } from 'expo-router';

type QuickLink = {
  title: string;
  icon: 'headphones' | 'cart' | 'sparkles';
  route: '/(tabs)/headphones' | '/(tabs)/bucket' | '/(tabs)/explore';
  color: string;
};

export default function HomeScreen() {
  const router = useRouter();

  const featuredHeadphones = [
    {
      id: '1',
      name: 'Sony WH-1000XM4',
      price: 349.99,
      image: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg',
      link: 'https://www.sony.com/headphones/wh-1000xm4'
    },
    {
      id: '2',
      name: 'Apple AirPods Max',
      price: 549.99,
      image: 'https://i.pinimg.com/736x/b3/21/b4/b321b4e34315dd56e4844ab9efa049ae.jpg',
      link: 'https://www.apple.com/airpods-max'
    }
  ];

  const quickLinks: QuickLink[] = [
    {
      title: 'Browse Headphones',
      icon: 'headphones',
      route: '/(tabs)/headphones',
      color: '#0A84FF'
    },
    {
      title: 'View Bucket',
      icon: 'cart',
      route: '/(tabs)/bucket',
      color: '#32D74B'
    },
    {
      title: 'Check Features',
      icon: 'sparkles',
      route: '/(tabs)/explore',
      color: '#FF9F0A'
    }
  ];

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleRoutePress = (route: QuickLink['route']) => {
    router.push(route);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#000000' }]}>
      <ThemedView style={[styles.header, { backgroundColor: '#1C1C1E' }]}>
        <ThemedText type="title" style={{ color: '#FFFFFF' }}>Failed Project</ThemedText>
        <ThemedText style={[styles.subtitle, { color: '#8E8E93' }]}>
          Discover Failed headphones
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Quick Access
        </ThemedText>
        <ThemedView style={styles.quickLinks}>
          {quickLinks.map((link, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.quickLinkCard, { backgroundColor: '#1C1C1E' }]}
              onPress={() => handleRoutePress(link.route)}
            >
              <IconSymbol name={link.icon} size={32} color={link.color} />
              <ThemedText style={[styles.quickLinkText, { color: '#FFFFFF' }]}>
                {link.title}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Featured Headphones
        </ThemedText>
        {featuredHeadphones.map((headphone) => (
          <TouchableOpacity
            key={headphone.id}
            style={[styles.featuredCard, { backgroundColor: '#1C1C1E' }]}
            onPress={() => handleLinkPress(headphone.link)}
          >
            <Image source={{ uri: headphone.image }} style={styles.featuredImage} />
            <ThemedView style={styles.featuredInfo}>
              <ThemedText type="defaultSemiBold" style={[styles.featuredName, { color: '#FFFFFF' }]}>
                {headphone.name}
              </ThemedText>
              <ThemedText style={[styles.featuredPrice, { color: '#8E8E93' }]}>
                ${headphone.price}
              </ThemedText>
              <ThemedView style={styles.linkContainer}>
                <ThemedText style={[styles.linkText, { color: '#0A84FF' }]}>
                  View on Website
                </ThemedText>
                <IconSymbol name="chevron.right" size={16} color="#0A84FF" />
              </ThemedView>
            </ThemedView>
          </TouchableOpacity>
        ))}
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: '#FFFFFF' }]}>
          Why Choose Us?
        </ThemedText>
        <ThemedView style={[styles.featuresCard, { backgroundColor: '#1C1C1E' }]}>
          <ThemedView style={styles.feature}>
            <IconSymbol name="star.fill" size={24} color="#FFD60A" />
            <ThemedText style={[styles.featureText, { color: '#FFFFFF' }]}>
              Premium Quality Products
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.feature}>
            <IconSymbol name="location.fill" size={24} color="#32D74B" />
            <ThemedText style={[styles.featureText, { color: '#FFFFFF' }]}>
              Fast & Free Shipping
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.feature}>
            <IconSymbol name="creditcard.fill" size={24} color="#0A84FF" />
            <ThemedText style={[styles.featureText, { color: '#FFFFFF' }]}>
              2-Year Warranty
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 16,
  },
  quickLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  quickLinkCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    gap: 8,
  },
  quickLinkText: {
    fontSize: 14,
    textAlign: 'center',
  },
  featuredCard: {
    flexDirection: 'row',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  featuredImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  featuredInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  featuredName: {
    fontSize: 18,
    marginBottom: 4,
  },
  featuredPrice: {
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkText: {
    fontSize: 14,
  },
  featuresCard: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
  },
});
