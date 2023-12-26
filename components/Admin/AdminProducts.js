import { View, Text, ActivityIndicator, Alert } from 'react-native'
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
import { useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { getStorage, ref, listAll, deleteFile, deleteObject } from "firebase/storage"
import AsyncStorage from '@react-native-async-storage/async-storage'
import Slider from '@react-native-community/slider'

const demoProduct = [{
    "product_id": "255",
    "m_cat_id": "jacket",
    "w_cat_id": "jacket",
    "k_cat_id": "jacket",
    "p_cat_id": "jacket",
    "cat_id": "women",
    "date": "2021-04-10 15:34:21",
    "product_title": "ladies jackets",
    "product_img1": "jac1.jpg",
    "product_img2": "jac2.jpg",
    "product_img3": "jac3.jpg",
    "product_price": "25",
    "product_desc": "leader jacket",
    "product_keyword": "ladies jacket",
    "stock": "10",
    "product_rating": "1",
    "product_color": "black",
    "product_size": "xl, x, m, xxl",
    "product_isFeatured": true,
    "product_isLatest": false
}]
function Products(props) {
    const [products, setProducts] = useState([]) //update this
    const [loading, setIsLoading] = useState(true)//update this
    const [jacket, setJacket] = useState(1)
    const [dress, setDress] = useState(1)
    const [trouser, setTrouser] = useState(1)
    const [shirt, setShirt] = useState(1)
    const [tshirt, setTshirt] = useState(1)
    const [shoes, setShoes] = useState(1)
    async function filterHandler() {
        const categoryWeights = {//give admin control and save this as local data
            'jacket': jacket,//dobles that
            'shirt': shirt,
            't-shirt': tshirt,
            'shoes': shoes,
            'dress': dress,
            'trouser': trouser,
        }
        await AsyncStorage.setItem("WeightsAndBaises", JSON.stringify(categoryWeights))
        Alert.alert(
            "Receommendation",
            "Recommendation Sytem has been changed",
        )
    }

    useLayoutEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_HTTP_LINK}/product/getInventory`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                )
                setProducts(response.data.products)
                //console.log('shownig products');
                setIsLoading(false)
            } catch (error) {
                console.log(error, "OH NO or Axios 404")
            }
        }
        fetchData()
        // navigation.setOptions = {
        //     title: 'HomePAGE',
        // }
    }, [])
    async function pressedHandler(product) {
        console.log('i was here')
        const images = [product.product_img1, product.product_img1, product.product_img3]
        //const images = ['5265060765530143379_2048.jpg', '17192130095305642251_2048.jpg', '10100521308508491030_2048.jpg']
        try {
            const response = await axios.delete(
                `${process.env.REACT_APP_HTTP_LINK}/product/delete`, {
                params: {
                    id: product.product_id
                }
            }
            )
            if (response) {
                Alert.alert(
                    "Success!",
                    `${response.data.message}`,
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
                //Delete images from Firabase
                await Promise.all(images.map(async (path) => {
                    await deleteImage(path) // Wait for each image deletion before logging
                }))
                async function deleteImage(path) {
                    try {
                        const storage = getStorage()
                        const imageRef = ref(storage, path) // Create a reference to the image
                        await deleteObject(imageRef) // Delete the image
                        // console.log(`Image "${path}" deleted successfully!`);
                    } catch (error) {
                        console.error(`Error deleting files:`, error)
                    }
                }
            }
        } catch (error) {
            console.log(error, "OH NO or Axios 404")
        }
    }
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
                                <View className='flex flex-row w-full justify-center my-3'>
                                    <InsetShadow containerStyle={{ borderRadius: 8 }}>
                                        <Pressable onPress={() => pressedHandler(e)}
                                            className="bg-opacity-0 flex flex-row justify-center items-center content-center text-center py-3 px-4 rounded-lg" android_ripple={{ color: '#ccc' }}
                                        >
                                            <FontAwesome name="trash" size={24} color="black" />
                                            <Text className='p-1 text-lg'> Delete</Text>
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
        !loading ? <View>
            <View className='px-4 h-32 my-2'>
                <InsetShadow containerStyle={{ borderRadius: 8 }} >
                    <Text className='p-4 text-lg'>
                        Total Products in Store: {products.length}
                    </Text>
                    <Text className='p-4 text-lg'>
                        Total Products in Stock: {products.map(product => parseInt(product.stock)).reduce((acc, quantity) => acc + quantity, 0)}
                    </Text>
                </InsetShadow>
            </View>
            <View>
                <View className='h-96 mx-4 mb-4'>
                    <InsetShadow containerStyle={{ borderRadius: 8 }}>
                        <View>
                            <Text className='p-3 text-lg text-center'>Recommedation System</Text>
                            <View className='flex flex-row justify-center content-center items-center'>
                                <Text>Jacket</Text>
                                <Slider
                                    style={{ width: 200, height: 40, marginLeft: 5 }}
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(e) => { setJacket(parseInt(e)) }}
                                />
                            </View>
                            <View className='flex flex-row justify-center content-center items-center'>
                                <Text>Dress</Text>
                                <Slider
                                    style={{ width: 200, height: 40, marginLeft: 10 }}
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(e) => { setDress(parseInt(e)) }}
                                />
                            </View>
                            <View className='flex flex-row justify-center content-center items-center'>
                                <Text>Shoes</Text>
                                <Slider
                                    style={{ width: 200, height: 40, marginLeft: 10 }}
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(e) => { setShoes(parseInt(e)) }}
                                />
                            </View>
                            <View className='flex flex-row justify-center content-center items-center'>
                                <Text>Shirt</Text>
                                <Slider
                                    style={{ width: 200, height: 40, marginLeft: 19 }}
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(e) => { setShirt(parseInt(e)) }}
                                />
                            </View>
                            <View className='flex flex-row justify-center content-center items-center'>
                                <Text>T-shirt</Text>
                                <Slider
                                    style={{ width: 200, height: 40, marginLeft: 10 }}
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(e) => { setTshirt(parseInt(e)) }}
                                />
                            </View>
                            <View className='flex flex-row justify-center content-center items-center'>
                                <Text>Trouser</Text>
                                <Slider
                                    style={{ width: 200, height: 40, marginLeft: 4 }}
                                    minimumValue={1}
                                    maximumValue={10}
                                    step={1}
                                    minimumTrackTintColor="#FFFFFF"
                                    maximumTrackTintColor="#000000"
                                    onValueChange={(e) => { setTrouser(parseInt(e)) }}
                                />
                            </View>
                            <View className='flex flex-row justify-center content-center items-center my-3'>
                                <InsetShadow>
                                    <Pressable onPress={() => { filterHandler() }}>
                                        <Text className='p-4 text-lg'>Apply Changes</Text>
                                    </Pressable>
                                </InsetShadow>
                            </View>
                        </View>
                    </InsetShadow>
                </View>
            </View>
            <View>
                {products.map((e) => itemRenderer(e))}
            </View>
        </View> :
            (<View><ActivityIndicator size="small" color="green" /></View>)
        //FlatList was clashing with scrollview needed to be horizotal={true} // but we don't need horizontal 
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


/*

<View className='px-2'>
<InsetShadow containerStyle={{ borderRadius: 8 }} >
    <Text className='p-4 text-lg'>
        Total Products in Store:
    </Text>
    <Text className='p-4 text-lg'>
        Total Products in Stock:
    </Text>
</InsetShadow>
</View>
*/