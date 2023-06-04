import React from 'react';
import { View, Text ,Button, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from 'react-native';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Cate = [
    {
      id: "1",
      name:"스마트폰",
      src:"https://ifh.cc/g/QW45mB.png",
    },
    {
      id: "2",
      name: "악세서리",
      src:"https://ifh.cc/g/xisNGP.png",
    },
  ];

export default function CategoryContainer({navigation}){
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

 const renderCate = ({ item }) => {
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
        <View>
            <Text>카테고리</Text>
            <Button
            title="Category_one"
            onPress={() => navigation.navigate('category_navi', {screen: 'category_one'})} />
            <Button
            title="category_two"
            onPress={() => navigation.navigate('category_navi', {screen: 'category_two'})} />
        </View>
    );
}