import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import ProductList from './screens/ProductList';
import ProductDetail from './screens/ProductDetail';
import ProductFavorites from './screens/ProductFavorites';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ProductList" component={ProductList} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
        <Stack.Screen name="ProductFavorites" component={ProductFavorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;