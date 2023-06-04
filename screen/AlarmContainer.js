import React, {useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image, Dimensions, FlatList,StatusBar } from 'react-native';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

var month=new Date().getMonth();
var year=new Date().getFullYear();
var day=new Date().getDate();
let screenWidth=Dimensions.get('window').width;
let screenHeight=Dimensions.get('window').height;

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

export default function AlarmContainer({navigation}){
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