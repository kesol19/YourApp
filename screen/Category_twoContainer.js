import React, {useState, useEffect } from 'react';
import { ScrollView, View, Text, Button, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList,StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import axios from 'axios';

const Category_twoContainer = ({ route }) => {
  const [products, setProducts] = useState([]);
  //const { productId, category, productName, productPrice, productImage, productSpec } = route.params;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        //const response = await axios.get('http://54.180.134.13:8080/item/1234');
          const response = await axios.get('http://54.180.134.13:8082/item/all', {
      });
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);


  const handleProductSelection = (productId, category, productName, productPrice, productImage, productSpec) => {
    // 상품 상세 정보 화면으로 이동하면서 데이터 전달
    navigation.navigate('category_detail', { productId, category, productName, productPrice, productImage, productSpec });

  };

  const renderProduct = ({ item }) => (
   //if (category === 2) {
       <TouchableOpacity
         style={styles.productContainer}
         onPress={() => handleProductSelection(item.id, item.category, item.name, item.price, item.image, item.spec)}
       >
         <Text style={styles.productName}>{item.name}</Text>
         <Text style={styles.productPrice}>{item.price}</Text>
       </TouchableOpacity>
   //}
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
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
});

export default Category_twoContainer;

/*
const Category_twoContainer = ({navigation}) => {
  const products = [
    {
      id: "1234",
      name:"주전자",
      price: 1000,
      src:"https://shopping-phinf.pstatic.net/main_6229849/6229849107.12.jpg?type=f300",
    },
    {
      id: "1236",
      name: "후라이팬",
      price: 3000,
      src:"https://simage.mujikorea.net/goods/31/13/93/19/4550182577082_N_N_400.jpg",
    },
    {
      id: "1242",
      name: "국자",
      price: 1000,
      src:"https://simage.mujikorea.net/goods/31/14/31/43/4550344594933_N_N_400.jpg",
    },
    {
      id: "1243",
      name: "가위",
      price: 5000,
      src:"https://simage.mujikorea.net/goods/31/13/18/47/4547315822225_N_N_400.jpg",
    },
    {
      id: "1244",
      name: "앞치마",
      price: 2000,
      src:"https://simage.mujikorea.net/goods/31/08/75/52/4549738968863_N_N_400.jpg",
    },
    {
      id: "1245",
      name: "계량컵",
      price: 4000,
      src:"https://simage.mujikorea.net/goods/31/10/37/34/4547315129706_N_N_400.jpg",
    },
    {
      id: "1246",
      name: "양수냄비 3L",
      price: 30000,
      src:"https://simage.mujikorea.net/goods/31/14/01/49/4550182219944_N_N_400.jpg",
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

export default Category_twoContainer;
*/

/*
export default function Category_twoContainer(){
    return(
        <View>
            <Text>category_two screen</Text>
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