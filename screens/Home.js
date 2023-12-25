import Shadow from '../components/ui/Shadow'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useLayoutEffect, useState } from 'react'
import axios from "axios"
import FeaturedProduct from '../components/products/FeaturedProduct'
import Products from '../components/products/Products'
import { ScrollView } from 'react-native'
import InsetShadow from 'react-native-inset-shadow'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Home({ navigation }) {
    const [products, setProducts] = useState()
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
                //check if there was user puchaseHistory
                const purchase = await AsyncStorage.getItem("UserPurchaseHisory")
                const UserPurchaseHisory = JSON.parse(purchase)
                console.log(UserPurchaseHisory[0]['simp'].map((i, index) => console.log(i)), 'jj')
            } catch (error) {
                console.log(error, "OH NO or Axios 404")
            }
        }
        fetchData()
        navigation.setOptions = {
            title: 'HomePAGE',
        }
    }, [])
    return (//Scrollview
        <ScrollView className='flex-1'>
            <View className='mx-2'>
                <InsetShadow containerStyle={{ marginVertical: 12, borderRadius: 8, height: 50 }}>
                    <Text style={{
                        paddingVertical: 14,
                        paddingHorizontal: 14,
                        fontWeight: 'bold',
                        borderRadius: 12
                    }}>
                        Featured Products
                    </Text>
                </InsetShadow></View>
            <View className='mx-1'>
                {products ? <FeaturedProduct products={products.featuredProducts} /> : <ActivityIndicator size="small" color="green" />}
            </View>
            <View className='mx-2'>
                <InsetShadow containerStyle={{ marginVertical: 12, borderRadius: 8, height: 50 }}>
                    <Text style={{
                        paddingVertical: 14,
                        paddingHorizontal: 14,
                        fontWeight: 'bold',
                        width: '100%',
                        borderRadius: 12
                    }}>
                        Latest Products
                    </Text>
                </InsetShadow></View>
            {products ? (
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

