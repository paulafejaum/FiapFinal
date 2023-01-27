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
import GeoContext from '../context/GeoProvider';
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
  const [currentGeoLocation, setGeoLocation] = React.useContext(GeoContext);

  const fetchData = async () => {
    const response = await get(
      `/storeProducts/product/${product._id}`,
      loggedUser,
    );
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

  const getMarkers = () => {
    const storeMap = productDetail?.stores?.map((store, index) => {
      return (
        <Marker
          key={index}
          coordinate={{
            latitude: store.latitude,
            longitude: store.longitude,
          }}
          title={store.name}
          description={store.address}
        />
      );
    });

    console.log('mapa');
    console.log(currentGeoLocation);
    console.log(storeMap?.length);

    if (currentGeoLocation) {
      storeMap?.push(
        <Marker
          key={storeMap?.length}
          coordinate={{
            latitude: currentGeoLocation?.coords?.latitude,
            longitude: currentGeoLocation?.coords?.longitude,
          }}
          title={'Você está aqui'}
          description={''}
        />,
      );
    }
    console.log(storeMap?.length);
    console.log(storeMap);
    return storeMap;
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
          {getMarkers()}
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
