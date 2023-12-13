import { View, Text } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { ImageBackground } from 'react-native';
import { images } from '../../assets/Images';
import { FlatList } from 'react-native-gesture-handler';
import InsetShadow from 'react-native-inset-shadow';
import { color } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import Shadow from '../ui/Shadow';
import { useNavigation } from '@react-navigation/native';

function Products(props) {
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
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <FontAwesome5 name="star-half-alt" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                </>
            )
        } else if (rating === "1.5") {
            return (
                <>
                    <AntDesign name="star" size={16} color="black" />
                    <FontAwesome5 name="star-half-alt" size={24} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                </>
            )
        } else if (rating === "2") {
            return (
                <>
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                </>
            )
        } else if (rating === "2.5") {
            return (
                <>
                    <AntDesign name="star" size={24} color="black" />
                    <FontAwesome5 name="star-half-alt" size={24} color="black" />
                    <AntDesign name="staro" size={24} color="black" />
                    <AntDesign name="staro" size={24} color="black" />
                    <AntDesign name="staro" size={24} color="black" />
                </>
            )
        } else if (rating === "3") {
            return (
                <>
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                </>
            )
        } else if (rating === "3.5") {
            return (
                <>
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <FontAwesome5 name="star-half-alt" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                </>
            )
        } else if (rating === "4") {
            return (
                <>
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="staro" size={16} color="black" />
                </>
            )
        } else if (rating === "4.5") {
            return (
                <>
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <FontAwesome5 name="star-half-alt" size={24} color="black" />
                </>
            )
        } else {
            return (
                <>
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                    <AntDesign name="star" size={16} color="black" />
                </>
            )
        }
    }
    function itemRenderer(e) {
        const rating = getRating(e.product_rating)
        return (
            <View className="h-auto flex flex-1 gap-2 mb-2  ml-3" key={e.product_id}>
                <View>
                    <Shadow shadowColor={[styles.card, styles.shadowProp]}>
                        <ImageBackground
                            // key={index}
                            source={images[e.product_id][1]}
                            resizeMode='cover'
                            className="w-fit h-[285px] bg-cover bg-no-repeat rounded-t-lg"
                        />
                        {/* <View className={styles.View}> */}
                        <View className="grid items-center text-center rounded-b-lg dark:bg-colorDark">
                            <Text className="capitalize text-sm font-medium bg-opacity-0 mt-1 dark:text-white">
                                {e.product_title}
                            </Text>
                            <Text className="capitalize text-xl flex justify-center">
                                {rating}
                            </Text>
                            <Text className="capitalize text-sm font-medium  bg-opacity-0 dark:text-white">
                                $ {e.product_price}
                            </Text>
                            <View className="flex-1 flex-row justify-between content-between bg-opacity-0 mb-2 mx-2">
                                <View className='flex flex-row w-full justify-between'>

                                    <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                        <Pressable onPress={() => pressedHandler(e)}
                                            className=" bg-opacity-0 flex flex-row justify-center items-center content-center text-center py-2 px-3 rounded-lg" android_ripple={{ color: '#ccc' }}
                                        >
                                            <FontAwesome5 name="eye" size={24} color="black" />
                                            <Text className='p-2'> View</Text>
                                        </Pressable>
                                    </InsetShadow>
                                    <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                        <Pressable onPress={() => pressedHandler(e)}
                                            className="bg-opacity-0 flex flex-row justify-center items-center content-center text-center py-2 px-4 rounded-lg" android_ripple={{ color: '#ccc' }}
                                        >
                                            <FontAwesome name="shopping-cart" size={24} color="black" />
                                            <Text className='p-2'> Cart</Text>
                                        </Pressable>
                                    </InsetShadow>
                                </View>
                            </View>
                        </View>
                    </Shadow>
                </View>
            </View>
        )
    }
    return (
        //<FlatList data={products} keyExtractor={(key) => key.product_id.toString()} renderItem={itemRenderer} numColumns={2} nestedScrollEnabled/>
        products.map((e)=>itemRenderer(e)) //FlatList was clashing with scrollview needed to be horizotal={true} // but we don't need horizontal 
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

export default Products