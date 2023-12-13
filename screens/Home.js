import Shadow from '../components/ui/Shadow'
import { StyleSheet, Text, View } from 'react-native'
import { useLayoutEffect, useState } from 'react';
import axios from "axios"
import FeaturedProduct from '../components/products/FeaturedProduct';
import Products from '../components/products/Products';

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
        <View className='flex-1'>

            <Shadow shadowColor={[styles.card, styles.shadowProp]}>
                <Text style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    fontWeight: 'bold',
                }}>
                    Featured Products
                </Text>
            </Shadow>
            <View className='mx-1'>
                {products ? <FeaturedProduct products={products.featuredProducts} /> : ""}
            </View>
            <Shadow shadowColor={[styles.card, styles.shadowProp]}>
                <Text style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    fontWeight: 'bold',
                }}>
                    Latest Products
                </Text>
            </Shadow>
            {products ? (
                <Products products={products.latestProducts.slice(0, 12)} />
            ) : (
                ""
            )}
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
        width: '100%',
        marginVertical: 20,
        marginHorizontal: 20,
        elevation: 20,
    },
    shadowProp: {//iphone
        shadowOffset: { width: 4, height: -2 },
        shadowColor: 'rgb(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowRadius: 20,
    }
})
export default Home

