import React, {useState, useEffect } from 'react';
import { View, Text ,Button,StyleSheet,TouchableOpacity,Image,TextInput,FlatList,PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from "react-native-modal";
import Axios from 'axios'; //추가

/*
const renderGoods = ({ item }) => {
  return (
    <View>
      <View>
        <Text>id: {item.id}</Text>
      </View>
      <View>
        <Text>name: {item.name}</Text>
      </View>
      <View>
        <Text>price: {item.price}</Text>
      </View>
      <View>
        <Text>image: {item.image}</Text>
      </View>
    </View>
  );
};

export default function Product_infoContainer(){

    //추가
    const [Good, setGoods] = useState([]);


    //추가

    const getGoods = () => {
     Axios.get('http://54.180.134.13:8080/item')
      .then(res => {
        setGoods(res.data);
      })
      .catch(error => console.log(error));
    };

    useEffect(() => {
        getGoods();
    }, []);



    return(
        <View style={pa_styles.container}>
            
            <View style={pa_styles.photo}>
              <Image source={{uri: avatar}} style={{width:"95%",height:"100%",borderRadius:100}}/>
            </View>
            <View style={pa_styles.info}>
                <View style={in_styles.button}>
                    <View style={in_styles.block_l}>
                        <Text style={in_styles.text_l}>     이름</Text>
                    </View>
                    <View style={in_styles.block_m}>
                        <TextInput style={in_styles.text_m}
                            onChangeText={onChangeInput_name}
                            value={name}
                            placeholder="입력"/>
                    </View>
                    <View style={in_styles.block_r}>
                        <Text style={in_styles.text_r}>{'  >      '}</Text>
                    </View>
                </View>
                <View style={in_styles.button}>
                    <View style={in_styles.block_l}>
                        <Text style={in_styles.text_l}>     생년월일</Text>
                    </View>
                    <View style={in_styles.block_m}>
                        <TextInput style={in_styles.text_m}
                            onChangeText={onChangeInput_birth}
                            value={birth}
                            keyboardType="number-pad"
                            placeholder="입력"/>
                    </View>
                    <View style={in_styles.block_r}>
                        <Text style={in_styles.text_r}>{'  >      '}</Text>
                    </View>
                </View>
                <View style={in_styles.button}>
                    <View style={in_styles.block_l}>
                        <Text style={in_styles.text_l}>     품종</Text>
                    </View>
                    <TouchableOpacity style={in_styles.block_m}>
                        <Modal_code 
                          code={code}
                          onChangeInput_code={onChangeInput_code}/>
                    </TouchableOpacity>
                    <View style={in_styles.block_r}>
                        <Text style={in_styles.text_r}>{'  >      '}</Text>
                    </View>
                </View>
                <View style={in_styles.button}>
                    <View style={in_styles.block_l}>
                        <Text style={in_styles.text_l}>     성별</Text>
                    </View>
                    <TouchableOpacity style={in_styles.block_m}>
                        <Modal_zender 
                          zender={zender}
                          onChangeInput_zender={onChangeInput_zender}/>
                    </TouchableOpacity>
                    <View style={in_styles.block_r}>
                        <Text style={in_styles.text_r}>{'  >      '}</Text>
                    </View>
                </View>
                <View style={in_styles.button}>
                    <View style={in_styles.block_l}>
                        <Text style={in_styles.text_l}>     사이즈</Text>
                    </View>
                    <TouchableOpacity style={in_styles.block_m}>
                        <Modal_size 
                          size={size}
                          onChangeInput_size={onChangeInput_size}/>
                    </TouchableOpacity>
                    <View style={in_styles.block_r}>
                        <Text style={in_styles.text_r}>{'  >      '}</Text>
                    </View>
                </View>
                <View style={in_styles.button}>
                    <View style={in_styles.block_l}>
                        <Text style={in_styles.text_l}>     무게</Text>
                    </View>
                    <View style={in_styles.block_m}>
                        <TextInput style={in_styles.text_m}
                            onChangeText={onChangeInput_weight}
                            value={weight}
                            keyboardType="number-pad"
                            placeholder=""/>
                    </View>
                    <View style={in_styles.block_m}>
                        <Text style={in_styles.text_m}>kg</Text>
                    </View>
                    <View style={in_styles.block_r}>
                        <Text style={in_styles.text_r}>{'  >      '}</Text>
                    </View>
                </View>
                <View style={in_styles.button}>
                    <View style={in_styles.block_l}>
                        <Text style={in_styles.text_l}>     활동수준</Text>
                    </View>
                    <TouchableOpacity style={in_styles.block_m}>
                        <Modal_active 
                          active={active}
                          onChangeInput_active={onChangeInput_active}/>
                    </TouchableOpacity>
                    <View style={in_styles.block_r}>
                        <Text style={in_styles.text_r}>{'  >      '}</Text>
                    </View>
                </View>
            </View>

            <FlatList
              style={m_style.list}
              contentContainerStyle={{paddingBottom: 50}}
              data={item}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
        </View>
    );
}


const pa_styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
    },
    photo:{
        width:"100%",
        height:"30%",
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
        fontSize: 20,
        color: '#000000',
        alignItems: 'center',
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
  })
  */

const Product_infoContainer = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { productId } = route.params;

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

  export default Product_infoContainer;