import React from 'react'
import { Alert, FlatList, ImageBackground, Pressable, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ShopConsumer } from '../store/context'
import InsetShadow from 'react-native-inset-shadow'
import { images } from '../assets/Images'
import { FontAwesome5 } from '@expo/vector-icons'
import { inherit } from 'tailwindcss/colors'
import { GlobalStyles } from '../components/theme/Colors'
import Payment from '../components/Payment/Payment'

let selectedProduct
function Cart({ navigation }) {
    const context = ShopConsumer()
    const { state, setSearchTerm, cartRemoval } = context

    function removefromCart(selectedProduct, selectedProductPrice, selectedProductSize, selectedProductColor) {
        cartRemoval(
            selectedProduct,
            selectedProductPrice,
            selectedProductSize,
            selectedProductColor
        )
        //console.log(selectedProduct)
    }
    function itemRenderer(e) {
        return (
            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8, marginRight: 10, marginBottom: 5, }} shadowRadius={120} elevation={10}>
                <View className='flex flex-1 flex-row justify-between items-center rounded-lg mt-2 p-1 mb-1'>
                    <ImageBackground
                        source={images[e.item.product_id][1]}
                        resizeMode='cover'
                        className="h-[90px] rounded-t-lg z-10 w-20 ml-1"
                    />
                    <View className='flex w-10 items-center'>
                        <Text className='capitalize dark:text-white'>{e.item.color}</Text>
                        <Text className='capitalize dark:text-white'>{e.item.size}</Text>
                        <Text className='capitalize dark:text-white'>{e.item.quantity}</Text>
                        <Text className='capitalize dark:text-white'>$ {e.item.product_price * e.item.quantity}</Text>
                    </View>
                    <Pressable className='mr-2' android_ripple={{ color: '#ccc' }} onPress={() =>
                        Alert.alert(
                            "Careful!",
                            "Are you sure you want to delete this item",
                            [
                                {
                                    text: "Cancel",
                                    style: "cancel"
                                },
                                { text: "OK", onPress: () => removefromCart(e.item, (e.item.product_price * e.item.quantity), e.item.size, e.item.size) }
                            ]
                        )
                    }>
                        <FontAwesome5 name="trash" size={24} color="purple" />
                    </Pressable>
                </View>
            </InsetShadow>
        )
    }
    return (
        <View className='rounded-lg p-2 flex flex-col justify-between flex-1 '>
            <View>
                < Text className='font-extrabold py-3 dark:text-white' > Total Items In Cart: {state.inCart}</ Text>
                <FlatList data={state.product} key={(key) => key.product_id} renderItem={itemRenderer} className='ml-2 rounded-lg' />
            </View>
            <View className='h-16'>
                <Payment userName={state.session.user.name} product_title={state.product[0] ? state.product[0].product_title : 0} totalPrice={state.totalPrice} allProducts={state.product} />
            </View>
        </View >
    )
}

export default Cart


// <>
//         <Pressable onPress={saveData}><Text>Save Data</Text></Pressable>
//         <Pressable onPress={loadData}><Text>Load Data</Text></Pressable>
//     </>