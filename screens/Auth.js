import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useLayoutEffect } from 'react'
import { useState } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import { Text } from 'react-native'
import { ShopConsumer } from '../store/context'

function Auth({ navigation }) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const context = ShopConsumer()
    const { state, createSession } = context
    useLayoutEffect(() => {
        if (state.session.token && state.session.token.length > 70) {
            navigation.navigate('Home')
            // navigation.setOptions = {
            //     title: 'HomePAGE',
            // }
        }
    }, [state])
    // if(state.session.token.length)
    async function handleLogin() {
        const data = { email: email, password: password }
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_HTTP_LINK}/login`,
                {
                    method: "POST",
                    body: { body: data },
                    headers: { "Content-Type": "application/json" },
                }
            )
            if (response.data.success) {
                await AsyncStorage.setItem("Session", JSON.stringify(response.data))
                createSession()
                navigation.navigate('Home')
                //goto MAin page
            }
            console.log(response.data)
        } catch (error) {
            console.log(error, "OH NO or Axios 404")
        }
    }
    return (
        <View className=' justify-center items-center flex-1 gap-y-5'>
            <View className=' flex flex-row items-center'>
                <Text className='text-3xl ft border-2 lowercase bg-black text-white p-1 font-bold'>Acme</Text>
                <Text className='text-3xl ft border-2 uppercase text-center p-1 font-bold'>Fashion</Text>
            </View>
            <View className=" flex-row table border-2 rounded-lg gap-x-3">
                <Text className='p-2 dark:text-white'>Email:</Text>
                <TextInput className='p-2 w-64 border-l-[1px] ml-10  dark:placeholder-white' placeholder='Email' autoComplete='email' onChangeText={(e) => setEmail(e)} />
            </View>
            <View className=" flex-row gap-x-0 table border-2 rounded-lg -ml-2">
                <Text className='p-2 dark:text-white'>Password:</Text>
                <TextInput className='p-2 w-[249px] border-l-[1px] dark:placeholder-white' placeholder='Password' autoComplete='password' onChangeText={(e) => setPassword(e)} />
            </View>
            <Pressable android_ripple={{ color: "#ccc" }} onPress={handleLogin}>
                <Text className='py-3 px-5 border-[1px] text-lg rounded-lg dark:text-white'>Sign in</Text>
            </Pressable>
        </View>
    )
}

export default Auth