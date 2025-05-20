import React, { useState, useEffect, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator,
  TouchableOpacity,
  Animated,
  Easing
} from 'react-native';
import axios from 'axios';
import CommentItem from '../components/CommentItem';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FavoritesContext } from '../context/FavoritesContext';
import { LinearGradient } from 'expo-linear-gradient';

const ArticleDetailScreen = ({ route }) => {
  const { article } = route.params;
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentsError, setCommentsError] = useState(null);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.includes(article.id);
  
  // Animations
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideUpAnim = useState(new Animated.Value(20))[0];
  const scaleValue = useState(new Animated.Value(1))[0];

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        setCommentsError(null);
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts/${article.id}/comments`
        );
        setComments(response.data);
        
        // Lance les animations après le chargement
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(slideUpAnim, {
            toValue: 0,
            duration: 800,
            easing: Easing.out(Easing.exp),
            useNativeDriver: true,
          })
        ]).start();
      } catch (error) {
        console.error('Error fetching comments:', error);
        setCommentsError('Impossible de charger les commentaires');
      } finally {
        setLoadingComments(false);
      }
    };

    fetchComments();
  }, [article.id]);

  const handleFavoritePress = () => {
    // Animation du bouton favori
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
    
    toggleFavorite(article.id);
  };

  return (
    <LinearGradient colors={['#f7f9fc', '#eef2f5']} style={styles.container}>
      <Animated.View 
        style={[
          styles.articleContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{article.title}</Text>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity 
              onPress={handleFavoritePress}
              activeOpacity={0.7}
            >
              <Icon 
                name={isFavorite ? "star" : "star-o"} 
                size={28} 
                color={isFavorite ? "#FFD700" : "#aaa"} 
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Text style={styles.body}>{article.body}</Text>
      </Animated.View>

      <Animated.Text 
        style={[
          styles.commentsHeader,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideUpAnim }]
          }
        ]}
      >
        Commentaires ({comments.length})
      </Animated.Text>

      {loadingComments ? (
        <ActivityIndicator size="small" color="#3498db" />
      ) : commentsError ? (
        <Animated.View 
          style={[
            styles.errorContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideUpAnim }]
            }
          ]}
        >
          <Icon name="exclamation-circle" size={24} color="#e74c3c" />
          <Text style={styles.errorText}>{commentsError}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchComments()}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  { 
                    translateY: slideUpAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 1],
                    }) 
                  }
                ],
              }}
            >
              <CommentItem comment={item} />
            </Animated.View>
          )}
          contentContainerStyle={styles.commentsList}
          ListEmptyComponent={
            <Animated.Text 
              style={[
                styles.noComments,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideUpAnim }]
                }
              ]}
            >
              Aucun commentaire pour cet article
            </Animated.Text>
          }
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  articleContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#34495e',
    flex: 1,
    marginRight: 15,
    lineHeight: 30,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#7f8c8d',
    marginTop: 10,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#34495e',
    paddingLeft: 5,
  },
  commentsList: {
    paddingBottom: 30,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffecec',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    marginLeft: 10,
    flex: 1,
    fontWeight: '600',
  },
  noComments: {
    textAlign: 'center',
    color: '#95a5a6',
    fontStyle: 'italic',
    marginTop: 20,
    fontSize: 16,
  },
  separator: {
    height: 12,
  },
  retryButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default ArticleDetailScreen;