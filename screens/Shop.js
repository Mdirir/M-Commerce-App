import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLayoutEffect } from 'react'
import { ActivityIndicator, Alert, Pressable, View } from 'react-native'
import { Text } from 'react-native'
import Products from '../components/products/Products'
import { ShopConsumer } from '../store/context'
import { Ionicons } from "@expo/vector-icons"
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import InsetShadow from 'react-native-inset-shadow'
import ShadowInset from '../components/ui/ShadowInset'
import { Divider } from 'react-native-paper'
import ShopProducts from '../components/products/ShopProducts'
import { useColorScheme } from 'nativewind'

function Shop({ navigation }) {
    const { colorScheme, toggleColorScheme } = useColorScheme()
    async function loadSession() {
        const sessionn = await AsyncStorage.getItem("Session")
        return JSON.parse(sessionn)
        // console.log(session, "ln 15");
    }
    const context = ShopConsumer()
    const { state, setSearchTerm } = context
    let headers
    const [modal, setModal] = useState(false)
    const [userSelectedCatType, setUserSelectedCatType] = useState()
    const [userSelectedCategory, setUserSelectedCategory] = useState()
    const [userSelectedPage, setUserSelectedPage] = useState()
    //
    const [products, setProducts] = useState()
    let [PaginateArray, setPaginateArray] = useState()
    const [page, setPage] = useState(1)
    const [loadingPagination, setLoadingPagination] = useState(false)
    // let [totalPages, setTotalPages] = useState()
    // let [tempCatType, setTempCatType] = useState()
    const [catType, setCatType] = useState()
    let [tempCategoryType, setTempcategoryType] = useState() //[new,women]
    const [categoryType, setCategoryType] = useState("") //jacker/dress
    const [category, setCategory] = useState("") //new,men
    //buffer
    // console.log(categoryType, ", tpye,", category,", cat");

    const term = ""
    const termtwo = ""
    useLayoutEffect(() => {
        setLoadingPagination(true)
        async function fetchData() {
            const session = await loadSession()
            if (session) {
                try {
                    let response
                    response = await axios.get(
                        `${process.env.REACT_APP_HTTP_LINK}/product/shop?page=${page}&categoryType=${categoryType}&category=${category}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer " + session.token,
                            }
                        }
                    )
                    setProducts(response.data.product)
                    setLoadingPagination(false)
                    // setTotalPages(response.data.totalPages)
                    let tempTotalPages = response.data.totalPages
                    setCatType(response.data.catType)
                    // let tempdata = response.data.category
                    // tempdata.unshift("new")
                    setTempcategoryType(response.data.category)
                    resultsFound = response.data.noOfhits
                    const paginateArr = []
                    for (let index = 0; index < tempTotalPages; index++) {
                        paginateArr.push(index)
                    }
                    setPaginateArray(paginateArr)
                } catch (error) {
                    if (error.message.includes('401')) {
                        //Check if session expires and redirect page
                        Alert.alert(
                            "Session Expired!",
                            `${'Ununauthorized Access'}`,
                            [
                                {
                                    text: "Cancel",
                                    onPress: () => {
                                        //remove screen from stack
                                        navigation.pop()
                                    },
                                    style: "cancel"
                                },
                                {
                                    text: "OK", onPress: () => {
                                        //redirect page to auth
                                        navigation.navigate('Auth', {
                                            routeName: 'RequestAuthAccess',//send this so we know what kind authentication request is this
                                        })
                                    },
                                    style: "destructive"
                                }
                            ]
                        )
                    }
                    // console.log("404. Please Login")
                }
            } else {
                //if the user is guest
                Alert.alert(
                    "Ununauthorized Access!",
                    `${'Please Sign in or Register to browse Shop'}`,
                    [
                        {
                            text: "Cancel",
                            onPress: () => {
                                //remove screen from stack
                                navigation.pop()
                            },
                            style: "cancel"
                        },
                        {
                            text: "OK", onPress: () => {
                                //redirect page to auth
                                navigation.navigate('Auth', {
                                    routeName: 'RequestAuthAccess',//send this so we know what kind authentication request is this
                                })
                            },
                            style: "destructive"
                        }
                    ]
                )

            }
        }
        fetchData()
    }, [page, categoryType, category])
    // console.log(totalPages);
    // console.log(catType);
    // console.log(tempCategoryType);
    // const [tempSize, setTempSize] = useState()
    // const [tempColor, setTempColor] = useState()
    // const [modal, setModal] = useState(false)
    // const paginateArr = [1, 2, 3, 4, 5, 6, 7]
    // const catType = ['shirt', 'dress', 'T-shirt']
    // const tempCategoryType = ['men', 'women', 'kids']
    const handleChange = (data, type) => {//data=jacket
        if (type === 'categoryType') {
            userSelectedCatType === "" ? setUserSelectedCatType(data) : data === userSelectedCatType ? setUserSelectedCatType("") : setUserSelectedCatType(data)
        } else if (type === 'category') {
            userSelectedCategory === "" ? setUserSelectedCategory(data) : data === userSelectedCategory ? setUserSelectedCategory("") : setUserSelectedCategory(data)
        } else {//pagination
            setUserSelectedPage(data)
            setPage(userSelectedPage + 1)
        }
    }
    function handleFilters() {
        if (userSelectedCatType) setCategoryType(userSelectedCatType)
        if (userSelectedCategory) setCategory(userSelectedCategory)
    }
    function categoryTypeRenderer(e) {
        return (
            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8, marginRight: 12 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <Pressable onPress={() => handleChange(e.item, 'categoryType')} android_ripple={{ color: '#ccc' }} className={`${userSelectedCatType === e.item ? 'border-[1px] border-purple-500 rounded-lg' : ''}`}>
                    <Text className='mx-2 p-3 capitalize dark:text-white'>{e.item}</Text>
                </Pressable>
            </InsetShadow>
        )
    }
    function categoryRenderer(e) {
        return (
            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8, marginRight: 12 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <Pressable onPress={() => handleChange(e.item, 'category')} android_ripple={{ color: '#ccc' }} className={`${userSelectedCategory === e.item ? 'border-[1px] border-purple-500 rounded-lg' : ''}`}>
                    <Text className='mx-2 p-3 capitalize dark:text-white'>{e.item}</Text>
                </Pressable>
            </InsetShadow>
        )
    }
    function paginationRenderer(e) {
        return (
            <InsetShadow containerStyle={{ flex: 1, borderRadius: 8, marginRight: 12 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <Pressable onPress={() => handleChange(e.item, 'pagination')} android_ripple={{ color: '#ccc' }} className={`${userSelectedPage === e.item ? 'border-[1px] border-purple-500 rounded-lg' : ''}`}>
                    <Text className='mx-2 p-2 dark:text-white'>{e.item + 1}</Text>
                </Pressable>
            </InsetShadow>
        )
    }
    // console.log(PaginateArray);
    return (
        <View className="flex-1 mb-10 bg-red-inherit dark:bg-colorDark">
            <InsetShadow containerStyle={{ borderRadius: 8, marginRight: 12, height: 'auto' }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <View className="mb-3">
                    <View className='flex flex-row justify-between items-center mx-2'>
                        <Text className="text-lg font-bold p-2 dark:text-white">Filters</Text>
                        <Pressable android_ripple={{ color: "#ccc" }} onPress={() => setModal(!modal)}>
                            <Ionicons name="filter-sharp" size={24} color="black" />
                        </Pressable>
                    </View>
                    <View className={`${modal ? "block" : "hidden"}`}>
                        <View>
                            <Text className='font-semibold p-2 dark:text-white'>Category Type</Text>
                            <Divider />
                            <FlatList horizontal data={tempCategoryType} key={(key) => key.product_id} renderItem={categoryRenderer} className=' mt-2 ml-7 mb-2' />
                        </View>
                        <View>
                            <Text className='font-semibold p-2 dark:text-white'>Category</Text>
                            <Divider />
                            <FlatList horizontal data={catType} key={(key) => key.product_id} renderItem={categoryTypeRenderer} className=' mt-2 ml-7 mb-2' />
                        </View>
                        <Pressable className='my-5 flex flex-row justify-center rounded-lg mx-2' onPress={handleFilters} android_ripple={{ color: '#ccc' }}>
                            <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                                <View className='flex flex-row mx-3'>
                                    <Text className='text-lg p-3 rounded-lg text-center dark:text-white'>Apply Filters</Text>
                                    {loadingPagination ? <ActivityIndicator size="small" color="green" /> : ""}
                                </View>
                            </InsetShadow>
                        </Pressable>
                    </View>
                </View>
            </InsetShadow>
            <View>
                <FlatList horizontal data={PaginateArray} key={(key) => key} renderItem={paginationRenderer} className='mt-2 ml-7 mb-2' />
            </View>
            <View className="mb-5">
                {products ? (
                    <ShopProducts products={products} />
                ) : (
                    <ActivityIndicator size="small" color="green" />
                )}
            </View>
        </View>
    )
}

export default Shop