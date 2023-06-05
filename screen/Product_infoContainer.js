import React, {useState, useEffect } from 'react';
import { View, Text ,Button,StyleSheet,TouchableOpacity,Image,TextInput,FlatList,PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
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
    <View style={pa_styles.container}>

       <View style={pa_styles.photo}>
         <Image source={{uri: getProductImg(productId)}} style={{width:"95%",height:"100%",borderRadius:100}}/>
       </View>
       <View style={pa_styles.info}>
        <View style={in_styles.button}>
          <View style={in_styles.block_l}>
            <Text style={in_styles.text_l}>{getProductName(productId)}</Text>
          </View>
        </View>
        <View style={in_styles.button}>
          <View style={in_styles.block_l}>
            <Text style={in_styles.text_l}>결제금액</Text>
            <Text style={in_styles.text_m}>{getProductPrice(productId)}원</Text>
          </View>
        </View>
        <View style={in_styles.button}>
          <View style={in_styles.block_l}>
            <Text style={in_styles.text_l}>주문일</Text>
            <Text style={in_styles.text_m}>{getProductDate(productId)}</Text>
          </View>
        </View>
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
  detail: {
    fontSize: 16,
  },
});

const pa_styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
    },
    photo:{
        width:"100%",
        height:"50%",
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
    info:{
        width:"100%",
        height:"70%",
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

const ph_styles =StyleSheet.create({
    photo:{
      top:25,
      width:"35%",
      height:"75%",
      backgroundColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode:'contain'
    },
    icon:{
        position: 'absolute',
        left: 220,
        top: 130,
    }
  });

  const in_styles=StyleSheet.create({
    button: {
      width:"100%",
      height:"13%",
      flexDirection: 'row',
      alignItems: "center",
      backgroundColor: "#ffffff",
      //padding: 15,
    },
    block_l:{
        flex:1,
        backgroundColor: '#ffffff',
    },
    block_m:{
        backgroundColor: '#ffffff',
    },
      block_r:{
        backgroundColor: '#ffffff',
    },
    text_l:{
        fontSize: 25,
        color: '#000000',
        alignItems: 'center',
        fontWeight: "bold",
    },
    text_m:{
        fontSize: 19,
        color: '#A6A6A6',
    },
      text_r:{
        fontSize: 20,
        color: '#A6A6A6',
        fontWeight: "bold",
    },
  });

  const m_style=StyleSheet.create({
    select:{
      backgroundColor:"#ffffff",
      height:"8%",
      borderRadius:10,
      justifyContent: "center",
      alignItems: "center",
    },
    none_n:{
      height:2,
      backgroundColor:"#e5e5e5",
    },
    none_f:{
      height:5,
      backgroundColor:"#e5e5e5",
    },
    text:{
      color:"#000000",
      fontSize: 18,
    },
    cancel:{
      color:"#FF1B1B",
      fontWeight:"bold",
      fontSize: 18,
    },
    flat:{
      backgroundColor:"#ffffff",
      height:50,
      borderRadius:10,
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth:2,
      borderColor:"#E5E5E5",
    },
    list: {
      height: '80%',
    }
  });

export default Product_infoContainer;