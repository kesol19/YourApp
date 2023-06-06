import React, {useState, useEffect } from 'react';
import { View, Text ,Button,StyleSheet,TouchableOpacity,Image,TextInput,FlatList,PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Axios from 'axios'; //추가

const Products = [
    {
      id: "1234",
      name:"주전자",
      price: 1000,
      src:"https://shopping-phinf.pstatic.net/main_6229849/6229849107.12.jpg?type=f300",
      date: '2023. 05. 29',
    },
    {
      id: "1235",
      name: "멀티탭",
      price: 2000,
      src:"http://www.promademall.co.kr/shop/data/goods/1648095471371l0.jpg",
      date: '2023. 06. 01',
    },
    {
      id: "1236",
      name: "후라이팬",
      price: 3000,
      src:"https://simage.mujikorea.net/goods/31/13/93/19/4550182577082_N_N_400.jpg",
      date: '2023. 06. 04',
    },
    {
      id: "1237",
      name: "전자시계",
      price: 4000,
      src:"https://simage.mujikorea.net/goods/31/04/60/43/4547315831999_N_N_400.jpg",
      date: '2023. 06. 06',
    },
  ];

const Product_infoContainer = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { productId, category } = route.params;

  const [userData, setUserData] = useState([]);

  const userDocument = firestore().collection('users').doc(auth().currentUser.uid).get();

  useEffect(() => {
    userDocument.then(documentSnapshot => {
      setUserData(documentSnapshot.data());
    });
  }, [userData]);
/*
  useEffect(() => {
    // 외부 API에서 상품 상세 데이터를 가져오는 비동기 함수 호출
    fetchProductDetail();
  }, []);

  const fetchProductDetail = async () => {
    try {
      // 외부 API 호출 및 상품 상세 데이터 받아오기
      const response = await fetch(`http://54.180.134.13:8080/api/item/${productId}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginTop: 4,
  },
});
*/
  const getProductName = (productId) => {
    const product = Products.find((item) => item.id === productId);
    return product ? product.name : '상세 정보 없음';
  };

  const getProductPrice = (productId) => {
    const product = Products.find((item) => item.id === productId);
    return product ? product.price : '상세 정보 없음';
  };

  const getProductImg = (productId) => {
    const product = Products.find((item) => item.id === productId);
    return product ? product.src : '상세 정보 없음';
  };

  const getProductDate = (productId) => {
    const product = Products.find((item) => item.id === productId);
    return product ? product.date : '상세 정보 없음';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{getProductDate(productId)} 주문</Text>
      <View style={styles.orderInfo}>
        <Text style={styles.title}>주문자</Text>
        <Text style={styles.title}>{userData.name}</Text>
      </View>
      <Text style={styles.itemsTitle}>주문상품</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>{getProductName(productId)}</Text>
          <Text style={styles.itemPrice}>{getProductPrice(productId)} 원</Text>
        </View>
      <Text style={styles.itemsTitle}>결제 정보</Text>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>상품 가격</Text>
          <Text style={styles.itemPrice}>{getProductPrice(productId)} 원</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>할인금액</Text>
          <Text style={styles.itemPrice}>0 원</Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={styles.itemName}>배송비</Text>
          <Text style={styles.itemPrice}>0 원</Text>
        </View>
      <View style={styles.line} />
      <View style={styles.itemContainer}>
        <Text style={styles.itemsTitle}>총 결제금액</Text>
        <Text style={styles.itemsTitle}>{getProductPrice(productId)} 원</Text>
      </View>
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
  orderInfo: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderText: {
    fontSize: 16,
    marginBottom: 8,
  },
  itemsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    marginBottom: 20,
  },
});

export default Product_infoContainer;