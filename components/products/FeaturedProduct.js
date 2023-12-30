import React from 'react'
import { ImageBackground, Pressable, Text, View } from 'react-native'
import { images } from '../../assets/Images'
import { useNavigation } from '@react-navigation/native'

function FeaturedProduct(props) {
    const products = props.products
    const navigation = useNavigation()
    function pressedHandler(product) {
        navigation.navigate('View', {
            product: product,
            title: product.product_title
        })
    }
    return (

        <View className="flex flex-row gap-3 justify-between items-center flex-wrap ">
            {products.map((product, index) => {
                let { _id, product_img1, product_id } = product

                return (
                    <Pressable onPress={() => pressedHandler(product)} key={index}>
                        <ImageBackground
                            source={images[product_id][index + 1]}
                            resizeMode='stretch'
                            className="flex items-end w-[120px] h-[150px] rounded-full shadow-lg"
                        >
                            <Text className="bg-green-500 p-1 rounded float-right text-right">
                                New
                            </Text>
                        </ImageBackground>
                    </Pressable>
                )
            })}
        </View>
    )
}


export default FeaturedProduct