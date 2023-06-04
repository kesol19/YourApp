import { firebase } from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function LoginContainer({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, setUser] = useState();
    const [initializing, setInitializing] = useState(true);

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

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

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="닉네임"
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <TouchableOpacity style={styles.joinBtn}
                onPress={() => auth()
                    .createUserWithEmailAndPassword(email, password)
                    .then(() => {
                        alert('User account created & signed in!');
                        console.log('User account created & signed in!');
                        firestore()
                            .collection('users')
                            .doc(auth().currentUser.uid)
                            .set({
                                CREATED_At: firestore.FieldValue.serverTimestamp(),
                                UPADATED_At: firestore.FieldValue.serverTimestamp(),
                                email: email,
                                name: name,
                                photo: null,
                                userID: auth().currentUser.uid
                            })
                            .then(() => {
                                console.log('User added!');
                            });
                        navigation.navigate('tab_navi')
                    })
                    .catch(error => {
                        if (error.code === 'auth/email-already-in-use') {

                            console.log('That email address is already in use!');
                            alert('이미 존재하는 이메일입니다.');
                        }

                        if (error.code === 'auth/invalid-email') {
                            console.log('That email address is invalid!');
                            alert('잘못된 형식입니다');
                        }

                        console.error(error);
                    })}>
                <Text style={{fontWeight:'bold',color:'#ffffff',fontSize:16}}>회원가입</Text>

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

    joinBtn: {
        width: "80%",
        borderRadius: 30,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "rgba(28, 173, 236, 1)",
    },
});