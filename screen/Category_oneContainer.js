import React, {useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList,StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import axios from 'axios';

const Category_oneContainer = ({ route, navigation }) => {
  const [products, setProducts] = useState([]);
  const { category } = route.params;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
          const response = await axios.get('http://54.180.134.13:8082/item/all');
        setProducts(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  console.log(category);

  const handleProductSelection = (productId, category, productName, productPrice, productImage, productSpec) => {
    // 상품 상세 정보 화면으로 이동하면서 데이터 전달
    navigation.navigate('category_detail', { productId, category, productName, productPrice, productImage, productSpec });
  };

  const renderProduct = ({ item }) => {
   if(item.category === category) {
    return (
      <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleProductSelection(item.id, item.category, item.name, item.price, item.image, item.spec)}
      >
        <Image source={{uri: item.image}} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} 원</Text>
      </TouchableOpacity>
    );
   }

   return null;

  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  category: {
    fontSize: 18,
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },
  itemPrice: {
    fontSize: 14,
    marginTop: 8,
  },
  itemImage: {
    width: 130,
    height: 130,
    borderRadius: 8,
  },
});

export default Category_oneContainer;