import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { ActivityIndicator } from 'react-native'

export default function SplashScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', }}>
            <Image source={require('../../assets/vector.png')} style={{ marginTop: -100 }} />
            <Text style={styles.connect}>
                Let's Connect in {'\n'} one platform
            </Text>

            <ActivityIndicator size="large" color="#3672E9" style={{ marginTop: 50 }} />
        </View>
    )
}

const styles = StyleSheet.create({
    connect: {
        backgroundColor: '#3672E9',
        color: 'white',
        fontSize: 34,
        fontWeight: '900',
        marginTop: 50,
        paddingVertical: 25,
        paddingHorizontal: 50,
        borderRadius: 25,
        textAlign: 'center'
    },
})