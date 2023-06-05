import React, {useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList,StatusBar } from 'react-native';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

var month=new Date().getMonth();
var year=new Date().getFullYear();
var day=new Date().getDate();
let screenWidth=Dimensions.get('window').width;
let screenHeight=Dimensions.get('window').height;

const cartItems = [
    {
      id: "1234",
      name:"주전자",
      price: 1000,
      src:"https://shopping-phinf.pstatic.net/main_6229849/6229849107.12.jpg?type=f300",
    },
    {
      id: "1235",
      name: "멀티탭",
      price: 2000,
      src:"http://www.promademall.co.kr/shop/data/goods/1648095471371l0.jpg",
    },
    {
      id: "1236",
      name: "후라이팬",
      price: 3000,
      src:"https://simage.mujikorea.net/goods/31/13/93/19/4550182577082_N_N_400.jpg",
    },
    {
      id: "1237",
      name: "전자시계",
      price: 4000,
      src:"https://simage.mujikorea.net/goods/31/04/60/43/4547315831999_N_N_400.jpg",
    },
  ];

export default function CartContainer({navigation}){
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('cart')}>
          <Image
            style={{width: 20, height: 25, marginRight: 20}}
            source={require('../asset/alarm.png')}
          />
        </TouchableOpacity>
      ),
    });
  });
    
  const handleProductSelection = (productId) => {
    const selectedProduct = cartItems.find((product) => product.id === productId);
    console.log(selectedProduct); // 해당 상품 정보를 콘솔에 출력
    navigation.navigate('cart_info', { productId });
  };

  const renderCartItem = ({ item }) => {
    return (
     <TouchableOpacity
       style={styles.productContainer}
       onPress={() => handleProductSelection(item.id)}
     >
      <View style={styles.cartItem}>
        <Image source={{uri: item.src}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>₩{item.price}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>삭제</Text>
        </TouchableOpacity>
      </View>
     </TouchableOpacity>
    );
  };


    return(
        <View style={styles.container}>
            <View style={styles.list}>
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(name) => name.id}
                    contentContainerStyle={styles.cartList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 16,
  },
  cartList: {
    paddingBottom: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 12,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#777777',
  },
  deleteButton: {
    padding: 8,
    backgroundColor: '#FF0000',
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});