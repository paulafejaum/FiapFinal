/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Switch,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import IProductDetails from '../interfaces/IProductDetails';

import {get, post} from '../utils/Request';

function ProductDetail({route, navigation}): JSX.Element {
  const {product, loggedUser} = route.params;

  const [productDetail, onChangeProductDetail] =
    React.useState<IProductDetails | null>(null);
  const [isFavorite, setIsFavorite] = React.useState<boolean>(product.favorite);

  const fetchData = async () => {
    const response = await get(
      `/storeProducts/product/${product._id}`,
      loggedUser,
    );
    console.log(response);
    onChangeProductDetail(response.product);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const setFavorite = () => {
    setIsFavorite(previousState => !previousState);
    post('/storeProducts/manageFavorite', {productID: product._id}, loggedUser);
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.card}>
        <Text style={styles.title}>{productDetail?.name}</Text>
        <Text>R$ {productDetail?.price}</Text>
        <Switch onValueChange={setFavorite} value={isFavorite} />
      </View>
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

export default ProductDetail;
