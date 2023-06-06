import React from 'react';
import { View, Text,Button,TouchableOpacity,Image} from 'react-native';

export default function LoadingContainer({navigation}){
    return(
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('logjoin_navi',{screen:'logjoin'})}>
            <Image 
            style={{ width: '80%', height: '80%', resizeMode:'contain', marginLeft: "10%" }}
            source={require('../asset/logoTitle.png')}/>
        </TouchableOpacity>
      </View>
    );
}