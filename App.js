import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticlesListScreen from './src/screens/ArticlesListScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import { FavoritesContext } from './src/context/FavoritesContext';
import "./styles.css"

const Stack = createStackNavigator();

const App = () => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (articleId) => {
    setFavorites(current =>
      current.includes(articleId)
        ? current.filter(id => id !== articleId)
        : [...current, articleId]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Articles">
          <Stack.Screen name="Articles" component={ArticlesListScreen} />
          <Stack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesContext.Provider>
  );
};

export default App;