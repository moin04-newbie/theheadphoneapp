import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  // Force light theme
  const colorScheme = 'light';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
          position: 'relative',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          color: '#000000',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="house.fill" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="headphones"
        options={{
          title: 'Headphones',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="headphones" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bucket"
        options={{
          title: 'Bucket',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="cart.fill" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="person.fill" 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="paperplane.fill" 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}
