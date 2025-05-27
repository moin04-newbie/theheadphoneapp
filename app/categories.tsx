import { StyleSheet, View, Text } from 'react-native';
import { Stack } from 'expo-router';

export default function CategoriesScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Categories' }} />
      <Text style={styles.title}>Product Categories</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
}); 