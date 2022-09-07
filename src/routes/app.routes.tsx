import React from "react";
import { Platform } from "react-native";
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";

import { useTheme } from "styled-components";
import { EditTransaction } from "../screens/EditTransaction";

const { Navigator, Screen } = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function Home() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Dashboard} />
            <Stack.Screen name="EditTransaction" component={EditTransaction} />
        </Stack.Navigator>
    )
}

export function AppRoutes() {
    const theme = useTheme();
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: "beside-icon",
                tabBarStyle: {
                    height: 72,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0 
                }
            }}
        >
            <Screen
                name="Listagem"
                component={Home}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <Feather size={size} color={color} name="list"/> 
                    ))
                }}
                />
            <Screen
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <Feather size={size} color={color} name="dollar-sign"/> 
                    ))
                }}
                />
            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({size, color}) => (
                        <Feather size={size} color={color} name="pie-chart"/> 
                    ))
                }}
            />
        </Navigator>
    )
}