import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesContext } from '../../App';

const ArticleCard = ({ article, isFavorite }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>{article.title}</Text>
        <Icon 
          name={isFavorite ? "star" : "star-o"} 
          size={16} 
          color={isFavorite ? "#f1c40f" : "#ccc"} 
        />
      </View>
      <Text style={styles.body} numberOfLines={2}>{article.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495e',
    flex: 1,
  },
  body: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 5,
  },
});

export default ArticleCard;