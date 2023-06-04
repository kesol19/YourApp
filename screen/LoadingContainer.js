import React from 'react';
import { View, Text,Button,TouchableOpacity,Image} from 'react-native';

export default function LoadingContainer({navigation}){
    return(
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('logjoin_navi',{screen:'logjoin'})}>
            <Image 
            style={{ width: '100%', height: '100%',resizeMode:'cover' }}
            source={require('../asset/loading.png')}/>
        </TouchableOpacity>
    );
}