import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Pressable } from 'react-native'
import { ImageBackground } from 'react-native'
import { images } from '../../assets/Images'
import { FlatList } from 'react-native-gesture-handler'
import InsetShadow from 'react-native-inset-shadow'
import { color } from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import Shadow from '../ui/Shadow'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'

function ShopProducts(props) {
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const navigation = useNavigation()
    function pressedHandler(product) {
        navigation.navigate('View', {
            product: product,
            title: product.product_title
        })
    }
    let products = props.products
    function getRating(rating) {
        if (rating === "1") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <FontAwesome5 name="star-half-alt" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else if (rating === "1.5") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <FontAwesome5 name="star-half-alt" size={24} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else if (rating === "2") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else if (rating === "2.5") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <FontAwesome5 name="star-half-alt" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else if (rating === "3") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else if (rating === "3.5") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <FontAwesome5 name="star-half-alt" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else if (rating === "4") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="staro" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else if (rating === "4.5") {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <FontAwesome5 name="star-half-alt" size={24} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        } else {
            return (
                <>
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                    <AntDesign name="star" size={16} color={colorScheme === "light" ? "black" : "white"} />
                </>
            )
        }
    }
    function itemRenderer(e) {
        const rating = getRating(e.item.product_rating)
        return (
            <View className="h-auto flex flex-1 gap-2 mb-4">
                <View>
                    <Shadow shadowColor={[styles.card, {
                        shadowOffset: { width: 4, height: -2 },
                        shadowColor: colorScheme === 'light' ? 'rgb(0,0,0,0.2)' : "#18140f",//white his could cause erros dynamically change css
                        shadowOpacity: 1,
                        shadowRadius: 20,
                    }]
                    }>
                        <ImageBackground
                            // key={index}
                            source={images[e.item.product_id][1]}
                            resizeMode='cover'
                            className="w-fit h-[185px] bg-cover bg-no-repeat rounded-t-lg"
                        />
                        {/* <View className={styles.View}> */}
                        <View className="grid items-center text-center rounded-b-lg">
                            <Text className="capitalize text-sm font-medium bg-opacity-0 mt-1 dark:text-white">
                                {e.item.product_title}
                            </Text>
                            <Text className="capitalize text-xl flex justify-center">
                                {rating}
                            </Text>
                            <Text className="capitalize text-sm font-medium  bg-opacity-0 dark:text-white">
                                $ {e.item.product_price}
                            </Text>
                            <View className="flex-1 flex-row justify-between content-between bg-opacity-0 mb-2 mx-2">
                                <View className='flex flex-row w-full justify-between'>
                                    <View className='rounded-lg'>
                                        <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                            <Pressable onPress={() => pressedHandler(e.item)}
                                                className=" bg-opacity-0 flex flex-row justify-center items-center content-center text-center p-1 mx-1 rounded-[8px]" android_ripple={{ color: '#ccc' }}
                                            >
                                                <FontAwesome5 name="eye" size={16} color={colorScheme === "light" ? "black" : "white"} />
                                                <Text className='p-2'> View</Text>
                                            </Pressable>
                                        </InsetShadow>
                                    </View>
                                    <View className='rounded-lg'>
                                        <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                            <Pressable onPress={() => pressedHandler(e.item)}
                                                className="bg-opacity-0 flex flex-row justify-center items-center content-center text-center p-1 mx-1 rounded-[8px]" android_ripple={{ color: '#ccc' }}
                                            >
                                                <FontAwesome name="shopping-cart" size={16} color={colorScheme === "light" ? "black" : "white"} />
                                                <Text className='p-2'> Cart</Text>
                                            </Pressable>
                                        </InsetShadow>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Shadow >
                </View >
            </View >
        )
    }
    return (
        //render item and map are different
        <View className='mb-14'>
            <FlatList data={products} key={(key) => key.product_id} renderItem={itemRenderer} numColumns={2} />
        </View>
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
        width: '96%',
        elevation: 20,
    },
    shadowProp: {//iphone
        shadowOffset: { width: 4, height: -2 },
        shadowColor: 'rgb(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowRadius: 20,
    }
})

export default ShopProducts