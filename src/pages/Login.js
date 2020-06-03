import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }){
    const [email, setEmail] = useState('');
    const [techs, setTech] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user =>{
            if(user){
                navigation.navigate('List');
            }
        })
    }, []);

    async function handleSubmit(){
        const response = await api.post('/sessions', { email })
        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior='padding' style={styles.container}>
            <Image source={logo}/>

            <View style={styles.form}>
                <Text style={styles.label}>YOUR EMAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder= 'Your email'
                    placeholderTextColor= '#999'  
                    keyboardType='email-address'    
                    autoCapitalize='none'
                    autoCorrect={false}    
                    value={ email }
                    onChangeText={ setEmail }          
                />

                <Text style={styles.label}>TECHNOLOGIES *</Text>
                <TextInput
                    style={styles.input}
                    placeholder= 'Wanted techs'
                    placeholderTextColor= '#999'
                    autoCapitalize='words'
                    autoCorrect={false}   
                    value={ techs }
                    onChangeText={ setTech }           
                />

                <TouchableOpacity onPress={ handleSubmit } style={styles.button}>
                    <Text style={styles.btnText}>Find spots</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height:44,
        marginBottom: 20,
        borderRadius: 5
    },

    button: {
        height: 42,
        backgroundColor: '#6a2978',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
});