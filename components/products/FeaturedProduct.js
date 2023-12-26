import React from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { images } from '../../assets/Images'

function FeaturedProduct(props) {
    const products = props.products
    return (

        <View className="flex flex-row gap-3 justify-between items-center flex-wrap ">
            {products.map((product, index) => {
                let { _id, product_img1, product_id } = product

                return (
                    <ImageBackground
                        key={index}
                        source={images[product_id][index + 1]}
                        resizeMode='stretch'
                        className="flex items-end w-[120px] h-[150px] rounded-full shadow-lg"
                    >
                        <Text className="bg-green-500 p-1 rounded float-right text-right">
                            New
                        </Text>
                    </ImageBackground>
                )
            })}
        </View>
    )
}


export default FeaturedProduct