import React,{ useState } from 'react';
import { SafeAreaView, Alert, Text, TextInput, AsyncStorage, StyleSheet, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }){
    const id = navigation.getParam('id');
    const [date, setDate] = useState('');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {date}, {headers: { user_id }})

        Alert.alert('Reservation request sent');
        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATE OF INTEREST *</Text>
            <TextInput
                style={styles.input}
                placeholder= 'Which date you wish to book?'
                placeholderTextColor= '#999'  
                autoCapitalize='words'
                autoCorrect={false}    
                value={ date }
                onChangeText={ setDate }          
            />

            <TouchableOpacity onPress={ handleSubmit } style={styles.button}>
                <Text style={styles.btnText}>Make a reservation</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ handleCancel } style={[styles.button, styles.cancelbutton]}>
                <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50,
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
        borderRadius: 2,
    },

    cancelbutton: {
        marginTop: 10,
        backgroundColor: '#ccc',
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})