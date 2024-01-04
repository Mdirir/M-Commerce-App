import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useLayoutEffect } from 'react'
import { useState } from 'react'
import { ActivityIndicator, Alert, Button, Pressable, SafeAreaView, ScrollView, TextInput, View } from 'react-native'
import { Text } from 'react-native'
import { ShopConsumer } from '../store/context'
import InsetShadow from 'react-native-inset-shadow'
import { RadioButton } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

function Auth({ route, navigation }, props) {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    //new data
    //modal states
    const [isLoadingSignup, setIsLoadingSignup] = useState(false)
    const [isLoadingLogin, setIsLoadingLogin] = useState(false)
    const [authModal, setAuthModal] = useState(false)
    //signup vars
    const [userName, setUserName] = useState()
    const [userGender, setGender] = useState()
    const [userDistrict, setDistrict] = useState()
    const [userRegion, setRegion] = useState()
    const [userAddress, setAddress] = useState()
    const [userContact, setContact] = useState()

    const context = ShopConsumer()
    const { state, createSession } = context
    // const route = useRoute()
    useLayoutEffect(() => {
        if (state.session.token && state.session.token.length > 70) {
            if (state.session.user.name === 'admin' || state.session.user.name === 'Admin') {
                navigation.navigate('Admin')
            }
            else {
                //initiate Reccomendation algo
                setRecommedation()
                async function setRecommedation() {
                    const categoryWeights = {//give admin control and save this as local data
                        'jacket': 2,//dobles that
                        'shirt': 1,
                        't-shirt': 1,
                        'shoes': 1,
                        'dress': 1,
                        'trouser': 2,
                    }
                    await AsyncStorage.setItem("WeightsAndBaises", JSON.stringify(categoryWeights))
                }
                navigation.navigate('Home')
            }
        }
        //Register or Grant system access
        if (route.params) {
            if (route.params.routeName === 'RequestAuthAccess') navigation.navigate('Auth')
            if (route.params.routeName === 'RequestAuthAccessUsingPush') navigation.navigate('Auth')
        } else {
            //Allow Gusts to Also access the system
            navigation.navigate('Home')
            navigation.setOptions = {
                title: 'Home',
            }
        }
    }, [])
    // if(state.session.token.length)
    async function handleLogin() {
        setIsLoadingLogin(true)
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
                setIsLoadingLogin(false)
                if (response.data.user.name === 'admin' || response.data.user.name === 'Admin') {
                    navigation.navigate('Admin')
                } else {
                    navigation.navigate('Home')
                }
                //goto MAin page
                //CHECKA DMIN TYPE AND ACCESS ADMIN DASHBOARD HERE
            } else {
                Alert.alert(
                    "Error!",
                    `${response.data.message}`,
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "OK", onPress: () => {
                                setIsLoadingLogin(false)
                            }
                        }
                    ]
                )
            }
            console.log(response.data)
        } catch (error) {
            Alert.alert(
                "Error!",
                `${error.message}`,
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            setIsLoading(false)
                        }
                    }
                ]
            )
            console.log(error.massage, "OH NO or Axios 404sass")
        }
    }
    function handleUserChoice(choice) {
        //console.log(
        //  email, password, userName, userGender, userDistrict, userRegion, userAddress, userContact
        //)
        if (choice == 'signup') {
            authModal ? handleSignUp() : setAuthModal(true)
        } else {
            !authModal ? handleLogin() : setAuthModal(false)
        }
    }
    async function handleSignUp() {
        //console.log('sign uppppp');
        setIsLoadingSignup(true)
        const data = {
            username: email,
            name: userName,
            password: password,
            gender: userGender,
            region: userRegion,
            district: userDistrict,
            address: userAddress,
            contact: userContact,
        }
        let response
        try {
            response = await axios.post(`${process.env.REACT_APP_HTTP_LINK}/signup`, {
                method: "POST",
                body: { body: data },
                headers: { "Content-Type": "application/json" },
            })
            if (response.data.success) {
                console.log('new User Created')
                await AsyncStorage.setItem("Session", JSON.stringify(response.data))
                createSession()
                navigation.navigate('Home')
                setIsLoadingSignup(false)
            }
        } catch (error) {
            Alert.alert(
                "Error!",
                "error.message",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: () => {
                            setIsLoadingSignup(false)
                        }
                    }
                ]
            )
            console.log(error, "OH NO or Axios 404,")
        }
    }
    //console.log('feneee', userGender)
    return (
        <SafeAreaProvider style={{ marginTop: 50 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='justify-center items-center flex-1 gap-y-5 h-inherit'>
                    <View className=' flex flex-row items-center'>
                        <Text className='text-3xl ft border-2 lowercase bg-black text-white p-1 font-bold'>Acme</Text>
                        <Text className='text-3xl ft border-2 uppercase text-center p-1 font-bold'>Fashion</Text>
                    </View>
                    {//display Modals for login and SignUp
                    }
                    {authModal ? <View className='flex gap-y-5'>
                        <View className='mx-3'>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                                <TextInput className='p-3 w-80 dark:placeholder-white' placeholder='Username' autoComplete='name' onChangeText={(e) => setUserName(e)} />
                            </InsetShadow>
                        </View>
                        <View className='mx-3'>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                                <TextInput className='p-3 w-80  dark:placeholder-white' placeholder='Email' autoComplete='email' onChangeText={(e) => setEmail(e)} />
                            </InsetShadow>
                        </View>
                        <View className='mx-3'>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                                <TextInput className='p-3 w-80 dark:placeholder-white' placeholder='Password' autoComplete='password' onChangeText={(e) => setPassword(e)} />
                            </InsetShadow>
                        </View>
                        <View className='flex flex-row justify-center items-center'>
                            <Text className='text-lg'>Choose Gender:</Text>
                            <RadioButton.Group onValueChange={(value) => (setGender(value))} value={userGender}>
                                <View className='flex flex-row gap-2'>
                                    <View className='flex flex-row gap-2'>
                                        <Text>Male</Text>
                                        <RadioButton value="male" />
                                    </View>
                                    <View className='flex flex-row gap-2'>
                                        <Text>Female</Text>
                                        <RadioButton value="female" />
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <View className='mx-3'>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                                <TextInput className='p-3 w-80 dark:placeholder-white' placeholder='District' autoComplete='off' onChangeText={(e) => setDistrict(e)} />
                            </InsetShadow>
                        </View>
                        <View className='mx-3'>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                                <TextInput className='p-3 w-80 dark:placeholder-white' placeholder='Region' autoComplete='off' onChangeText={(e) => setRegion(e)} />
                            </InsetShadow>
                        </View>
                        <View className='mx-3'>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                                <TextInput className='p-3 w-80 dark:placeholder-white' placeholder='Contact' autoComplete='cc-number' onChangeText={(e) => setContact(e)} />
                            </InsetShadow>
                        </View>
                        <View className='mx-3'>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                                <TextInput className='p-3 w-80 dark:placeholder-white' placeholder='Address' autoComplete='street-address' onChangeText={(e) => setAddress(e)} />
                            </InsetShadow>
                        </View>
                    </View>
                        :
                        <View className='justify-center items-center gap-y-5'>
                            <View className=" flex-row table border-2 rounded-lg gap-x-3 items-center">
                                <Text className='p-2 dark:text-white text-center'>Email:</Text>
                                <TextInput className='p-2 w-64 border-l-[1px] ml-10  dark:placeholder-white' placeholder='Email' autoComplete='email' onChangeText={(e) => setEmail(e)} />
                            </View>
                            <View className=" flex-row gap-x-0 table border-2 rounded-lg -ml-2 items-center">
                                <Text className='p-2 dark:text-white text-center'>Password:</Text>
                                <TextInput className='p-2 w-[249px] border-l-[1px] dark:placeholder-white' placeholder='Password' autoComplete='password' onChangeText={(e) => setPassword(e)} />
                            </View>

                        </View>
                    }
                    {//sign up ends
                    }
                    <View className='flex flex-col gap-y-2 mb-10'>
                        <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                            <Pressable android_ripple={{ color: "#ccc" }} onPress={() => handleUserChoice('signin')}>
                                <View className={`${!authModal ? 'flex flex-row border-[1px] rounded-lg py-3 px-5' : 'flex flex-row rounded-lg py-3 px-5'}`}>
                                    <Text className='text-lg  dark:text-white mr-3 text-center'>{!authModal ? 'Sign in' : 'Exisitng Accont'}</Text>
                                    {isLoadingLogin ? <ActivityIndicator size="small" color="green" /> : ""}
                                </View>
                            </Pressable>
                        </InsetShadow>
                        <Pressable android_ripple={{ color: "#ccc" }} onPress={() => handleUserChoice('signup')}>
                            <View className={`${authModal ? 'flex flex-row border-[1px] rounded-lg justify-center' : "flex flex-row rounded-lg justify-center"}`}>
                                <Text className='py-3 text-lg dark:text-white text-center'>Sign up </Text>
                                {isLoadingSignup ? <ActivityIndicator size="small" color="green" /> : ""}
                            </View>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaProvider >
    )
}

export default Auth


/*
<View className=" flex-row table border-2 rounded-lg gap-x-3">
                <Text className='p-2 dark:text-white'>Email:</Text>
                <TextInput className='p-2 w-64 border-l-[1px] ml-10  dark:placeholder-white' placeholder='Email' autoComplete='email' onChangeText={(e) => setEmail(e)} />
            </View>
            <View className=" flex-row gap-x-0 table border-2 rounded-lg -ml-2">
                <Text className='p-2 dark:text-white'>Password:</Text>
                <TextInput className='p-2 w-[249px] border-l-[1px] dark:placeholder-white' placeholder='Password' autoComplete='password' onChangeText={(e) => setPassword(e)} />
            </View>
            <View className='flex flex-col gap-y-2'>
            <InsetShadow containerStyle={{ borderRadius: 8, height:'auto' }}>
            <Pressable android_ripple={{ color: "#ccc" }} onPress={handleLogin}>
                <Text className='py-3 px-5 text-lg rounded-lg dark:text-white'>Sign in</Text>
            </Pressable>
            </InsetShadow>
            <Pressable android_ripple={{ color: "#ccc" }} onPress={handleLogin}>
                <Text className='py-3 px-5 border-[1px] text-lg rounded-lg dark:text-white'>Sign up</Text>
            </Pressable>
            </View>
*/