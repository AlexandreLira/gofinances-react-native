import React from "react";
import { Platform } from "react-native";
import { Feather } from '@expo/vector-icons'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { Resume } from "../screens/Resume";

import { useTheme } from "styled-components";

const { Navigator, Screen } = createBottomTabNavigator();

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
                component={Dashboard}
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