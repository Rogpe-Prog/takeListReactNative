import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image } from 'react-native'
import { Camera } from 'expo-camera'

import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

const Appcam = ({ navigation }) => {
    const camRef = useRef(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [hasPermission, setHaspermission] = useState(null)
    const [capturedPhoto, setCapturedPhoto] = useState(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHaspermission(status === 'granted')
        })()
    }, [])

    if(hasPermission === null) {
        return <View />
    }
    if(hasPermission === false) {
        return <Text>Access denied!!!!</Text>
    }

    const takePicture = async () => {
        if(camRef){
            const data = await camRef.current.takePictureAsync()
            setCapturedPhoto(data.uri)
            setOpen(true)
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <Camera 
                style={{ flex: 1, }}
                type={type}
                ref={camRef}
            >
                <View style={{ 
                    backgroundColor: 'transparent', 
                    flex: 1,
                    flexDirection: 'row',
                }}>

                    <TouchableOpacity style={{
                            backgroundColor: 'transparent', 
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            bottom: 20,
                            left: 5,
                        }}
                            onPress={ () => navigation.navigate('TakeList') }
                        >
                            <Icon name="arrow-back" size={38} color="#fff" />                              
                    </TouchableOpacity>


                    <TouchableOpacity 
                        style={{ 
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            bottom: 20,
                            left: 30,
                        }}
                        onPress={ () => setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        )}
                    >
                        <Icon name="flip-camera-android" size={38} color="#fff" />
                    </TouchableOpacity>


                <TouchableOpacity style={{
                    backgroundColor: 'transparent', 
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    bottom: 20,
                    left: 50,
                }}
                    onPress={takePicture}
                >
                    <Icon name="photo-camera" size={38} color="#fff" />                              
                </TouchableOpacity>

                </View>
            </Camera>
            
                { capturedPhoto &&
                    <Modal 
                        animationType={false}
                        visible={open}
                    >
                        <View style={{
                                flex: 1, 
                                flexDirection: 'row',
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                
                                 }}>
                            <Image 
                                style={{ 
                                    width: '100%', 
                                    height: 300, 
                                    width: 300,  
                                    borderRadius: 20, 
                                    margin: 20,  
                                }}
                                source={{uri: capturedPhoto }}
                            />
                        </View>
                        <View style={{
                                flex: 1, 
                                flexDirection: 'row',
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                 }}>
                            
                            <TouchableOpacity style={{ 
                                margin: 10, 
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }} 
                                onPress={() => navigation.navigate('TakeList', { image: capturedPhoto, imgs: true }) }>
                                <Icon name="check" size={50} color="#27ae60" /> 
                            </TouchableOpacity>
                            <TouchableOpacity style={{ 
                                margin: 10, 
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                            }} 
                                onPress={() => setOpen(false)}>
                                <Icon name="close" size={50} color="#ff0000" /> 
                            </TouchableOpacity>

                        </View>
                    </Modal>
                }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonCam: {
        alignSelf: 'center',
        bottom: 20, 
        left: 20,
    },
})

export default Appcam