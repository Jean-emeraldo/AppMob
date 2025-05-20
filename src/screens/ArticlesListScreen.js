import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, Animated, Easing } from 'react-native';
import axios from 'axios';
import ArticleCard from '../components/ArticleCard';
import LoadingIndicator from '../components/LoadingIndicator';
import { FavoritesContext } from '../context/FavoritesContext'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

const ArticlesListScreen = ({ navigation }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites } = useContext(FavoritesContext);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(30))[0];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setArticles(response.data);

        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          }),
        ]).start();
      } catch (error) {
        console.error('Error fetching articles:', error);
        setError('Impossible de charger les articles. Vérifiez votre connexion.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return (
      <LinearGradient 
        colors={['#ff6b6b', '#ff8e8e']} 
        style={styles.errorContainer}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          <Icon name="exclamation-triangle" size={50} color="#fff" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchArticles()}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#f7f9fc', '#eef2f5']} style={styles.container}>
      <Animated.Text 
        style={[
          styles.headerTitle,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        Derniers Articles
      </Animated.Text>
      
      <Animated.FlatList
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                { 
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }) 
                }
              ],
            }}
          >
            <TouchableOpacity 
              onPress={() => navigation.navigate('ArticleDetail', { article: item })}
              activeOpacity={0.7}
            >
              <ArticleCard 
                article={item} 
                isFavorite={favorites.includes(item.id)}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f4f8',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#34495e',
    marginVertical: 20,
    marginLeft: 10,
    fontFamily: 'Poppins',
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
  },
  retryButtonText: {
    color: '#ff6b6b',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separator: {
    height: 15,
    backgroundColor: '#ecf0f1',
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default ArticlesListScreen;