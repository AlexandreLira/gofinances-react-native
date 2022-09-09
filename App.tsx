import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'expo-status-bar';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme'
import { Routes } from './src/routes';
import { SignIn } from './src/screens/SignIn';
import { AuthProvider } from './src/hooks/auth';


export default function App() {
  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if(!fontsLoaded){
    return null
  }
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='light'/>
      <AuthProvider>
        <Routes/>
      </AuthProvider>
    </ThemeProvider>
  );
}

