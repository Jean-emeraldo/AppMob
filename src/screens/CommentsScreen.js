import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import CommentItem from '../components/CommentItem';
import LoadingIndicator from '../components/LoadingIndicator';

const CommentsScreen = ({ route }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { postId } = route.params;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <CommentItem comment={item} />}
        ListHeaderComponent={() => (
          <Text style={styles.header}>{comments.length} commentaires</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f4f8',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2c3e50',
    textAlign: 'center',
  },
});

export default CommentsScreen;