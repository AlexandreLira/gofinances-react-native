import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import React, { useCallback, useEffect } from 'react';
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
import { AuthProvider, useAuth } from './src/hooks/auth';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';


export default function App() {
  const { userStorageLoading } = useAuth()

  const [ fontsLoaded ] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded || userStorageLoading) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{flex: 1}}>
      <ThemeProvider theme={theme}>
        <StatusBar style='light'/>
        <AuthProvider>
          <Routes/>
        </AuthProvider>
      </ThemeProvider>
    </View>
  );
}

