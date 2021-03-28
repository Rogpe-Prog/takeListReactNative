import React from 'react'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'

import Routes from './src/routes'
import Appcam from './src/Appcam'

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
    <Appcam />
  )
}

export default App


{/* <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider> */}
