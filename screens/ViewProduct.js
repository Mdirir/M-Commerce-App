import React, { useEffect, useState } from 'react'
import { Alert, Button, Pressable, StyleSheet, TextInput } from 'react-native'
import { Text } from 'react-native'
import { View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import InsetShadow from 'react-native-inset-shadow'
import { Divider } from 'react-native-paper'
import Slider from '../components/Slider'
import Shadow from '../components/ui/Shadow'
import { ShopConsumer } from '../store/context'
import { firebase } from '../config'
import { getDownloadURL } from "firebase/storage"
import { useColorScheme } from 'nativewind'
import ShadowTwo from '../components/ui/ShadowTwo'


//userinput
let quantity //doube check this
function ViewProduct({ route, navigation }) {
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const [tempSize, setTempSize] = useState()
    const [tempColor, setTempColor] = useState()
    const allProducts = route.params.product
    const main_product = route.params.product
    const sizeArr = main_product.product_size
    const size = sizeArr.split(", ")
    const colorArr = main_product.product_color
    const color = colorArr.split(", ")
    const descArr = main_product.product_desc
    const desc = descArr.split(", ")
    const [firebaseImges, settFirebaseImges] = useState()

    const context = ShopConsumer()
    const { state, cart } = context
    function addtoCart(product) {
        // console.log("will be activated soon")
        if (
            tempColor !== undefined &&
            tempSize !== undefined
        ) {
            const quantityy = { quantity: quantity === undefined ? 1 : quantity }
            const color = { color: tempColor }
            const size = { size: tempSize }
            let cartProduct = Object.assign(
                {},
                { product_id: allProducts.product_id },
                { product_img1: allProducts.product_img1 },
                { product_title: allProducts.product_title },
                { product_price: allProducts.product_price },
                { product_category: allProducts.p_cat_id },
                quantityy,
                color,
                size
            )
            Alert.alert('Added to Cart', 'Go to Cart for Checkout')
            cart(cartProduct)
        }

    }
    ///////////////////////////////////////////
    const handleChange = (data, type) => {
        if (type === 'size') {
            setTempSize(data)
        } else if (type === 'color') {
            setTempColor(data)
        } else {
            quantity = data
        }
    }
    //initate images
    useEffect(() => {
        getAllImages()
    }, [])
    function getAllImages() {
        const images = [allProducts.product_img1, allProducts.product_img2, allProducts.product_img3]
        const imgURL = Promise.all(images.map(async (imageName) => {
            const imageRef = firebase.storage().ref().child(imageName)
            let url
            try {
                url = await getDownloadURL(imageRef)
            } catch (error) {
                Alert.alert('Error', 'Error fetching images from firebase')
            }
            return url
        })).then(urls => {
            settFirebaseImges(urls)
        }).catch(error => {
            // Handle any errors
            Alert.alert(error, 'Error fetching images from firebase!')
        })
    }
    //UI
    function sizeRenderer(e) {
        return (
            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8, marginRight: 10 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <Pressable onPress={() => handleChange(e.item, 'size')} android_ripple={{ color: '#ccc' }} className={`${tempSize === e.item ? 'border-[1px] border-purple-500 rounded-lg' : ''}`}>
                    <Text className='mx-2 p-3 capitalize dark:text-white'>{e.item}</Text>
                </Pressable>
            </InsetShadow>
        )
    }
    function colorRenderer(e) {
        return (
            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8, marginRight: 10 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <Pressable onPress={() => handleChange(e.item, 'color')} android_ripple={{ color: '#ccc' }} className={`${tempColor === e.item ? 'border-[1px] border-purple-500 rounded-lg' : ''}`}>
                    <Text className='mx-2 p-3 capitalize dark:text-white'>{e.item}</Text>
                </Pressable>
            </InsetShadow>
        )
    }
    function descRenderer(e) {
        return (
            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8, marginRight: 10 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <Text className='mx-2 p-3 capitalize dark:text-white'>{e.item}</Text>
            </InsetShadow>
        )
    }

    return (
        <ScrollView>
            <View className='flex flex-1 dark:bg-colorDark'>
                {firebaseImges ? <Slider product_images={firebaseImges} /> : ""}
                <View className='bg-green-500 rounded-lg mx-2 my-2'>
                    <ShadowTwo shadowColor={[styles.card, {
                        shadowOffset: { width: 4, height: -2 },
                        shadowColor: colorScheme === 'light' ? 'rgb(0,0,0,0.2)' : "#18140f",//white his could cause erros dynamically change css
                        shadowOpacity: 1,
                        shadowRadius: 20,
                    }]}>
                        <Text className='font-extrabold p-4 dark:text-white capitalize'>{allProducts.product_title}</Text>
                        <Divider />
                        <View>
                            <Text className='font-semibold p-2 dark:text-white'>Size:</Text>
                            <FlatList horizontal data={size} key={(key) => key.product_id} renderItem={sizeRenderer} className='ml-7' />
                        </View>
                        <View>
                            <Text className='font-semibold p-2 dark:text-white'>Color:</Text>
                            <FlatList horizontal data={color} key={(key) => key.product_id} renderItem={colorRenderer} className='ml-7' />
                        </View>
                        <View>
                            <View className='flex flex-row items-center p-2'>
                                <Text className='p-3 dark:text-white'>Quantity: </Text>
                                <TextInput placeholder='1' onChangeText={(e) => quantity = e} className='p-3 my-2 w-12 text-center shadow border-[1px] border-gray-300 dark:text-white' maxLength={2} keyboardType='numeric' />
                            </View>
                        </View>
                        <View className='flex items-center p-2'>
                            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                                <Pressable className="rounded-lg" android_ripple={{ color: '#ccc' }} onPress={addtoCart}>
                                    <Text className='text-center p-4 dark:text-white'>Add to Cart</Text>
                                </Pressable>
                            </InsetShadow>
                        </View>
                    </ShadowTwo>
                </View>
                <View className='rounded-lg mx-2 mb-10'>
                    <ShadowTwo shadowColor={[styles.card, {
                        shadowOffset: { width: 4, height: -2 },
                        shadowColor: colorScheme === 'light' ? 'rgb(0,0,0,0.2)' : "#18140f",//white his could cause erros dynamically change css
                        shadowOpacity: 1,
                        shadowRadius: 20,
                    }]}>
                        <Text className='font-extrabold p-2 dark:text-white'>Product Details</Text>
                        <Divider />
                        <Text className='font-semibold my-2 p-2 dark:text-white'>Description:</Text>
                        <FlatList horizontal data={desc} key={(key) => key.product_id} renderItem={descRenderer} className='ml-7 mb-2' />
                    </ShadowTwo>
                </View>
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    //inset shadow
    shadow: {
        borderRadius: 25,
        // backgroundColor: "red" //dynamically change the colors dark/light
    },
    //shadow
    card: {
        marginRight: 100,
        backgroundColor: '#E7EBF0',//else
        borderRadius: 8,
        width: '100%',
        elevation: 20,
    },
    shadowProp: {//iphone
        shadowOffset: { width: 4, height: -2 },
        shadowColor: 'rgb(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowRadius: 20,
    }
})
export default ViewProduct




//     <View View className = "flex justify-between content-between items-start my-4 bg-white bg-opacity-0" >
//         <Text className="text-sm font-bold mr-9">SIZE</Text>
// {
//     size.map((size, index) => {
//         return (
//             <View
//                 key={index}
//                 className="flex content-start gap-2 flex-wrap w-full"
//             >
//                 <View className="capitalize">{size}</View>
//                 <View className="container w-fit">
//                     <input
//                         type="radio"
//                         name="size"
//                         className="input"
//                         onChange={(e) => handleChange((tempSize = size))}
//                     />
//                     <View className="checkmark"></View>
//                 </View>
//             </View>
//         )
//     })
// }
//                             </View >
//     <View className="flex justify-between content-between items-start bg-white bg-opacity-0">
//         <Text className="font-bold mr-5">COLOR</Text>
//         {color.map((color, index) => {
//             return (
//                 <View
//                     key={index}
//                     className="flex content-start gap-2 flex-wrap w-full"
//                 >
//                     <View
//                         className="h-[26px] w-[26px] rounded-full"
//                         style={{
//                             backgroundColor: `${color}`,
//                         }}
//                     ></View>
//                     <View className="container w-fit">
//                         <input
//                             type="radio"
//                             name="color"
//                             className="input"
//                             onChange={() => handleChange((tempColor = color))}
//                         />
//                         <View className="checkmark"></View>
//                     </View>
//                 </View>
//             )
//         })}
//     </View>






//     < Text className = "text-xl uppercase bg-white bg-opacity-0" >
//         Product Details
//                         </ >
// {
//     desc.map((desc, index) => {
//         return (
//             <Text
//                 key={index}
//                 className="ml-5 list-item list-decimal list-inside bg-white bg-opacity-0"
//             >
//                 {desc}
//             </Text>
//         )
//     })
// }
//     < Text className = "font-bold bg-white bg-opacity-0" > COLORS :</Text >
//     {
//         color.map((color, index) => {
//             return (
//                 <Text
//                     key={index}
//                     className="ml-5 list-item list-inside bg-white bg-opacity-0"
//                 >
//                     {color}
//                 </Text>
//             )
//         })
//     }
//         < Text className = "font-bold bg-white bg-opacity-0 text-left" >
//             SIZE :
//                         </Text >
// {
//     size.map((size, index) => {
//         return (
//             <Text
//                 key={index}
//                 className="ml-5 list-item list-inside bg-white bg-opacity-0"
//             >
//                 {size}
//             </Text>
//         )
//     })
// }