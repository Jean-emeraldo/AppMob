import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CommentItem = ({ comment }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{comment.name}</Text>
      <Text style={styles.email}>{comment.email}</Text>
      <Text style={styles.body}>{comment.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
  },
  email: {
    fontSize: 12,
    color: '#2980b9',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});

export default CommentItem;