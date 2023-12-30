import Shadow from '../components/ui/Shadow'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import axios from "axios"
import FeaturedProduct from '../components/products/FeaturedProduct'
import Products from '../components/products/Products'
import { ScrollView } from 'react-native'
import InsetShadow from 'react-native-inset-shadow'
import AsyncStorage from '@react-native-async-storage/async-storage'
import DUMMYPRODUCTS from '../DummyPoducts'
import Payment from '../components/Payment/Payment'
import { useColorScheme } from 'nativewind'

function Home({ navigation }) {
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const [products, setProducts] = useState()
    const [tailoredProducts, setTailoredProducts] = useState()

    useLayoutEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_HTTP_LINK}/product/view`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                )
                setProducts(response.data.showcaseProduct)
                //Now Call all store products
                const responseStore = await axios.get(
                    `${process.env.REACT_APP_HTTP_LINK}/product/getInventory`,
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    }
                )
                //setProducts(responseStore.data.products)
                //Add Recommendation System

                //console.log(responseStore.data.products)
                const purchase = await AsyncStorage.getItem("UserPurchaseHisory")
                const UserPurchaseHisory = JSON.parse(purchase) ///IF THIS GUY IS MEPTY CANCEL THE WHOLE PROCESS
                if (UserPurchaseHisory) {
                    console.log(UserPurchaseHisory[0]['simp'].map((i, index) => console.log(i)), 'ABCDE')

                    const weights = await AsyncStorage.getItem("WeightsAndBaises") //Admin sets them app
                    const categoryWeights = JSON.parse(weights)
                    //Logic 3 jacket found in purchaseHitory = 3 X jacket bais (3) = 3x3=9 items if possible.
                    console.log(categoryWeights)
                    /*const categoryWeights = {//give admin control and save this as local data
                        'jacket': 2,//dobles that
                        'shirt': 2,
                        't-shirt': 1,
                        'shoes': 1,
                        'dress': 1,
                        'trouser': 1,
                    }*/
                    //
                    // Calculate user preferences based on purchase history
                    const userPreferences = UserPurchaseHisory[0]['simp'].reduce((preferences, sale) => {
                        const { product_category } = sale
                        preferences[product_category] =
                            (preferences[product_category] || 0) + categoryWeights[product_category]
                        return preferences
                    }, {})

                    // Sort products based on user preferences
                    //console.log(userPreferences)
                    const recommendedProducts = responseStore.data.products
                        .filter((product) => userPreferences[product.p_cat_id]) // Filter out already purchased categories
                        .sort(
                            (a, b) =>
                                (userPreferences[b.category] || 0) - (userPreferences[a.category] || 0)
                        )
                    //console.log(recommendedProducts.length)
                    //Randomize Results so they don't get repetetive
                    const shuffledArray = recommendedProducts.slice()

                    for (let i = shuffledArray.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
                    }
                    //don't set if there products to recommend
                    setTailoredProducts(shuffledArray.slice(0, 12))//just limit the displayed results upto 12 
                }
            } catch (error) {
                console.log(error, "OH NO or Axios 404")
            }
        }

        fetchData()
        navigation.setOptions = {
            title: 'HomePAGE',
        }
    }, [])
    return (
        <ScrollView className='flex-1'>
            <View className='mx-2'>
                <InsetShadow containerStyle={{ marginVertical: 12, borderRadius: 8, height: 50 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                    <Text className="p-4 font-bold rounded-[8px] dark:text-white">
                        Featured Products
                    </Text>
                </InsetShadow></View>
            <View className='mx-1'>
                {products ? <FeaturedProduct products={products.featuredProducts} /> : <ActivityIndicator size="small" color="green" />}
            </View>
            <View className='mx-2 my-4'>
                <InsetShadow containerStyle={{ borderRadius: 8, height: 50 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                    <Text className="p-4 font-bold rounded-[8px] dark:text-white">
                        {tailoredProducts ? 'Recommended Products' : 'Latest Products'}
                    </Text>
                </InsetShadow></View>
            {tailoredProducts ? <Products products={tailoredProducts} /> : products ? (
                <Products products={products.latestProducts.slice(0, 12)} />
            ) : (
                <ActivityIndicator size="small" color="green" />
            )}
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
        //marginRight: 100,
        backgroundColor: '#E7EBF0',//else
        borderRadius: 12,
        width: '100%',
        marginVertical: 20,
        //marginHorizontal: 20,
        elevation: 20,
        position: 'relative'
    },
    shadowProp: {//iphone
        shadowOffset: { width: 4, height: -2 },
        shadowColor: 'rgb(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowRadius: 20,
    }
})
export default Home




