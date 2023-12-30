import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'
import { useColorScheme } from 'nativewind'



function ShadowTwo({ children, shadowColor }) {
    const { colorScheme, toggleColorScheme } = useColorScheme()
    return (
        <View style={shadowColor}>
            <LinearGradient
                // style={{ margin: 20 }}
                locations={[-0.96, 1.36]}
                colors={colorScheme === 'light' ? ['rgba(5, 4, 0, 0.1)', 'rgba(255, 255, 255, 0.1)'] : ['#18140f', 'rgba(24, 22, 15, 0.7)']} //top, bottom:strong
            >
                {children}
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default ShadowTwo