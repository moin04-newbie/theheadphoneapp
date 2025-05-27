import { useState } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface BucketItem {
  id: string;
  name: string;
  price: number;
  brand: string;
  image: string;
  quantity: number;
}

export default function BucketScreen() {
  const [items, setItems] = useState<BucketItem[]>([
    {
      id: '1',
      name: 'Sony WH-1000XM4',
      price: 349.99,
      brand: 'Sony',
      image: 'https://cdn.thewirecutter.com/wp-content/media/2023/07/bluetoothheadphones-2048px-0876.jpg',
      quantity: 1,
    },
    {
        id: '4',
        name: 'Sennheiser Momentum 4',
        price: 349.99,
        brand: 'Sony',
        image: 'https://i.pinimg.com/736x/d2/6e/9d/d26e9d21c827a58e71d206ce55bd031c.jpg',
        quantity: 1,
      },

    {
        id: '3',
        name: 'Apple AIRPODs Max',
        price: 549.99,
        brand: 'Apple',
        image: 'https://i.pinimg.com/736x/b3/21/b4/b321b4e34315dd56e4844ab9efa049ae.jpg',
        quantity: 1,
      },

    {
      id: '2',
      name: 'Bose QuietComfort 45',
      price: 329.99,
      brand: 'Bose',
      image: 'https://i.pinimg.com/736x/4a/d8/ad/4ad8ad9edf0231341ee4bec3ff7cb414.jpg',
      quantity: 1,
    },
  ]);


  

  const updateQuantity = (id: string, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your bucket?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setItems(items.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const renderItem = ({ item }: { item: BucketItem }) => (
    <ThemedView style={[styles.itemCard, { backgroundColor: '#1C1C1E' }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <ThemedView style={styles.itemInfo}>
        <ThemedText type="defaultSemiBold" style={[styles.itemName, { color: '#FFFFFF' }]}>{item.name}</ThemedText>
        <ThemedText style={[styles.brand, { color: '#8E8E93' }]}>{item.brand}</ThemedText>
        <ThemedText type="defaultSemiBold" style={[styles.price, { color: '#FFFFFF' }]}>${item.price}</ThemedText>
        
        <ThemedView style={styles.quantityContainer}>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: '#2C2C2E' }]}
            onPress={() => updateQuantity(item.id, -1)}
          >
            <IconSymbol name="minus" size={20} color="#0A84FF" />
          </TouchableOpacity>
          <ThemedText style={[styles.quantity, { color: '#FFFFFF' }]}>{item.quantity}</ThemedText>
          <TouchableOpacity
            style={[styles.quantityButton, { backgroundColor: '#2C2C2E' }]}
            onPress={() => updateQuantity(item.id, 1)}
          >
            <IconSymbol name="plus" size={20} color="#0A84FF" />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <IconSymbol name="trash" size={24} color="#FF453A" />
      </TouchableOpacity>
    </ThemedView>
  );

  return (
    <ThemedView style={[styles.container, { backgroundColor: '#000000' }]}>
      <ThemedView style={[styles.header, { backgroundColor: '#1C1C1E' }]}>
        <ThemedText type="title" style={{ color: '#FFFFFF' }}>Bucket</ThemedText>
        <ThemedText style={{ color: '#8E8E93' }}>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </ThemedText>
      </ThemedView>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />

      <ThemedView style={[styles.footer, { backgroundColor: '#1C1C1E' }]}>
        <ThemedView style={styles.totalContainer}>
          <ThemedText style={{ color: '#8E8E93' }}>Total:</ThemedText>
          <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF' }}>${total.toFixed(2)}</ThemedText>
        </ThemedView>
        <TouchableOpacity
          style={[styles.checkoutButton, { backgroundColor: '#0A84FF' }]}
          onPress={() => Alert.alert('Checkout', 'Proceed to checkout?')}
        >
          <ThemedText style={[styles.checkoutText, { color: '#FFFFFF' }]}>Checkout</ThemedText>
        </TouchableOpacity>
      </ThemedView>
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
    borderBottomColor: '#2C2C2E',
  },
  itemCount: {
    marginTop: 4,
    opacity: 0.7,
  },
  list: {
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemInfo: {
    flex: 1,
    padding: 12,
  },
  itemName: {
    fontSize: 16,
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    padding: 8,
    borderRadius: 8,
  },
  quantity: {
    fontSize: 16,
    minWidth: 30,
    textAlign: 'center',
  },
  removeButton: {
    padding: 16,
    justifyContent: 'center',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
  },
  totalAmount: {
    fontSize: 24,
  },
  checkoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 