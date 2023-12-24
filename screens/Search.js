import { useLayoutEffect, useState } from "react"
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import InsetShadow from "react-native-inset-shadow"
import { SafeAreaView } from "react-native-safe-area-context"
import Shadow from "../components/ui/Shadow"
import axios from "axios"
import Products from "../components/products/Products"
import { ScrollView } from "react-native-gesture-handler"

function Search({ navigation }) {
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState()
    const [loading, setLoading] = useState(false)

    function SearchStore() {
        setLoading(true)
        async function fetchData() {
            //const session = await loadSession()
            try {
                let response
                response = await axios.get(
                    `${process.env.REACT_APP_HTTP_LINK}/search`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            data: search,
                        }
                    }
                )
                setProducts(response.data.product)
                setLoading(false)

            } catch (error) {
                console.log(error, "404. error")
            }
        }
        fetchData()
    }
    return (<SafeAreaView className=''>
        <ScrollView>
            <View className='flex flex-col mx-4'>
                <View className='flex flex-row my-2 mx-2'>
                    <InsetShadow containerStyle={{ borderRadiusLeft: 8 }}>
                        <TextInput
                            type='text'
                            className='p-2 dark:placeholder-white dark:text-black w-60'
                            placeholder='Search'
                            onChangeText={(e) => setSearch(e)}
                        />
                    </InsetShadow>
                    <InsetShadow containerStyle={{ borderRadiusRight: 8 }}>
                        <View>
                            <Pressable onPress={() => SearchStore()}
                                className=" bg-opacity-0 flex flex-row py-2 px-4 rounded-r-lg h-12 justify-center items-center" android_ripple={{ color: '#ccc' }}
                            >
                                <Text className='text-center'>Search</Text>
                            </Pressable>
                        </View>
                    </InsetShadow>
                </View>
                {!loading ? <View >
                    <Text className='text-xl mb-2'>Results Found: {!!products ? products.length : 0}</Text>
                    {!!products ? <Products products={products} /> : <View></View>}
                </View> : <ActivityIndicator size="small" color="green" />}
            </View>
        </ScrollView>
    </SafeAreaView>)
}

export default Search