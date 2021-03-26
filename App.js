import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import Routes from './src/routes'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0984e3',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  )
}

export default App

