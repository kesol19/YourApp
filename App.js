import React from 'react';
import { View, Text,Button,Image, TouchableOpacity} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Loading from './screen/LoadingContainer';
import LogJoin from './screen/LogJoinContainer'
import Login from './screen/LoginContainer';
import Join from './screen/JoinContainer';
import Home from './screen/HomeContainer';
import Category from './screen/CategoryContainer';
import Profile from './screen/ProfileContainer';
import Cart from './screen/CartContainer';
import Cart_info from './screen/Cart_infoContainer';
import Category_one from './screen/Category_oneContainer';
import Category_two from './screen/Category_twoContainer';
import Category_detail from './screen/Category_detailContainer';
import Account from './screen/AccountContainer';
import Product_list from './screen/Product_listContainer';
import Product_info from './screen/Product_infoContainer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

var month=new Date().getMonth();
var year=new Date().getFullYear();
const reportTitle="상품 상세";

function LogJoin_navi(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="logjoin" component={LogJoin} options={{headerShown:false}}/>
      <Stack.Screen name="login" component={Login} options={{ title: ' ',}}/>
      <Stack.Screen name="join" component={Join} options={{ title: ' ',}}/>
    </Stack.Navigator>
  );
}

function LogoTitle(){
  const navigation = useNavigation();
  return(
    <TouchableOpacity onPress={() => navigation.navigate('home')}>
     <Image 
      style={{ width: 100, height: 25 }}//marginLeft값 조절하여 로고 위치 이동가능!!
      source={require('./asset/logoTitle.png')}/>
    </TouchableOpacity>
  );
}

const TabBarIcon=(focused,name)=>{
  let iconName, iconSize, iconColor;
  
  if(name=='home'){
    iconName='home-outline'
  }else if(name=='category'){
    iconName='apps-outline'
  }else if(name=='profile'){
    iconName='person-outline'
  } 

  iconSize=35
  iconColor=focused?'rgba(28, 173, 236, 1)':'#A6A6A6'
  return (
    <Ionicons
    name={iconName}
    color={iconColor}
    size={iconSize} />
    )

}

function Tab_navi(){
  return(
    <Tab.Navigator initialRouteName="home"
      screenOptions={({route})=>({
        tabBarActiveTintColor:'rgba(28, 173, 236, 1)',
        tabBarInactiveTintColor:'#A6A6A6',
        tabBarLabel:route.name,
        tabBarIcon:({focused})=>(
          TabBarIcon(focused,route.name)
        ),
        headerTitle:(props)=><LogoTitle{...props}/>
      })}>
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="category" component={Category} />
      <Tab.Screen name="profile" component={Profile} />
    </Tab.Navigator>
  );
}
//화면 title은 카테고리 임의로 설정한 2개로 함.
function Category_navi({navigation}){
  return(
    <Stack.Navigator>
      <Stack.Screen name="category_one" component={Category_one} options={{
          title: '',
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('cart')}>
              <Image
               style={{width: 20, height: 25, marginRight: 20}}
               source={require('./asset/alarm.png')}
              />
            </TouchableOpacity>
          ),}} />
      <Stack.Screen name="category_two" component={Category_two} options={{
          title: '주방용품',
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('cart')}>
              <Image
               style={{width: 20, height: 25, marginRight: 20}}
               source={require('./asset/alarm.png')}
              />
            </TouchableOpacity>
          ),}}/>
      <Stack.Screen name="category_detail" component={Category_detail} options={{title: '상품 상세'}} />
    </Stack.Navigator>
  );
}

function Product_navi({navigation}){
  return(
    <Stack.Navigator>
      <Stack.Screen name="product_list" component={Product_list} options={{title: '나의 주문내역'}} />
      <Stack.Screen name="product_info" component={Product_info} options={{
          title: '주문 상세', headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('product_list')}>
              <Text style={{color:'rgba(28, 173, 236, 1)', fontWeight:'bold',fontSize: 22,}}>완료</Text>
            </TouchableOpacity>
          ),}} />
    </Stack.Navigator>
  );
}

export default function App(){
  return(
    <NavigationContainer  initialRouteName="loading">
      <Stack.Navigator>
        <Stack.Screen name="loading" component={Loading} options={{headerShown:false}}/>
        <Stack.Screen name="logjoin_navi" component={LogJoin_navi} options={{headerShown:false}} />
        <Stack.Screen name="tab_navi" component={Tab_navi} options={{headerShown:false}}/>
        <Stack.Screen name="cart" component={Cart} options={{title:'장바구니', headerTitleStyle: {fontWeight: 'bold', fontSize: 22,}, headerTitleAlign: 'center'}}/>
        <Stack.Screen name="cart_info" component={Cart_info} options={{title:reportTitle, headerTitleStyle: {fontWeight: 'bold', fontSize: 22,}, headerTitleAlign: 'center'}}/>
        <Stack.Screen name="category_navi" component={Category_navi} options={{headerShown:false}} />
        <Stack.Screen name="account" component={Account} options={{ title: ' ',}}/>
        <Stack.Screen name="product_navi" component={Product_navi} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}