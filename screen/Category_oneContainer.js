import React, {useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList,StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";

const Category_oneContainer = ({navigation}) => {
  const products = [
    {
      id: "1232",
      name:"독서대",
      price: 1000,
      src:"https://cdn-std-web-146-149.cdn-nhncommerce.com/eastnine_godomall_com/data/goods/17/05/22/1000000136/1000000136_detail_055.jpg",
    },
    {
      id: "1233",
      name:"블라인드",
      price: 10000,
      src:"https://www.costco.co.kr/medias/sys_master/images/haa/h4a/79174940885022.webp",
    },
    {
      id: "1235",
      name: "멀티탭",
      price: 2000,
      src:"http://www.promademall.co.kr/shop/data/goods/1648095471371l0.jpg",
    },
    {
      id: "1237",
      name: "전자시계",
      price: 4000,
      src:"https://simage.mujikorea.net/goods/31/04/60/43/4547315831999_N_N_400.jpg",
    },
    {
      id: "1238",
      name: "슬리퍼",
      price: 1500,
      src: "https://munguland.com/web/product/big/munguland_4530.jpg",
    },
    {
      id: "1239",
      name: "타월",
      price: 1000,
      src: "https://eshop.lottehotel.com/uploads/product/e978f0351768bec80a9a3032cf664de6.jpg",
    },
    {
      id: "1240",
      name: "삼색볼펜",
      price: 500,
      src: "https://ssayoggook.com/web/product/big/202106/7cbb7e600454c1020ef0c2dae33107a2.jpg",
    },
    {
      id: "1241",
      name: "물티슈",
      price: 900,
      src: "http://www.thessan.com/shopimages/thessancom/0010080000662.jpg?1650596706",
    },
  ];

  const handleProductSelection = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);
    console.log(selectedProduct); // 해당 상품 정보를 콘솔에 출력
    navigation.navigate('category_detail', { productId });
  };

  const renderProductItem = ({ item }) => {
    return (
      <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleProductSelection(item.id)}
      >
        <Image source={{uri: item.src}} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} 원</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
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
/*
export default function Category_oneContainer({navigation}){
    return(
        <View>
            <Text>category_one screen</Text>
        </View>
    );
}
*/
/*
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Category_oneContainer = ({ route }) => {
  const { productId, category } = route.params;

  const getProductDetail = (productId) => {
    // productId와 category를 기반으로 상세 정보를 가져오는 로직을 구현
    // 예시로 간단하게 카테고리가 1인 경우에만 상세 정보를 보여주도록 함
    if (category === 1) {
      switch (productId) {
        case 1:
          return '상품 A의 상세 정보';
        case 2:
          return '상품 B의 상세 정보';
        case 3:
          return '상품 C의 상세 정보';
        default:
          return '상세 정보 없음';
      }
    } else {
      return '해당 카테고리의 상세 정보가 없습니다.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Detail</Text>
      <Text style={styles.category}>Category: {category}</Text>
      <Text style={styles.detail}>{getProductDetail(productId)}</Text>
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
});

export default Category_oneContainer;
*/