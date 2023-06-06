import React from 'react';
import { StyleSheet,View, Image,Button,ImageBackground,TouchableOpacity} from 'react-native';

export default function LogJoinContainer({navigation}){
/*
    return(
            <ImageBackground
                style={{ width: '100%', height: '100%',resizeMode:'cover' }}
                source={require('../asset/loading.png')}>
                <View style={styles.none}></View>
                <View style={styles.buttons}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('login')}>
                        <Image 
                        style={{ width: 250, height: 100 ,resizeMode:'contain'}}
                        source={require('../asset/login_button1.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('join')}>
                        <Image 
                        style={{ width: 250, height: 100 ,resizeMode:'contain'}}
                        source={require('../asset/join_button1.png')}/>
                    </TouchableOpacity>
                 </View>
            </ImageBackground>
    );
    */

    return(
            <View style={{ flex: 1, backgroundColor: "#fff" }}>
             <Image
                style={{ width: '80%', height: '60%', resizeMode:'contain', marginLeft: "10%" }}
                source={require('../asset/logoTitle.png')}/>
                <View style={styles.none}></View>
                <View style={styles.buttons}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('login')}>
                        <Image
                        style={{ width: 250, height: 100 ,resizeMode:'contain'}}
                        source={require('../asset/login_button1.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('join')}>
                        <Image
                        style={{ width: 250, height: 100 ,resizeMode:'contain'}}
                        source={require('../asset/join_button1.png')}/>
                    </TouchableOpacity>
                 </View>
            </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    none:{

    },
    buttons:{
        width:"100%",
        height:"25%",
       alignItems: 'center',
       justifyContent: 'space-around',
    },
});