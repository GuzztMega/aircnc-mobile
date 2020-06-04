import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api';

function  SpotList({ tech, navigation }){
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots(){
            const response = await api.get('/spots', {
                params: { tech }
            })

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function handleNavigate(id){
        navigation.navigate('Book', { id });
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Companies that uses <Text style={styles.bold}>{tech}</Text></Text>
            <FlatList 
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={ styles.listItem }>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}> {item.price ? `R$${item.price}/day` : `FREE` } </Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.btnText}>Make a reservation</Text>
                        </TouchableOpacity>
                    </View>
                )}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 18,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold',
    },

    list: {
        paddingHorizontal: 20
    },

    listItem:{
        marginRight: 15,
    },

    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2,
    },

    company: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },

    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5,
    },

    button: {
        height: 32,
        backgroundColor: '#6a2978',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginTop: 15,
    },

    btnText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15
    }
});

export default withNavigation(SpotList);