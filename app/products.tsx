import { StyleSheet, View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, router } from 'expo-router';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import Animated, { FadeInDown } from 'react-native-reanimated';

const headphones = [
  {
    id: 1,
    name: 'Sony WH-1000XM5',
    price: '$399',
    image: 'https://i.pinimg.com/736x/d3/c9/46/d3c946b55b8e68553d8a93c96b2a86f0.jpg',
    description: 'Industry-leading noise cancellation with exceptional sound quality',
    features: ['40-hour battery life', 'Multi-device pairing', 'Touch controls']
  },
  {
    id: 2,
    name: 'Bose QuietComfort 45',
    price: '$329',
    image: 'https://i.pinimg.com/736x/76/79/f5/7679f596375494c0ec9f433936ca14f8.jpg',
    description: 'Comfortable over-ear design with premium noise cancellation',
    features: ['24-hour battery life', 'Quick charging', 'Built-in Alexa']
  },
  {
    id: 3,
    name: 'Apple Smart Watch',
    price: '$549',
    image: 'https://i.pinimg.com/736x/52/74/a5/5274a5ccd6163ee44184ef01d901ecbd.jpg',
    description: 'Premium over-ear headphones with spatial audio',
    features: ['20-hour battery life', 'Active Noise Cancellation', 'Spatial Audio']
  }, 
  {
    id: 4,
    name: 'Apple watch',
    price: '$379',
    image: 'https://i.pinimg.com/736x/c5/f0/19/c5f0190f8fbff16752c3595392760d79.jpg',
    description: 'High-fidelity sound with premium build quality',
    features: ['60-hour battery life', 'Smart Pause', 'Premium materials']
  },
  {
    id: 5,
    name: 'Bang & Olufsen Beoplay H95',
    price: '$799',
    image: 'https://i.pinimg.com/736x/8b/37/04/8b37046a583e73a4f5643f7bbdff0fcd.jpg',
    description: 'Luxury headphones with exceptional sound and comfort',
    features: ['38-hour battery life', 'Premium materials', 'Advanced ANC']
  },
  {
    id: 6,
    name: 'Focal Bathys',
    price: '$699',
    image: 'https://i.pinimg.com/736x/eb/d5/d1/ebd5d138a2859c6c2087bae45e6274ba.jpg',
    description: 'High-end wireless headphones with audiophile-grade sound',
    features: ['30-hour battery life', 'USB-DAC mode', 'Premium drivers']
  }
];

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

export default function ProductsScreen() {
  const handleProductPress = (productId: number) => {
    router.push({
      pathname: '/product/[id]',
      params: { id: productId }
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen 
        options={{ 
          title: 'Premium Headphones',
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerShadowVisible: false,
        }} 
      />
      
      <View style={styles.header}>
        <Text style={styles.title}>Premium Headphones</Text>
        <Text style={styles.subtitle}>Discover our collection of high-end audio</Text>
      </View>

      <View style={styles.grid}>
        {headphones.map((product, index) => (
          <Animated.View
            key={product.id}
            entering={FadeInDown.delay(index * 100)}
            style={[styles.cardContainer, { width: cardWidth }]}
          >
            <Pressable
              onPress={() => handleProductPress(product.id)}
              style={styles.card}
            >
              <Image
                source={product.image}
                style={styles.image}
                contentFit="cover"
                transition={1000}
              />
              <BlurView intensity={20} style={styles.cardContent}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.description} numberOfLines={2}>
                  {product.description}
                </Text>
              </BlurView>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    gap: 20,
  },
  cardContainer: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  card: {
    height: 280,
    borderRadius: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
}); 