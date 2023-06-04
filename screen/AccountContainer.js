import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function AccountContainer() {
  const [name, setName] = useState('');
  const [email] = useState('hong12@konkuk.ac.kr');
  const [avatar, setAvatar] = useState('https://ifh.cc/g/xZcGco.png');
  //const [avatar, setAvatar] = useState('../asset/userphoto_null.png');
  const [grant, setGrant] = useState();

  const [isModalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState([]);

  const userDocument = firestore().collection('users').doc(auth().currentUser.uid).get();

  useEffect(() => {
    userDocument.then(documentSnapshot => {
      setUserData(documentSnapshot.data());
    });
  }, [userData]);

  const updateName=(name)=>{
    setName(name)
    firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .update({
      name: name,
    })
    .then(() => {
      console.log('User updated!');
      console.log(userData.name);
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //사진 관련 함수
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );

      setGrant(granted);
    } catch (err) {
      console.warn(err);
    }
  };
  const addImage = async () => {
    await requestCameraPermission();

    if (grant === 'granted') {
      const options = {
        //noData: true,
        mediaType: 'photo',
        saveToPhotos: true,
      };
      launchCamera(options, response => {
        setAvatar(response.assets[0].uri)
      });
    } else {
      // ?
    }
  };
  const showImage = () => {
    const options = {
      //noData: true,
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      setAvatar(response.assets[0].uri)
    });
  };

  return (
    <View
      style={ac_styles.container}>
      <View style={ac_styles.photo}>
        <TouchableOpacity style={ph_styles.photo} onPress={toggleModal}>
          <Image source={{ uri: avatar }} style={{ width: "95%", height: "100%", borderRadius: 100 }} />
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}
          backdropColor='#E5E5E5'
          onBackdropPress={() => setModalVisible(false)}
          style={{ flex: 1, flexDirection: "row", alignItems: "flex-end" }}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.8} style={m_style.select} onPress={() => {
              addImage();
              setModalVisible(false)
            }}>
              <Text style={m_style.text}>카메라</Text>
            </TouchableOpacity>
            <View style={m_style.none_n}></View>
            <TouchableOpacity activeOpacity={0.8} style={m_style.select} onPress={() => {
              showImage();
              setModalVisible(false)
            }}>
              <Text style={m_style.text}>이미지 선택</Text>
            </TouchableOpacity>
            <View style={m_style.none_f}></View>
            <TouchableOpacity style={m_style.select} onPress={toggleModal}>
              <Text style={m_style.cancel}>취소</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <View style={ph_styles.icon}>
          <Image
            source={require('../asset/photo_edit.png')} />
        </View>
      </View>
      <View style={ac_styles.info}>
        <View style={in_styles.button}>
          <View style={in_styles.block_l}>
            <Text style={in_styles.text_l}>     이메일</Text>
          </View>
          <View style={in_styles.block_m}>
            <Text style={in_styles.text_m}>{userData.email}</Text>
          </View>
          <View style={in_styles.block_r}>
            <Text style={in_styles.text_r}>{'      '}</Text>
          </View>
        </View>
        <TouchableOpacity style={in_styles.button} activeOpacity={1}>
          <View style={in_styles.block_l}>
            <Text style={in_styles.text_l}>     닉네임</Text>
          </View>
          <View style={in_styles.block_m}>
            <TextInput style={in_styles.text_m}
              onChangeText = {(name) => setName(name)
            }
              placeholder={userData.name} 
              onEndEditing={()=>updateName(name)}/>
          </View>
          <View style={in_styles.block_r}>
            <Text style={in_styles.text_r}>{'  >      '}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const ac_styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  photo: {
    width: "100%",
    height: "30%",
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  info: {
    width: "100%",
    height: "25%",
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ph_styles = StyleSheet.create({
  photo: {
    top: 25,
    width: "35%",
    height: "75%",
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain'
  },
  icon: {
    position: 'absolute',
    left: 220,
    top: 130,
  }
});

const in_styles = StyleSheet.create({
  button: {
    width: "100%",
    height: "50%",
    flexDirection: 'row',
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 8,
  },
  block_l: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  block_m: {
    backgroundColor: '#ffffff',
  },
  block_r: {
    backgroundColor: '#ffffff',
  },
  text_l: {
    fontSize: 20,
    color: '#000000',
    alignItems: 'center',
  },
  text_m: {
    fontSize: 19,
    color: '#A6A6A6',
  },
  text_r: {
    fontSize: 20,
    color: '#A6A6A6',
    fontWeight: "bold",
  },
});

const m_style = StyleSheet.create({
  select: {
    backgroundColor: "#ffffff",
    height: "8%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  none_n: {
    height: 2,
    backgroundColor: "#e5e5e5",
  },
  none_f: {
    height: 5,
    backgroundColor: "#e5e5e5",
  },
  text: {
    color: "#000000",
    fontSize: 18,
  },
  cancel: {
    color: "#FF1B1B",
    fontWeight: "bold",
    fontSize: 18,
  },
});