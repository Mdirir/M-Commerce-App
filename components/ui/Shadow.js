import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'
import { StyleSheet } from 'react-native'


function Shadow({ children, shadowColor }) {
    return (
        <View style={shadowColor}>
            <LinearGradient
                // style={{ margin: 20 }}
                locations={[-0.96, 1.36]}
                colors={['rgba(5, 4, 0, 0.1)', 'rgba(255, 255, 255, 0.1)']}
            >
                {children}
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default Shadow