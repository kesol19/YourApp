import React, {useState, useEffect } from 'react';
import { StyleSheet,View, Text ,Button,FlatList,StatusBar, TouchableOpacity,Image} from 'react-native';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Product_info from './Product_infoContainer';
//카테고리1 생활용품, 카테고리2 주방용품


const orderItems = [
    {
      id: "1234",
      name:"주전자",
      price: 1000,
      src: "https://shopping-phinf.pstatic.net/main_6229849/6229849107.12.jpg?type=f300",
      date: '2023. 05. 29',
    },
    {
      id: "1235",
      name: "멀티탭",
      price: 2000,
      src: "http://www.promademall.co.kr/shop/data/goods/1648095471371l0.jpg",
      date: '2023. 06. 01',
    },
    {
      id: "1236",
      name: "후라이팬",
      price: 3000,
      src: "https://simage.mujikorea.net/goods/31/13/93/19/4550182577082_N_N_400.jpg",
      date: '2023. 06. 04',
    },
    {
      id: "1237",
      name: "전자시계",
      price: 4000,
      src: "https://simage.mujikorea.net/goods/31/04/60/43/4547315831999_N_N_400.jpg",
      date: '2023. 06. 06',
    },
  ];
/*
const Product_listContainer = ({ navigation }) => {
  const handleProductSelection = (productId) => {
    const selectedProduct = Products.find((product) => product.id === productId);
    console.log(selectedProduct); // 해당 상품 정보를 콘솔에 출력
    navigation.navigate('product_info', { productId });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => handleProductSelection(item.id)}
    >
     <View style={styles.productPhoto}>
      <Image source={{uri:item.src}} style={{height:'100%',width:'100%',resizeMode:'contain'}}/>
     </View>
     <View style={styles.productInfo}>
      <Text style={styles.productName}>{item.name}</Text>
     </View>
     <View style={styles.productInfo}>
      <Text style={styles.productPrice}>{item.price}원</Text>
     </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={Products}
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
  productContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor:'#FFFFFF',
    padding:10,
    borderBottomWidth:1,
    borderColor:"#A6A6A6",
  },
  productPhoto: {
    width:"20%",
    height:"100%",
    backgroundColor:"#FFFFFF",
  },
  productInfo: {
    flex:1,
    backgroundColor:"#FFFFFF",
  },
  productName: {
    fontSize:22,
    padding:20,
    fontWeight:'bold',
  },
  productPrice: {
    fontSize:22,
    padding:23,
    fontWeight:'bold',
    marginTop: 10,
  },
});
*/


export default function Product_listContainer({navigation}){

  const handleProductSelection = (productId) => {
    const selectedProduct = orderItems.find((product) => product.id === productId);
    console.log(selectedProduct); // 해당 상품 정보를 콘솔에 출력
    navigation.navigate('product_info', { productId });
  };

  // 주문내역 아이템 렌더링 함수
  const renderOrderItem = ({ item }) => {
    return (
     <TouchableOpacity
       style={styles.productContainer}
       onPress={() => handleProductSelection(item.id)}
     >
      <View style={styles.orderItem}>
        <Image source={{uri: item.src}} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>₩{item.price}</Text>
        </View>
        <View style={styles.productDetails}>
          <Text style={styles.orderDate}>{item.date}</Text>
          <Text style={styles.orderDate}>배송완료</Text>
          <Text style={styles.orderDetail}>> 주문상세</Text>
        </View>
      </View>
     </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orderItems}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
    padding: 16,
  },
  orderList: {
    paddingBottom: 16,
  },
  orderItem: {
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
  orderDate: {
    fontSize: 12,
    color: '#777777',
  },
  orderDetail: {
    fontSize: 12,
    color: '#00BFFF',
    marginTop: 15,
  },
});

/*
const Product_listContainer = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://54.180.134.13:8080/api/item', {
           headers: {
               //'Content-Type': 'application/json',
               itemId: '1234',
           },
        });
        setProducts(response.data);

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelection = (productId, category) => {
    // 상세 페이지로 이동하면서 선택한 상품의 아이디를 전달
    navigation.navigate('product_info', { productId, category });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => handleProductSelection(item.id, item.category)}
    >
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
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
  productContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#f2f2f2',
    borderRadius: 4,
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

export default Product_listContainer;
*/