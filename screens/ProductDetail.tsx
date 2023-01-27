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
  Button,
} from 'react-native';
import IProductDetails from '../interfaces/IProductDetails';
import AuthContext from '../context/AuthProvider';
import MapView, {Marker} from 'react-native-maps';

import {get, post} from '../utils/Request';
import IProductStore from '../interfaces/IProductStore';

function ProductDetail({route, navigation}): JSX.Element {
  const {product, isFromFavorite} = route.params;

  const [productDetail, onChangeProductDetail] =
    React.useState<IProductDetails | null>(null);
  const [isFavorite, setIsFavorite] = React.useState<boolean>(
    product.favorite || isFromFavorite,
  );
  const [loggedUser, setLoggedUser] = React.useContext(AuthContext);

  const fetchData = async () => {
    const response = await get(
      `/storeProducts/product/${product._id}`,
      loggedUser,
    );
    console.log(response);
    console.log(response.product.stores);
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
        <View style={{flexDirection: 'row'}}>
          <Text>{'Favorito'}</Text>
          <Switch onValueChange={setFavorite} value={isFavorite} />
        </View>
      </View>
      <View style={{width: '100%', height: 300, margin: 10}}>
        <MapView
          style={{width: '100%', height: '100%'}}
          initialRegion={{
            latitude: -23.6271593,
            longitude: -46.59813,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {product.stores?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.name}
              description={marker.address}
            />
          ))}
        </MapView>
      </View>
      <Button onPress={() => navigation.goBack()} title="Voltar" />
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
