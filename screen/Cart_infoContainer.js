import React, {useState, useEffect } from 'react';
import { ScrollView, View, Text ,Button,StyleSheet,TouchableOpacity,Image,TextInput,FlatList,PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from "react-native-modal";
import Axios from 'axios'; //추가

const Products = [
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

  var month=new Date().getMonth()+1;
  var todayDate=new Date().getDate();
  const week=['일', '월', '화', '수', '목', '금', '토'];
  let dayOfWeek=week[new Date().getDay()+3];

const Cart_infoContainer = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { productId, category } = route.params;

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

  return (
      <ScrollView contentContainerStyle={pa_styles.container}
      pagingEnabled={true}
      vertical={true}>

         <View style={pa_styles.photo}>
           <Image source={{uri: getProductImg(productId)}} style={{width:"95%",height:"100%",borderRadius:100}}/>
         </View>
         <View style={pa_styles.info}>
          <View style={in_styles.button}>
            <View style={in_styles.block_l}>
              <Text style={in_styles.text_l}>{getProductName(productId)}</Text>
            </View>
          </View>
          <View style={in_styles.button_p}>
            <View style={in_styles.block_l}>
              <Text style={in_styles.text_l}>{getProductPrice(productId)} 원</Text>
            </View>
          </View>
          <View style={in_styles.button_p}>
             <View style={in_styles.block_l}>
               <Text style={in_styles.text_g}>{dayOfWeek}요일 {month}/{todayDate+3} 전 도착 예정</Text>
             </View>
          </View>
          <View style={in_styles.button_p}>
             <View style={in_styles.block_l}>
               <Text style={in_styles.text_g}>당일출고 (평일 오후 2시 전 주문 시)</Text>
             </View>
          </View>
          <View style={in_styles.button_p}>
             <View style={in_styles.block_l}>
               <Text style={in_styles.text_g}>무료배송</Text>
             </View>
          </View>
         </View>
      </ScrollView>
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

 const in_styles=StyleSheet.create({
   button: {
     width:"100%",
     height:"15%",
     flexDirection: 'row',
     alignItems: "center",
     backgroundColor: "#ffffff",
     marginLeft: 40,
     marginTop: 10,
   },
   button_p: {
     width:"100%",
     height:"8%",
     flexDirection: 'row',
     alignItems: "center",
     backgroundColor: "#ffffff",
     marginLeft: 40,
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
   text_g:{
     fontSize: 20,
     color: '#000000',
     alignItems: 'center',
   },
 });

export default Cart_infoContainer;