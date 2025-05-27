import { useState, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image, Dimensions, TextInput, Modal, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BlurView } from 'expo-blur';


const { width } = Dimensions.get('window');

interface Headphone {
  id: string;
  name: string;
  price: number;
  brand: string;
  isFavorite: boolean;
  inBucket: boolean;
  image: string;
  rating: number;
  description: string;
  features: string[];
  category: string;
}

type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'name';

export default function HeadphonesScreen() {
  const [headphones, setHeadphones] = useState<Headphone[]>([
    {
      id: '1',
      name: 'Sony WH-1000XM4',
      price: 349.99,
      brand: 'Sony',
      isFavorite: false,
      inBucket: false,
      image: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg',
      rating: 4.8,
      description: 'Industry-leading noise canceling with Dual Noise Sensor technology',
      features: ['30-hour battery life', 'Touch controls', 'Hi-Res Audio'],
      category: 'Noise Cancelling'
    },
    {
      id: '2',
      name: 'Bose QuietComfort 45',
      price: 329.99,
      brand: 'Bose',
      isFavorite: false,
      inBucket: false,
      image: 'https://i.pinimg.com/736x/4a/d8/ad/4ad8ad9edf0231341ee4bec3ff7cb414.jpg',
      rating: 4.7,
      description: 'Next-level noise canceling headphones with premium comfort',
      features: ['24-hour battery life', 'Triple-mic system', 'Bluetooth 5.1'],
      category: 'Noise Cancelling'
    },
    {
      id: '3',
      name: 'Apple AirPods Max',
      price: 549.99,
      brand: 'Apple',
      isFavorite: false,
      inBucket: false,
      image: 'https://i.pinimg.com/736x/b3/21/b4/b321b4e34315dd56e4844ab9efa049ae.jpg',
      rating: 4.6,
      description: 'A perfect balance of high-fidelity audio and the magic of AirPods',
      features: ['Active Noise Cancellation', 'Spatial Audio', '20-hour battery'],
      category: 'Wireless'
    },
    {
      id: '4',
      name: 'Sennheiser Momentum 4',
      price: 399.99,
      brand: 'Sennheiser',
      isFavorite: false,
      inBucket: false,
      image: 'https://i.pinimg.com/736x/d2/6e/9d/d26e9d21c827a58e71d206ce55bd031c.jpg',
      rating: 4.5,
      description: 'Premium wireless headphones with exceptional sound quality',
      features: ['60-hour battery life', 'Smart Pause', 'Bluetooth 5.2'],
      category: 'Wireless'
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('rating');
  const [showSortModal, setShowSortModal] = useState(false);

  const filteredHeadphones = headphones
    .filter(headphone => {
      const matchesSearch = headphone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          headphone.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || headphone.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const categories = Array.from(new Set(headphones.map(h => h.category)));

  const toggleFavorite = (id: string) => {
    setHeadphones(headphones.map(headphone => 
      headphone.id === id 
        ? { ...headphone, isFavorite: !headphone.isFavorite }
        : headphone
    ));
  };

  const toggleBucket = (id: string) => {
    setHeadphones(headphones.map(headphone => 
      headphone.id === id 
        ? { ...headphone, inBucket: !headphone.inBucket }
        : headphone
    ));
  };

  const renderStars = (rating: number) => {
    return (
      <ThemedView style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <IconSymbol
            key={star}
            name={star <= rating ? "star.fill" : "star"}
            size={16}
            color={star <= rating ? "#FFD700" : "#808080"}
          />
        ))}
        <ThemedText style={styles.ratingText}>{rating}</ThemedText>
      </ThemedView>
    );
  };

  const renderHeadphone = ({ item }: { item: Headphone }) => (
    <ThemedView style={[styles.headphoneCard, { backgroundColor: '#1C1C1E' }]}>
      <Image source={{ uri: item.image }} style={styles.headphoneImage} />
      <ThemedView style={styles.headphoneInfo}>
        <ThemedText type="defaultSemiBold" style={[styles.headphoneName, { color: '#FFFFFF' }]}>{item.name}</ThemedText>
        <ThemedText style={[styles.brand, { color: '#8E8E93' }]}>{item.brand}</ThemedText>
        {renderStars(item.rating)}
        <ThemedText style={[styles.description, { color: '#8E8E93' }]} numberOfLines={2}>{item.description}</ThemedText>
        <ThemedView style={styles.featuresContainer}>
          {item.features.map((feature, index) => (
            <ThemedView key={index} style={[styles.featureTag, { backgroundColor: '#2C2C2E' }]}>
              <ThemedText style={[styles.featureText, { color: '#8E8E93' }]}>{feature}</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
        <ThemedView style={styles.priceContainer}>
          <ThemedText type="defaultSemiBold" style={[styles.price, { color: '#FFFFFF' }]}>${item.price}</ThemedText>
          <ThemedView style={styles.actionButtons}>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.button}>
              <IconSymbol
                name={item.isFavorite ? "heart.fill" : "heart"}
                size={24}
                color={item.isFavorite ? "#FF453A" : "#8E8E93"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toggleBucket(item.id)} style={styles.button}>
              <IconSymbol
                name={item.inBucket ? "cart.fill" : "cart"}
                size={24}
                color={item.inBucket ? "#32D74B" : "#8E8E93"}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showFilters}
      onRequestClose={() => setShowFilters(false)}
    >
      <BlurView intensity={20} style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="title" style={styles.modalTitle}>Filter Headphones</ThemedText>
          
          <ThemedText style={styles.filterLabel}>Category</ThemedText>
          <ThemedView style={styles.categoryContainer}>
            <TouchableOpacity
              style={[styles.categoryButton, !selectedCategory && styles.selectedCategory]}
              onPress={() => setSelectedCategory(null)}
            >
              <ThemedText>All</ThemedText>
            </TouchableOpacity>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
                onPress={() => setSelectedCategory(category)}
              >
                <ThemedText>{category}</ThemedText>
              </TouchableOpacity>
            ))}
          </ThemedView>

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => setShowFilters(false)}
          >
            <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </BlurView>
    </Modal>
  );

  const renderSortModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSortModal}
      onRequestClose={() => setShowSortModal(false)}
    >
      <BlurView intensity={20} style={styles.modalOverlay}>
        <ThemedView style={styles.modalContent}>
          <ThemedText type="title" style={styles.modalTitle}>Sort By</ThemedText>
          
          {[
            { label: 'Highest Rating', value: 'rating' },
            { label: 'Price: Low to High', value: 'price-asc' },
            { label: 'Price: High to Low', value: 'price-desc' },
            { label: 'Name', value: 'name' },
          ].map(option => (
            <TouchableOpacity
              key={option.value}
              style={[styles.sortOption, sortBy === option.value && styles.selectedSort]}
              onPress={() => {
                setSortBy(option.value as SortOption);
                setShowSortModal(false);
              }}
            >
              <ThemedText>{option.label}</ThemedText>
              {sortBy === option.value && (
                <IconSymbol name="checkmark" size={20} color="#007AFF" />
              )}
            </TouchableOpacity>
          ))}
        </ThemedView>
      </BlurView>
    </Modal>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#000000' }]}>
      <ThemedView style={[styles.header, { backgroundColor: '#1C1C1E' }]}>
        <ThemedText type="title" style={{ color: '#FFFFFF' }}>Headphones</ThemedText>
        <ThemedView style={styles.stats}>
          <ThemedText style={{ color: '#8E8E93' }}>
            Favorites: {headphones.filter(h => h.isFavorite).length}
          </ThemedText>
          <ThemedText style={{ color: '#8E8E93' }}>
            In Bucket: {headphones.filter(h => h.inBucket).length}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={[styles.searchContainer, { backgroundColor: '#1C1C1E' }]}>
        <ThemedView style={[styles.searchBar, { backgroundColor: '#2C2C2E' }]}>
          <IconSymbol name="magnifyingglass" size={20} color="#8E8E93" />
          <TextInput
            style={[styles.searchInput, { color: '#FFFFFF' }]}
            placeholder="Search headphones..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </ThemedView>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilters(true)}>
          <IconSymbol name="line.3.horizontal.decrease.circle" size={24} color="#0A84FF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowSortModal(true)}>
          <IconSymbol name="arrow.up.arrow.down" size={24} color="#0A84FF" />
        </TouchableOpacity>
      </ThemedView>

      <FlatList
        data={filteredHeadphones}
        renderItem={renderHeadphone}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      {renderFilterModal()}
      {renderSortModal()}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  filterButton: {
    padding: 8,
  },
  list: {
    padding: 16,
  },
  headphoneCard: {
    marginBottom: 20,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    overflow: 'hidden',
  },
  headphoneImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  headphoneInfo: {
    padding: 16,
  },
  headphoneName: {
    fontSize: 18,
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
  },
  description: {
    fontSize: 14,
    marginBottom: 12,
    opacity: 0.8,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  featureTag: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  featureText: {
    fontSize: 12,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  selectedCategory: {
    backgroundColor: '#007AFF',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sortOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedSort: {
    backgroundColor: '#F5F5F5',
  },
}); 