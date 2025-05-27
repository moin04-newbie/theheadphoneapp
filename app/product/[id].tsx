import { StyleSheet, View, Text, ScrollView, Pressable, Dimensions } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Image } from 'expo-image';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const headphones = [
  {
    id: 1,
    name: 'Sony WH-1000XM5',
    price: '$399',
    image: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg',
    description: 'Industry-leading noise cancellation with exceptional sound quality',
    features: ['40-hour battery life', 'Multi-device pairing', 'Touch controls'],
    specifications: {
      'Noise Cancellation': 'Industry-leading ANC',
      'Battery Life': '40 hours',
      'Bluetooth Version': '5.2',
      'Weight': '250g',
      'Driver Size': '30mm',
      'Water Resistance': 'IPX4'
    }
  },
  {
    id: 2,
    name: 'Bose QuietComfort 45',
    price: '$329',
    image: 'https://i.pinimg.com/736x/55/a8/04/55a8040b27b707747534297f70dbf1af.jpg',
    description: 'Comfortable over-ear design with premium noise cancellation',
    features: ['24-hour battery life', 'Quick charging', 'Built-in Alexa'],
    specifications: {
      'Noise Cancellation': 'Premium ANC',
      'Battery Life': '24 hours',
      'Bluetooth Version': '5.1',
      'Weight': '240g',
      'Driver Size': '40mm',
      'Water Resistance': 'IPX4'
    }
  },
  {
    id: 3,
    name: 'Apple AirPods Max',
    price: '$544',
    image: 'https://i.pinimg.com/736x/71/02/d6/7102d69ca1eb1da2f440d2eabab28714.jpg',
    description:  "Premium smart speaker with immersive 360° audio, deep bass, and seamless Apple ecosystem integration.",
    features: [ "Room-filling sound with computational audio",
        "Siri voice control & smart home hub",
        "Seamless AirPlay & Apple Music integration",
        "Multi-room audio support"],
    specifications: {
     "Audio Technology": "High-excursion woofer,",
    "Microphones": "4-beamforming array for Siri",
    "Connectivity": "Wi-Fi 6, Bluetooth 5.0",
    "Dimensions": "6.6 x 5.6 inches",
    "Weight": "5.4 lbs (2.5 kg)",
    "Voice Assistant": "Siri",
    "Compatibility":    "Works with iPhone, iPad, Apple TV"
    }
  },
  {
    id: 4,
    name: 'Sennheiser Momentum 4',
    price: '$379',
    image: 'https://i.pinimg.com/736x/05/fa/29/05fa29880ed43c2a5a667cb24c6e8bfe.jpg',
    description: 'High-fidelity sound with premium build quality',
    features: ['60-hour battery life', 'Smart Pause', 'Premium materials'],
    specifications: {
      'Noise Cancellation': 'Adaptive ANC',
      'Battery Life': '60 hours',
      'Bluetooth Version': '5.2',
      'Weight': '290g',
      'Driver Size': '42mm',
      'Water Resistance': 'IPX4'
    }
  },
  {
    id: 5,
    name: 'Bang & Olufsen Beoplay H95',
    price: '$799',
    image: 'https://i.pinimg.com/736x/e6/a1/f6/e6a1f61cca59065ff9fc747dab2067e1.jpg',
    description: 'Luxury headphones with exceptional sound and comfort',
    features: ['38-hour battery life', 'Premium materials', 'Advanced ANC'],
    specifications: {
      'Noise Cancellation': 'Advanced ANC',
      'Battery Life': '38 hours',
      'Bluetooth Version': '5.1',
      'Weight': '325g',
      'Driver Size': '40mm',
      'Water Resistance': 'IP54'
    }
  },
  {
    id: 6,
    name: 'Focal Bathys',
    price: '$699',
    image: 'https://i.pinimg.com/736x/99/3b/c3/993bc33cf73a09b3a0224aab4ae743c6.jpg',
    description: 'High-end wireless headphones with audiophile-grade sound',
    features: ['30-hour battery life', 'USB-DAC mode', 'Premium drivers'],
    specifications: {
      'Noise Cancellation': 'Hybrid ANC',
      'Battery Life': '30 hours',
      'Bluetooth Version': '5.1',
      'Weight': '350g',
      'Driver Size': '40mm',
      'Water Resistance': 'IPX4'
    }
  }
];

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const product = headphones.find(h => h.id === Number(id));

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen 
        options={{ 
          title: product.name,
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerShadowVisible: false,
        }} 
      />
      
      <Animated.View entering={FadeIn.duration(500)}>
        <Image
          source={product.image}
          style={styles.image}
          contentFit="cover"
          transition={1000}
        />
        
        <View style={styles.content}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#007AFF" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.specsContainer}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            {Object.entries(product.specifications).map(([key, value]) => (
              <View key={key} style={styles.specItem}>
                <Text style={styles.specKey}>{key}</Text>
                <Text style={styles.specValue}>{value}</Text>
              </View>
            ))}
          </View>
        </View>
      </Animated.View>

      <View style={styles.footer}>
        <Pressable style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: width,
    height: width,
  },
  content: {
    padding: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  featuresContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  specsContainer: {
    marginBottom: 30,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  specKey: {
    fontSize: 16,
    color: '#666',
  },
  specValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 