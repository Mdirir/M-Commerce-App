import Shadow from '../components/ui/Shadow'
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import axios from "axios"
import FeaturedProduct from '../components/products/FeaturedProduct'
import Products from '../components/products/Products'
import { ActivityIndicator } from 'react-native'
import { useColorScheme } from 'nativewind'
import { Button } from 'react-native'
import { Image } from 'react-native'
import * as FileSystem from 'expo-file-system'
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../config'
import { Switch } from 'react-native'
import InsetShadow from 'react-native-inset-shadow'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddProduct from '../components/Admin/AddProduct'
import AdminProducts from '../components/Admin/AdminProducts'
import { ShopConsumer } from '../store/context'
import Slider from '@react-native-community/slider'

function Admin(props) {
    const [toggleProductView, setTogleProductView] = useState(false)
    const [toggleProductAdd, setTogleProductAdd] = useState(false)

    const context = ShopConsumer()
    const { destroySession } = context

    function signOut() {
        destroySession()
        props.navigation.push('Auth')
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View className='flex flex-col gap-y-3 mb-6'>
                    <View>
                        <View className='h-14 mx-4'>
                            <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                <Pressable onPress={() => { setTogleProductAdd(false), setTogleProductView(true) }}
                                    className=" bg-opacity-0 flex flex-row py-2 px-3 rounded-lg" android_ripple={{ color: '#ccc' }}
                                >
                                    <Text className='p-2 text-lg'> Products Dashboard</Text>
                                </Pressable>
                            </InsetShadow>
                        </View>
                        {toggleProductView ? <View>
                            <AdminProducts />
                        </View> : ""}
                    </View>
                    <View>
                        <View className='h-14 mx-4'>
                            <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                <Pressable onPress={() => { setTogleProductAdd(true), setTogleProductView(false) }}
                                    className=" bg-opacity-0 flex flex-row py-2 px-3 rounded-lg" android_ripple={{ color: '#ccc' }}
                                >
                                    <Text className='p-2 text-lg'> View Add Products</Text>
                                </Pressable>
                            </InsetShadow>
                        </View>
                        {toggleProductAdd ? <View>
                            <AddProduct />
                        </View> : ""}
                    </View>
                    <View>
                        <View className='h-14 mx-4'>
                            <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                <Pressable onPress={() => signOut()}
                                    className=" bg-opacity-0 flex flex-row py-2 px-3 rounded-lg" android_ripple={{ color: '#ccc' }}
                                >
                                    <Text className='p-2 text-lg'> Log Out</Text>
                                </Pressable>
                            </InsetShadow>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    //inset shadow
    shadow: {
        borderRadius: 25,
        // backgroundColor: "red" //dynamically change the colors dark/light
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

export default Admin