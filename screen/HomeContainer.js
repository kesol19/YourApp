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
          onPress={() => navigation.navigate('alarm')}>
          <Image
            style={{width: 20, height: 25, marginRight: 20}}
            source={require('../asset/alarm.png')}
          />
        </TouchableOpacity>
      ),
    });
  });


  return (
     <View style={home_styles.container}>
       <ScrollView
         contentContainerStyle={home_styles.scrollView}
         horizontal={true}
         pagingEnabled={true}>

         <View style={home_styles.product_box}>
          <Text style={home_styles.header_one}>{year}년 {month}월 추천 상품</Text>
         </View>
         <View style={home_styles.product_box}>

         </View>
         <View style={home_styles.product_box}>

         </View>
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
  /*
  product_box: {
    borderRadius: 40,
    width: '80%',
    height: '90%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },*/
  product_box: {
    width: 200,
    height: 200,
    backgroundColor: 'lightblue',
    marginBottom: 10,
  },
  header_one: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 5,
    marginTop: 10,
    textAlign: 'center',
    color: 'black',
  },
});
