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

import {get} from '../utils/Request';

function ProductList({route, navigation}): JSX.Element {
  const [productList, onChangeProductList] = React.useState<[IProduct]>([]);
  const [currentPage, onChangeCurrentPage] = React.useState<number>(1);

  const {loggedUser} = route.params;

  const fetchData = async () => {
    const response = await get(
      `/storeProducts/?page=${currentPage}`,
      loggedUser,
    );
    console.log(response);
    onChangeProductList([...productList, ...response?.products]);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchMoreData = async () => {
    onChangeCurrentPage(currentPage+1);
  }

  const showDetail = (item) => {
    navigation.navigate('ProductDetail', {product: item, loggedUser});
  }

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
