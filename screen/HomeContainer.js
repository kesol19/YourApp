import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {color} from 'react-native-elements/dist/helpers';
import {useState} from 'react';
import ProgressCircle from 'react-native-progress-circle';
import Carousel from 'react-native-snap-carousel';

var month=new Date().getMonth();
var year=new Date().getFullYear();
var day=new Date().getDate();
let screenWidth=Dimensions.get('window').width;
let screenHeight=Dimensions.get('window').height;
const {width: SCREEN_WIDTH} = Dimensions.get('window');

export default function HomeContainer({navigation}) {
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

//캐로셀 추가 가능
  return (
     <View style={home_styles.container}>
       <ScrollView
         contentContainerStyle={home_styles.scrollView}
         pagingEnabled={true}
         vertical={true}>

         <ScrollView style={home_styles.product_box} horizontal={true}>
          <Text style={home_styles.header_one}>{year}년 {month+1}월 추천 상품</Text>
         </ScrollView>
         <ScrollView style={home_styles.product_box} horizontal={true}>
          <Text style={home_styles.header_one}>오늘의 이벤트</Text>
         </ScrollView>
         <ScrollView style={home_styles.product_box} horizontal={true}>
          <Text style={home_styles.header_one}>#주방용품</Text>
         </ScrollView>
       </ScrollView>
     </View>
  );
}
const home_styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH,
  },
  text: {
    fontSize: 50,
  },
  product_box: {
    width: 400,
    height: 200,
    backgroundColor: 'lightgray',
    marginBottom: 10,
  },
  header_one: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginTop: 10,
    textAlign: 'center',
    color: '#00BFFF',
  },
});
