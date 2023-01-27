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
import Geolocation from '@react-native-community/geolocation';
import IProduct from '../interfaces/IProduct';
import AuthContext from '../context/AuthProvider';
import GeoContext from '../context/GeoProvider';
import {get} from '../utils/Request';

function ProductList({route, navigation}): JSX.Element {
  const [productList, onChangeProductList] = React.useState<[IProduct]>([]);
  const [currentPage, onChangeCurrentPage] = React.useState<number>(1);
  const [loggedUser, setLoggedUser] = React.useContext(AuthContext);
  const [currentGeoLocation, setGeoLocation] = React.useContext(GeoContext);

  const fetchData = async () => {
    const response = await get(
      `/storeProducts/?page=${currentPage}`,
      loggedUser,
    );
    console.log(response);
    onChangeProductList([...productList, ...response?.products]);
  };

  const getCurrentPosition = () => {
    Geolocation.requestAuthorization( () => {
      Geolocation.getCurrentPosition(
        (pos) => {
          console.log('pegou localizacao')
          console.log(pos)
          setGeoLocation(pos);
        },
        (error) => {},
        { enableHighAccuracy: true }
      );
    });
  }

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    getCurrentPosition();
  }, []);

  const fetchMoreData = async () => {
    onChangeCurrentPage(currentPage+1);
  }

  const showDetail = (item) => {
    navigation.navigate('ProductDetail', {product: item, loggedUser});
  }

  const renderCard = ({item}) => {
    const favoriteText = item.favorite ? 'Favorito' : '';
    return (
      <Pressable onPress={() => showDetail(item)} style={styles.card}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>R$ {item.price}</Text>
        <Text>{favoriteText}</Text>
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
        onEndReachedThreshold={0}
        onEndReached={fetchMoreData}
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

export default ProductList;
