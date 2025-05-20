import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#3498db" />
      <Text style={styles.text}>Chargement en cours...</Text>
      <Icon name="spinner" size={20} color="#3498db" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
  text: {
    marginTop: 10,
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginTop: 10,
  },
});

export default LoadingIndicator;