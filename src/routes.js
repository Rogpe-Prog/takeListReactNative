import React from 'react'

import Main from './pages/Main'
import TakeList from './pages/TakeList'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const Routes = () => {
    return(
        <NavigationContainer>

        <Stack.Navigator>
            <Stack.Screen 
                name="Main" 
                component={Main} 
                options={{
                title: 'List',
                headerStyle: {
                  backgroundColor: '#0984e3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  alignSelf: 'center',
                },
              }}
            />

            <Stack.Screen 
              name="TakeList" 
              component={TakeList} 
              options={{
                title: 'Take a List',
                headerLeft: () => null,
                headerStyle: {
                  backgroundColor: '#0984e3',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                fontWeight: 'bold',
                alignSelf: 'center',
                },
              }}
            />

        </Stack.Navigator>

        </NavigationContainer>
    )
}



export default Routes