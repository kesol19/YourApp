import React, { useState, useEffect, useCounter } from "react";
import Geolocation from "react-native-geolocation-service";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { View, Text ,Button, Platform, PermissionsAndroid, StyleSheet, TouchableOpacity } from "react-native";

// 산책 메인

async function requestPositionPermission() {
  try {

    if (Platform.OS === "android") {
        return await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
    }

  } catch (e) {
    console.log(e);
  }
}

// main
export default function NoneContainer({navigation}){

    /*
    return(
        <View style={cate_styles.container}>
          <TouchableOpacity style={cate_styles.button_l} activeOpacity={0.8}>
            <Text style={cate_styles.text_l}>
              스마트폰
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={cate_styles.button_m} activeOpacity={0.8}>
            <Text style={cate_styles.text_m}>
              악세서리
            </Text>
          </TouchableOpacity>
        </View>

    );
    */


    const [location, setLocation] = useState();
    useEffect(() => {
      requestPositionPermission().then(result => {
        console.log({ result });

        if (result === "granted") {
          Geolocation.watchPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setLocation({
                latitude,
                longitude,
            });

          },
            error => {
              console.log(error.code, error.message);
            },
            {enableHighAccuracy: true, timeout: 10000, maximumAge: 5000},
          );
        }


      });
    }, []);


    return(
        <View>
            <Button
            style={[styles.goToWalkAdd]}
            title="스마트폰"
            onPress={() => navigation.navigate('category_navi',{screen:'category_one'})}/>

            <Button
            style={[styles.goToWalkTracking]}
            title="악세서리"
            onPress={() => navigation.navigate('category_navi',{screen:'category_two'})}/>

        </View>
    );

}


const cate_styles = StyleSheet.create({
 container: {
  flex: 1,
  },
 text_l: {
  position: "absolute",
  left: 32,
  top: 65,
  width: 61,
  color: "rgba(30, 174, 236, 1)",
  fontSize: 16,
  fontFamily: Inter_400,
  letterSpacing: 0,
  fontStyle: "normal",
  textAlign: "left",
 },
 text_m: {
  position: "absolute",
  left: 173,
  top: 65,
  width: 61,
  color: "rgba(0, 0, 0, 1)",
  fontSize: 16,
  fontFamily: Inter_400,
  letterSpacing: 0,
  fontStyle: "normal",
  textAlign: "left",
 },
 button_l: {
  width: "100%",
  height: "50%",
  flexDirection: 'row',
  alignItems: "center",
  backgroundColor: "#ffffff",
  padding: 8,
 },
 button_m: {
  width: "100%",
  height: "50%",
  flexDirection: 'row',
  alignItems: "center",
  backgroundColor: "#ffffff",
  padding: 8,
 },
});


const styles = StyleSheet.create({


  map: {
    width: 500,
    height: 500,
    flexDirection: 'row'
  } ,

  goToWalkAdd: {
    width: 50,
    height: 50,
    flexDirection: 'row'

  },

  goToWalkTracking: {
    width: 50,
    height: 50,
    flexDirection: 'row'

  }

});

/*
          {location && (
              <MapView
                initialRegion={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                style={[styles.map]}
                provider={PROVIDER_GOOGLE}
              >

              <Marker
                coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              />
              </MapView>

            )}
            */