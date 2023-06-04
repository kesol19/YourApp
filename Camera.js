import React, {useState} from 'react';
import {View, StyleSheet, Image, Button, PermissionsAndroid,TouchableOpacity,Text} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from "react-native-modal";


export default function Camera() {
  const [avatar, setAvatar] = useState('https://ifh.cc/g/U8hH86.png');
  const [grant, setGrant] = useState();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera",
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

  //state 가 업데이트 되는 모든 순간에
  //useEffect(() => {});
  //컴포넌트 실행될때만
  //useEffect(() => {}, []);
  // avatar 값이 변경될 때만
  //useEffect(() => {}, [avatar]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width:"50%",height:"30%",backgroundColor:'#000000'}} onPress={toggleModal}>
        <Image source={{uri: avatar}} style={styles.avatar} />
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}
          backdropColor='#E5E5E5'
          onBackdropPress={() => setModalVisible(false)}
          style={{ flex: 1, flexDirection:"row" ,alignItems: "flex-end" }}
          >
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
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e4ab26',
  },

  avatar: {
    width: '100%',
    height: '100%',
    borderRadius:100
  },
});

const m_style=StyleSheet.create({
  select:{
    backgroundColor:"#ffffff",
    height:"8%",
    borderRadius:10,
    justifyContent: "center",
    alignItems: "center",
  },
  none_n:{
    height:2,
    backgroundColor:"#e5e5e5",
  },
  none_f:{
    height:5,
    backgroundColor:"#e5e5e5",
  },
  text:{
    color:"#000000",
    fontSize: 18,
  },
  cancel:{
    color:"#FF1B1B",
    fontWeight:"bold",
    fontSize: 18,
  },
})