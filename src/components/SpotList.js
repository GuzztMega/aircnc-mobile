import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api';

export default function  SpotList({ tech }){
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
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url}} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}> {item.price ? `R$${item.price}/day` : `FREE` } </Text>
                        <TouchableOpacity onPress={() => {}} style={styles.button}>
                            <Text style={styles.buttonText}>Request a book</Text>
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
});