import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {View, Text} from 'react-native';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import ProductList from './screens/ProductList';
import ProductDetail from './screens/ProductDetail';
import ProductFavorites from './screens/ProductFavorites';
import AuthContext from './context/AuthProvider';
import ILoggedUser from './interfaces/ILoggedUser';

const LoggedDrawer = createDrawerNavigator();
const NotLoggedStack = createNativeStackNavigator();
const FavoriteStack = createNativeStackNavigator();
const ProductsStack = createNativeStackNavigator();

const CustomDrawerContent = props => {
  const {loggedUser, setLoggedUser} = props;
  return (
    <DrawerContentScrollView {...props}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', margin: 8}}>{loggedUser.name}</Text>
      <DrawerItemList {...props} />
      <DrawerItem label="Sair" onPress={() => setLoggedUser(null)} />
    </DrawerContentScrollView>
  );
};

const ProductsStackRoutes = () => {
  return (
    <ProductsStack.Navigator screenOptions={{headerShown: false}}>
      <LoggedDrawer.Screen name="Lista de produtos" component={ProductList} />
      <LoggedDrawer.Screen name="ProductDetail" component={ProductDetail} />
    </ProductsStack.Navigator>
  );
};

const FavoriteStackRoutes = () => {
  return (
    <FavoriteStack.Navigator screenOptions={{headerShown: false}}>
      <LoggedDrawer.Screen name="Favoritos" component={ProductFavorites} />
      <LoggedDrawer.Screen name="ProductDetail" component={ProductDetail} />
    </FavoriteStack.Navigator>
  );
};

const App = () => {
  const [loggedUser, setLoggedUser] = React.useState<ILoggedUser | null>(null);

  return (
    <AuthContext.Provider value={[loggedUser, setLoggedUser]}>
      <NavigationContainer>
        {loggedUser ? (
          <LoggedDrawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} loggedUser={loggedUser} setLoggedUser={setLoggedUser} />}>
            <LoggedDrawer.Screen
              name="Produtos"
              component={ProductsStackRoutes}
            />
            <LoggedDrawer.Screen
              name="Favoritos"
              component={FavoriteStackRoutes}
            />
          </LoggedDrawer.Navigator>
        ) : (
          <NotLoggedStack.Navigator>
            <NotLoggedStack.Screen
              name="Login"
              component={Login}
              options={{title: 'Welcome'}}
            />
            <NotLoggedStack.Screen name="SignUp" component={SignUp} />
          </NotLoggedStack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
