import React, { useState, useEffect, useCounter } from "react";
import Geolocation from "react-native-geolocation-service"; 
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps"; 
import Styled from "styled-components"; 
import { Platform, PermissionsAndroid } from "react-native";

// UI 임시용
const Container = Styled.View`
    flex: 1;
`;

// 위치정보 사용 요청

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
function App() {

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

  return (
    <Container>

    </Container>
    
  );

}

export default App;

/*
      {location && (
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapView>
      )}
      */
