import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

const Main = ({ navigation }) => {

    const [books, setBooks] = useState([]);

    const onScreenLoad = async () => {
        //para não dar erro no AsyncStorage inicio com um "registro"
        const data = {
            id: '1',
            name: 'Take a iten',
            description: 'description note'
        }

        const dataAsync = await AsyncStorage.getItem('item')
        
        if(dataAsync === null || dataAsync === [] || dataAsync === undefined){
            books.push(data)
            await AsyncStorage.setItem('item', JSON.stringify(books))
        }    
    }

    useEffect(() => {
        onScreenLoad()
    }, [])

    useEffect(() => {
      AsyncStorage.getItem('item').then(data => {
        const book = JSON.parse(data)
        setBooks(book)
      })
    }, [books]);

    const onItemEdit = async (idItem) => {
        const itemEdit = books.find(itemEdi => itemEdi.id === idItem)
        navigation.navigate('TakeList', { item: itemEdit, isEdit: true})
    }

    const onDelete = async (idItem) => {
        const newItem = books.filter(item => idItem !== item.id)
        await AsyncStorage.setItem('item', JSON.stringify(newItem))
        setBooks(newItem)
    }

    const onItemRead = async (id) => {
        const newItem = books.map( item => {
            if(item.id === id){
                item.read = !item.read
            }
            return item
        })
        await AsyncStorage.setItem('item', JSON.stringify(newItem))
        setBooks(newItem)
    }

    const onDeleteAll = async () => {
        await AsyncStorage.clear()
        navigator.navigate('TakeList')
    }

    return(
        <View style={styles.container}>
            <View style={styles.toolbox}>
                <Text style={styles.title}>Add new item...</Text> 
                <TouchableOpacity
                    style={styles.toolboxButton}
                    onPress={() => navigation.navigate('TakeList',  { item: '', isEdit: false})}>
                    <Icon name="add" size={14} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.toolboxButtonX}
                    onPress={onDeleteAll}>
                    <Icon name="clear" size={14} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList 
                data={books} 
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                <View style={styles.itensContainer}>

                    <TouchableOpacity 
                    style={styles.itemButton}
                    onPress={() => onItemRead(item.id)}>
                    <Text style={[styles.itemText, item.read ? styles.itemRead : '']}>
                        {item.name}
                    </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => onItemEdit(item.id)}>
                    <Icon name="create" size={14} color="#2ecc71" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={styles.deleteButton} 
                    onPress={() => onDelete(item.id)}>
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
        marginRight: 15,
        marginBottom: 5,
    },
    toolboxButtonX: {
        backgroundColor: "#c23616",
        borderRadius: 50,
        width: 22,
        height: 22,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 15,
        marginBottom: 5,
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
        fontSize: 16,
        color: '#2d3436',
    },
    itemRead: {
        textDecorationLine: 'line-through',
        color: '#95a5a6',
    },
    editButton: {
        marginRight: 10,
    },
    deleteButton: {
        marginRight: 5,
    },


})

export default Main