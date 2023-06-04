
import React, { useEffect, useState} from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity
} from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';




export default function LoginContainer({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    let userName;

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    const userDocument = firestore().collection('users').doc(user.uid).get();

    return (
        <View style={styles.container}>

            <Image style={styles.image} source={require("../asset/logoTitle.png")} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="이메일"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="비밀번호"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn}
                onPress={() => auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                        console.log('User account signed in!');
                        console.log({user});
                        console.log(user.email);
                        userDocument.then(documentSnapshot =>{
                            console.log(documentSnapshot.data());
                            userName = documentSnapshot.get('name');
                            console.log(userName);
                       });
                        navigation.navigate('tab_navi')
                    })
                    .catch(error => {
                        if (error.code === 'auth/user-not-found') {
                            console.log('That email address is already in use!');
                            alert('유효하지 않은 이메일입니다');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                            alert('잘못된 이메일 형식입니다');
                        }

                        if (error.code === 'auth/wrong-password') {
                            console.log('wrong password');
                            alert('잘못된 비밀번호입니다');
                        }

                        console.error(error);
                    })}>
                <Text style={{fontWeight:'bold',color:'#ffffff',fontSize:16}}>로그인</Text>

            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    image: {
        marginBottom: 40,
    },

    inputView: {
        backgroundColor: "#fff",
        borderRadius: 3,
        width: "80%",
        height: 45,
        marginBottom: 20,
        borderBottomWidth: 1
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 30,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "rgba(28, 173, 236, 1)",
    },
});

