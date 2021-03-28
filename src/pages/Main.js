import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

const Main = ({ navigation }) => {

    const [books, setBooks] = useState([]);

    const onScreenLoad = async () => {
        const data = {
            id: '1',
            name: 'Take a iten',
            description: 'description note'
        }

        const dataAsync = await AsyncStorage.getItem('item')
        console.log(dataAsync)
        if(dataAsync === null || dataAsync === [] || dataAsync === undefined){
            books.push(data)
            await AsyncStorage.setItem('item', JSON.stringify(books))
        }    
            
    }
    useEffect(() => {
        onScreenLoad()
        console.log(books)
    }, [])

   
    useEffect(() => {
      AsyncStorage.getItem('item').then(data => {
        const book = JSON.parse(data)
        setBooks(book)
      })
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.toolbox}>
                <Text style={styles.title}>Add new item...</Text> 
                <TouchableOpacity
                    style={styles.toolboxButton}
                    onPress={() => navigation.navigate('TakeList')}>
                    <Icon name="add" size={14} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList 
                data={books} 
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={styles.itensContainer}>

                    <TouchableOpacity 
                    style={styles.itemButton}
                    onPress={() => {}}>
                    <Text style={[styles.itemText, styles.itemRead]}>
                        {item.name}
                    </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => {}}>
                    <Icon name="create" size={14} color="#2ecc71" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => {}}>
                    <Icon name="delete" size={14} color="#e74c3c" />
                    </TouchableOpacity>
                </View>
                )} 
            />



        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
    },
    toolboxButton: {
        backgroundColor: "#0984e3",
        borderRadius: 50,
        width: 22,
        height: 22,
        justifyContent: "center",
        alignItems: "center",
    },
    toolbox: {
        flexDirection: "row",
        marginBottom: 5,
        marginTop: 10,
    },
    title: {
        flex: 1,
        fontSize: 16,
        color: "#2d3436",
    },
    itensContainer: {
        flexDirection: 'row',
    },
    itemButton: {
        flex: 1,
    },
    itemText: {

    },
    itemRead: {

    },
    editButton: {

    },
    deleteButton: {

    },


})

export default Main