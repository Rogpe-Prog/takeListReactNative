import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { TextInput  } from 'react-native-paper'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

Icon.loadFont();

const TakeList = ({ route, navigation }) => {

    const { item, isEdit } = route.params
 
    const EdItem = {
        id: item.id,
        name: item.name,
        description: item.description,
        read: false,
      }
    
    const [ name, setName ] = useState(EdItem.name)
    const [ description, setDescription ] = useState(EdItem.description)
    const [ read, setRead ] = useState(EdItem.read)
    const [books, setBooks] = useState([]);

    
    useEffect(() => {
      AsyncStorage.getItem('item').then(data => {
        const book = JSON.parse(data);
        setBooks(book) 
      })
    }, []);

    const isValid = () => {
        if(name !== '' && name !== undefined){
            return true
        }
        return false
    }

    const onSave = async () => {
        if(isValid()){

            if(isEdit){
                let newItems = books
        
                newItems.map(item => {
                    if(item.id === EdItem.id){
                    item.name = name
                    item.description = description
                    item.read = read
                    }
                    return item
                })
        
                await AsyncStorage.setItem('item', JSON.stringify(newItems))
    
            } else {
                const id = Math.random(5000).toString()
                
                let newItens = {
                    id,
                    name,
                    description
                }
                books.push(newItens)
                //salva no AsyncStorage
                await AsyncStorage.setItem('item', JSON.stringify(books))
            }
            navigation.replace('Main')

        } else {
            Alert.alert('Invalid data!')
        }

    }

    return(
        <View style={styles.container}>
            <Text style={styles.pageTitle}>New Item</Text>
            <TextInput
                style={styles.input}
                placeholder= 'Name'
                value={name}
                onChangeText={text => setName(text)}
            />
            
            <TextInput
                style={styles.input}
                value={description}
                placeholder= 'Description'
                multiline= {true}
                numberOfLines={4}
                onChangeText={text => setDescription(text)}
            />
  
            <TouchableOpacity
                style={styles.cameraButton} 
                onPress={() => {}}   
            >
                <Icon name="photo-camera" size={18} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.saveButton}
                icon="content-save" 
                mode="contained" 
                onPress={onSave}
            >
                <Text style={styles.textBtnSave}>{isEdit ? 'Edit' : 'Save'}</Text>
               
            </TouchableOpacity>
            
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={navigation.goBack}
            >
                <Text>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        paddingTop: Constants.statusBarHeight,
    },  
    pageTitle: {
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 20,
        marginTop: 10,
    },
    input: {
        fontSize: 16,
        borderBottomColor: '#0984e3',
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    cameraButton: {
        backgroundColor: '#0984e3',
        borderRadius: 50,
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#0984e3',
        alignSelf: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
      },
      saveButtonInvalid: {
        opacity: 0.5,
      },
      cancelButton: {
        alignSelf: 'center',
      },
      cancelButtonText: {
        color: '#95a5a6',
      },
      textBtnSave: {
        color: '#fff',
      },
})

export default TakeList