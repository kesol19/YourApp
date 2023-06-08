import React, { useEffect, useState} from 'react';
import { Container, View, Text ,Button, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from 'react-native';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const CategoryContainer = ({ route, navigation }) => {
  const [categorys, setCategorys] = useState([]);

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

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
          const response = await axios.get('http://54.180.134.13:8082/category/all');
        setCategorys(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategorys();
  }, []);

  const handleCategorySelection = (category) => {
    navigation.navigate('category_navi', {screen: 'category_one', params: {category}});
  };

  const renderCategory = ({ item }) => {
    return (
      <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleCategorySelection(item.id)}
      >
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.line} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categorys}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    block:{
        flex:1,
        backgroundColor:'#FFFFFF',
        width: 400,
        height: 100,
        borderBottomWidth:1,
        borderColor:"#A6A6A6",
    },
    block_r:{
        backgroundColor:"#FFFFFF",
    },
    block_l:{
        flex:1,
        backgroundColor:"#FFFFFF",
    },
  itemContainer: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 6,
    marginBottom: 6,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: '100%',
    marginBottom: 20,
  },
});
export default CategoryContainer;