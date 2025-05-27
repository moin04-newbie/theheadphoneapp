import { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, Switch, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Delivered' | 'Processing' | 'Cancelled';
  items: number;
}

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [orders] = useState<Order[]>([
    {
      id: 'ORD001',
      date: '2024-03-15',
      total: 679.98,
      status: 'Delivered',
      items: 2,
    },
    {
      id: 'ORD002',
      date: '2024-03-10',
      total: 349.99,
      status: 'Processing',
      items: 1,
    },
  ]);

  const renderOrder = (order: Order) => (
    <ThemedView key={order.id} style={styles.orderCard}>
      <ThemedView style={styles.orderHeader}>
        <ThemedText type="defaultSemiBold">Order {order.id}</ThemedText>
        <ThemedText style={[
          styles.status,
          { color: order.status === 'Delivered' ? '#34C759' : order.status === 'Processing' ? '#007AFF' : '#FF3B30' }
        ]}>
          {order.status}
        </ThemedText>
      </ThemedView>
      <ThemedText style={styles.orderDate}>{order.date}</ThemedText>
      <ThemedView style={styles.orderDetails}>
        <ThemedText>{order.items} items</ThemedText>
        <ThemedText type="defaultSemiBold">${order.total.toFixed(2)}</ThemedText>
      </ThemedView>
    </ThemedView>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: '#000000' }]}>
      <ThemedView style={[styles.header, { backgroundColor: '#1C1C1E' }]}>
        <Image
          source={{ uri: 'https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg?semt=ais_hybrid' }}
          style={styles.profileImage}
        />
        <ThemedText type="title" style={[styles.name, { color: '#FFFFFF' }]}>John Doe</ThemedText>
        <ThemedText style={[styles.email, { color: '#FFFFFF' }]}>john.thehooker@gmail.com</ThemedText>
      </ThemedView>

      <ThemedView style={[styles.section, { backgroundColor: '#1C1C1E' }]}>
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Settings</ThemedText>
        
        <ThemedView style={[styles.settingItem, { borderBottomColor: '#2C2C2E' }]}>
          <ThemedView style={styles.settingInfo}>
            <IconSymbol name="bell.fill" size={24} color="#0A84FF" />
            <ThemedText style={[styles.settingLabel, { color: '#FFFFFF' }]}>Notifications</ThemedText>
          </ThemedView>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#2C2C2E', true: '#0A84FF' }}
            thumbColor={notifications ? '#FFFFFF' : '#8E8E93'}
          />
        </ThemedView>

        <ThemedView style={[styles.settingItem, { borderBottomColor: '#2C2C2E' }]}>
          <ThemedView style={styles.settingInfo}>
            <IconSymbol name="moon.fill" size={24} color="#0A84FF" />
            <ThemedText style={[styles.settingLabel, { color: '#FFFFFF' }]}>Dark Mode</ThemedText>
          </ThemedView>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#2C2C2E', true: '#0A84FF' }}
            thumbColor={darkMode ? '#FFFFFF' : '#8E8E93'}
          />
        </ThemedView>

        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: '#2C2C2E' }]}>
          <ThemedView style={styles.settingInfo}>
            <IconSymbol name="creditcard.fill" size={24} color="#0A84FF" />
            <ThemedText style={[styles.settingLabel, { color: '#FFFFFF' }]}>Payment Methods</ThemedText>
          </ThemedView>
          <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.settingItem, { borderBottomColor: '#2C2C2E' }]}>
          <ThemedView style={styles.settingInfo}>
            <IconSymbol name="location.fill" size={24} color="#0A84FF" />
            <ThemedText style={[styles.settingLabel, { color: '#FFFFFF' }]}>Shipping Addresses</ThemedText>
          </ThemedView>
          <IconSymbol name="chevron.right" size={20} color="#8E8E93" />
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={[styles.section, { backgroundColor: '#0000' }]}>
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: '#FFFFFF' }]}>Order History</ThemedText>
        {orders.map(renderOrder)}
      </ThemedView>

      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: '#2C2C2E' }]}
        onPress={() => Alert.alert('Logout', 'Are you sure you want to logout?')}
      >
        <IconSymbol name="arrow.right.square.fill" size={24} color="#FF453A" />
        <ThemedText style={[styles.logoutText, { color: '#FF453A' }]}>Logout</ThemedText>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
  orderCard: {
    backgroundColor: '#000000',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderDate: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    margin: 16,
    padding: 16,
    backgroundColor: '#FFE5E5',
    borderRadius: 12,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 