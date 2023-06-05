import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function ProfileContainer({ navigation }) {
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

  const [userData, setUserData] = useState([]);

  const userDocument = firestore().collection('users').doc(auth().currentUser.uid).get();

  useEffect(() => {
    userDocument.then(documentSnapshot => {
      setUserData(documentSnapshot.data());
    });
  }, [userData]);


  return (
    <View style={pf_styles.container}>
      <View style={pf_styles.user}>
        <View style={u_styles.photo}>
          <Image
            style={{ height: '95%', width: '100%', resizeMode: 'contain' }}
            source={require('../asset/userphoto_null.png')} />
        </View>
        <View style={u_styles.name}>
          <Text style={u_styles.name_text}>
            {userData.name}
          </Text>
        </View>
      </View>
      <View style={pf_styles.select}>
        <TouchableOpacity style={s_styles.button}
          activeOpacity={0.8} onPress={() => navigation.navigate('account')}>
          <View style={s_styles.block_l}>
            <Text style={s_styles.text_l}>     계정</Text>
          </View>
          <View style={s_styles.block_r}>
            <Text style={s_styles.text_r}>{'  >      '}</Text>
          </View>
        </TouchableOpacity>
        <View style={s_styles.block_b}></View>
        <TouchableOpacity style={s_styles.button}
          activeOpacity={0.8} onPress={() => navigation.navigate('product_navi', { screen: 'product_list' })}>
          <View style={s_styles.block_l}>
            <Text style={s_styles.text_l}>     나의 주문내역</Text>
          </View>
          <View style={s_styles.block_r}>
            <Text style={s_styles.text_r}>{'  >      '}</Text>
          </View>
        </TouchableOpacity>
        <View style={s_styles.block_b}></View>
      </View>
    </View>
  );
}


const pf_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  user: {
    width: "100%",
    height: "35%",
    backgroundColor: '#FFFFFF',
  },
  select: {
    width: "100%",
    height: "40%",
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const u_styles = StyleSheet.create({
  photo: {
    flex: 2.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_text: {
    color: '#000000',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: "bold",
  },
});

const s_styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "33%",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  block_l: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  block_r: {
    backgroundColor: '#ffffff',
  },
  block_b: {
    width: "85%",
    height: 0.8,
    backgroundColor: '#A6A6A6',
    opacity: 0.8,
  },
  text_l: {
    fontSize: 20,
    color: '#000000',
    alignItems: 'center',
  },
  text_r: {
    fontSize: 20,
    color: '#A6A6A6',
    fontWeight: "bold",
  },
});