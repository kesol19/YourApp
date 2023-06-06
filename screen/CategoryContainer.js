import React from 'react';
import { Container, View, Text ,Button, TouchableOpacity, Image, StyleSheet, FlatList, StatusBar } from 'react-native';
import {List,ListItem,SearchBar} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Cate = [
    {
      id: "1",
      name:"생활용품",
      src:"https://ifh.cc/g/QW45mB.png",
    },
    {
      id: "2",
      name: "주방용품",
      src:"https://ifh.cc/g/xisNGP.png",
    },
  ];

export default function CategoryContainer({navigation}){
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

    return(
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} style={styles.block}
            onPress={() => navigation.navigate('category_navi', {screen: 'category_one'})}>

                <Text style={{fontSize:22, padding:23, fontWeight:'bold'}}>생활용품</Text>

            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.block}
            onPress={() => navigation.navigate('category_navi', {screen: 'category_two'})}>

                <Text style={{fontSize:22, padding:23, fontWeight:'bold'}}>주방용품</Text>

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexGrow: 0.25,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    block:{
        flex:1,
        //flexDirection: 'row',
        //alignItems: "center",
        backgroundColor:'#FFFFFF',
        //justifyContent: 'center',
        //padding:10,
        width: 400,
        height: 100,
        borderBottomWidth:1,
        borderColor:"#A6A6A6",
    },
    block_r:{
        //width:"100%",
        //height:"100%",
        backgroundColor:"#FFFFFF",
    },
    block_l:{
        flex:1,
        backgroundColor:"#FFFFFF",
    },
});

/*
const CategoryContainer = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://54.180.134.13:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSelection = (productId, category) => {
    // 상품 상세 정보 화면으로 이동하면서 데이터 전달
    if (category === 1) {
      navigation.navigate('Category_one', { productId, category });
    } else if (category === 2) {
      navigation.navigate('Category_two', { productId, category });
    }
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

export default CategoryContainer;
*/