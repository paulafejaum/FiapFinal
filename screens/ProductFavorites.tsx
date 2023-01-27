/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import IProduct from '../interfaces/IProduct';
import AuthContext from '../context/AuthProvider';
import {get} from '../utils/Request';

function ProductFavorites({route, navigation}): JSX.Element {
  const [productList, onChangeProductList] = React.useState<[IProduct]>([]);
  const [loggedUser, setLoggedUser] = React.useContext(AuthContext);

  const fetchData = async () => {
    const response = await get('storeProducts/getFavProducts', loggedUser);
    console.log(response);
    onChangeProductList(response?.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showDetail = item => {
    navigation.navigate('ProductDetail', {product: item, isFromFavorite: true});
  };

  const renderCard = ({item}) => {
    return (
      <Pressable onPress={() => showDetail(item)} style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>R$ {item.price}</Text>
        {item.favorite ?? <Text>Favorito</Text>}
      </Pressable>
    );
  };

  const keyExtractor = item => item?._id;

  return (
    <SafeAreaView>
      <StatusBar />
      <FlatList
        data={productList}
        renderItem={renderCard}
        keyExtractor={keyExtractor}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  card: {
    height: 120,
    margin: 5,
    borderWidth: 2,
    padding: 10,
  },
});

export default ProductFavorites;
