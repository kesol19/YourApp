import React, {useState, useEffect } from 'react';
import { ScrollView, View, Text ,Button,StyleSheet,TouchableOpacity,Image,TextInput,FlatList,PermissionsAndroid } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from "react-native-modal";
import axios from 'axios'; //추가

  var month=new Date().getMonth()+1;
  var todayDate=new Date().getDate();
  const week=['일', '월', '화', '수', '목', '금', '토'];
  var dayOfWeek=week[new Date().getDay()+3];

const Category_detailContainer = ({ route }) => {
  const [product, setProduct] = useState(null);
  const { productId, category, productName, productPrice, productImage, productSpec } = route.params;

  return (
      <ScrollView  contentContainerStyle={pa_styles.container}
                        pagingEnabled={true}
                        vertical={true}
                        horizontal={false}>
         <View style={pa_styles.photo}>
           <Image source={{uri: productImage}} style={{width:"95%",height:"100%",borderRadius:100}}/>
         </View>
         <View style={pa_styles.info}>
          <View style={in_styles.button}>
            <View style={in_styles.block_l}>
              <Text style={in_styles.text_l}>{productName}</Text>

              <TouchableOpacity style={styles.plusButton}>
                <Text style={styles.plusButtonText}>장바구니 추가</Text>
              </TouchableOpacity>

            </View>
          </View>
          <View style={in_styles.button_p}>
            <View style={in_styles.block_l}>
              <Text style={in_styles.text_l}>{productPrice} 원</Text>
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
             <View style={pa_styles.photospec}>
                <Image source={{uri: productSpec}} style={{width:"95%",height:"100%",borderRadius:100}}/>
             </View>
         </View>
      </ScrollView>
    );
 };

 const styles = StyleSheet.create({
   container: {
     flexGrow: 1,
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
   plusButton: {
     padding: 8,
     backgroundColor: '#00BFFF',
     borderRadius: 8,
     marginLeft: 180,
   },
   plusButtonText: {
     color: '#FFFFFF',
     fontWeight: 'bold',
   },
 });

 const pa_styles=StyleSheet.create({
   container:{
     flexGrow: 1,
     backgroundColor: '#ffffff',
   },
   photo:{
     width:"100%",
     height:"50%",
     backgroundColor: '#ffffff',
     alignItems: 'center',
   },
   photospec:{
     width:"50%",
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
     flexGrow:1,
     backgroundColor: '#ffffff',
     flexDirection: 'row',
     alignItems: 'center',
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

export default Category_detailContainer;