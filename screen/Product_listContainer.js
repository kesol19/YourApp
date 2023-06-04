import React, {useState, useEffect } from 'react';
import { StyleSheet,View, Text ,Button,FlatList,StatusBar, TouchableOpacity,Image} from 'react-native';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Product_info from './Product_infoContainer';
//id=1은 카테고리1인 스마트폰, id=2은 카테고리2인 악세서리
/*
const Product = [
    {
      id: "1",
      name:"갤럭시 S23",
      src:"https://ifh.cc/g/QW45mB.png",
    },
    {
      id: "2",
      name: "스마일 그립톡",
      src:"https://ifh.cc/g/xisNGP.png",
    },
    {
      id: "1",
      name: "갤럭시 S23울트라",
      src:"https://ifh.cc/g/xisNGP.png",
    },
    {
      id: "2",
      name: "투명 카드케이스",
      src:"https://ifh.cc/g/xisNGP.png",
    },
  ];



export default function Product_listContainer({navigation}){
const renderProduct = ({ item }) => {
    return(
        <TouchableOpacity activeOpacity={0.8} style={styles.block} 
            onPress={() => navigation.navigate('product_info')}>
            <View style={styles.block_l}>
                <Image source={{uri:item.src}} style={{height:'100%',width:'100%',resizeMode:'contain'}}/>
            </View>
            <View style={styles.block_r}>
                <Text style={{fontSize:22, padding:23, fontWeight:'bold'}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    );
}

    return(
        <View style={styles.container}>
            <View style={styles.list}>
                <FlatList
                    data={Product}
                    renderItem={renderProduct}
                    keyExtractor={(name) => name.id}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    list:{
        width:"100%",
        height:"40%",
        backgroundColor: '#ffffff',
        paddingHorizontal:30,
        padding:10,
    },
    block:{
        flex:1,
        flexDirection: 'row',
        alignItems: "center",
        backgroundColor:'#FFFFFF',
        padding:10,
        borderBottomWidth:1,
        borderColor:"#A6A6A6",
    },
    block_l:{
        width:"20%",
        height:"100%",
        backgroundColor:"#FFFFFF",
    },
    block_r:{
        flex:1,
        backgroundColor:"#FFFFFF",
    },
});
*/

const Product_listContainer = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://54.180.134.13:8080/api/item');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelection = (productId) => {
    // 상세 페이지로 이동하면서 선택한 상품의 아이디를 전달
    navigation.navigate('product_info', { productId });
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => handleProductSelection(item.id)}
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