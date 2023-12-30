import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native"
import InsetShadow from "react-native-inset-shadow"
import { ShopConsumer } from "../../store/context"
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native"
import { useEffect, useState } from "react"
import axios from "axios"
import { useColorScheme } from "nativewind"

function Payment(props) {
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const { initPaymentSheet, presentPaymentSheet } = usePaymentSheet()
    const navigation = useNavigation()
    const context = ShopConsumer()
    const { updateState } = context
    const [paymentPrepration, setPaymentPrepration] = useState(false) //incase server side failure
    const [loading, setLoading] = useState(false)

    //Remove Reccommendation
    async function resetCart() {
        const ress = await AsyncStorage.getItem("products")
        const res = JSON.parse(ress)
        //reset Everything
        res.inCart = 0
        res.product = []
        res.totalPrice = 0
        try {
            await updateState(res)
        } catch (error) {
            console.log('error resseting the cart', error)
        }
    }
    async function handlePayment() {
        //username
        //add to existing userhistory if any
        const UserProducts = [{
            [props.userName]: props.allProducts
        }]
        // console.log(UserProducts['simp']);
        try {
            const purchase = await AsyncStorage.getItem("UserPurchaseHisory")
            const UserPurchaseHisory = JSON.parse(purchase)
            //console.log(UserPurchaseHisory)
            if (!!UserPurchaseHisory) {
                //check if there is user
                //console.log(UserPurchaseHisory[0]['simp'].map((i, index) => console.log(i)), 'STOREEE')
                // Iterate through each object in the new array
                UserProducts.forEach((newItem, index) => {
                    // Iterate through each key in the object
                    Object.keys(newItem).forEach(key => {
                        // Find the corresponding array in the existing array based on the key
                        const existingItem = UserPurchaseHisory.find(item => item[key]) //Simp
                        if (existingItem) {
                            // Get the index of the array in the existing array
                            const arrayIndex = UserPurchaseHisory.indexOf(existingItem)

                            // Iterate through the new array and update or append values
                            newItem[key].forEach(newProduct => { //simp.map
                                const existingProductIndex = UserPurchaseHisory[index][key].findIndex(existingProduct => existingProduct.product_id === newProduct.product_id)
                                //console.log(existingProductIndex, 'exissss')
                                //console.log(newProduct.product_id, 'exissss')

                                if (existingProductIndex !== -1) {
                                    // If product already exists, update values
                                    UserPurchaseHisory[arrayIndex][key][existingProductIndex] = newProduct
                                } else {
                                    //console.log(' i was here')
                                    // If product does not exist, append to the array
                                    UserPurchaseHisory[arrayIndex][key].push(newProduct)
                                }
                            })
                        } else {
                            // IUserProductsf no corresponding array is found, simply push the entire new item
                            UserPurchaseHisory.push({ [key]: newItem[key] }) //Simp
                        }
                    })
                })
                //console.log(UserPurchaseHisory[0]['simp'].map((i, index) => console.log(i)), 'AAaaaaaaaaaaaa')
                //console.log(UserProducts, 'yyyyy')
                await AsyncStorage.setItem("UserPurchaseHisory", JSON.stringify(UserPurchaseHisory))
                //then clear out store state cart
                resetCart()
            } else {
                //if no history just create
                await AsyncStorage.setItem("UserPurchaseHisory", JSON.stringify(UserProducts))
                //clear cart
                resetCart()
            }
        } catch (error) {
            console.log('error puchase', error)
        }


        const userSales = [
            {
                'simp': [
                    { id: 1, name: "Product 1", product_category: "men" },
                    { id: 2, name: "Product 2", product_category: "women" },
                ]
            }
        ]
        //console.log(UserProducts[0]['simp'].map((i, index) => console.log(i)), 'ABCDE')
        //console.log(userSales);
    }
    const fetchPaymentSheetParams = async () => {//1
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_HTTP_LINK}/product/mobilePayment`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        id: 'cus_OYak6WQX4Y4jzE',
                        category: props.product_title,
                        amount: props.totalPrice + '00'
                    }
                })
            const { paymentIntent, ephemeralKey, customer } = response.data
            return { paymentIntent, ephemeralKey, customer }
        } catch (error) {
            console.log(error, 'error fetching Stripe params')
            setPaymentPrepration(true)
        }
    }//2nd
    async function initialisePaymentSheet() {
        try {
            const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams()
            //console.log(paymentIntent, ephemeralKey, customer, 'yooo')
            const { error } = await initPaymentSheet({
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                allowsDelayedPaymentMethods: false,
                merchantDisplayName: 'Acme Fashion Inc.',
                customFlow: false,
                style: 'alwaysDark',
                //returnURL:""
            })
            if (!error) {
                console.log('sicesss', error)
                // setLoading(true)

            }
        } catch (error) {
            Alert.alert(error, 'error while trying to fetch params')
            //setPaymentPrepration(true) check if there's error fetching these info
        }

    }
    //Stripe Payment
    useEffect(() => {
        initialisePaymentSheet()
    }, [])
    async function buy() {
        setLoading(true)
        const { error } = await presentPaymentSheet()

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message)
            setLoading(false)
        } else {
            setLoading(false)
            Alert.alert('Success', 'Your order is confirmed!')
            handlePayment()
        }
    }
    return <StripeProvider publishableKey={"pk_test_51LCgyhHxnP45lSO9a4uFqTT3Yt0WI43jgac3CwWNNeEBILQ7BG0rKf8ofpVju9HGhQM51ajaAgZSJQ39gZENoCSn00ulcgApCz"}
        merchantIdentifier={null}>
        <View className='justify-center items-center content-center flex flex-row'>

            {props.allProducts.length !== 0 ? <InsetShadow containerStyle={{ borderRadius: 8 }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                <Pressable onPress={() => buy()} android_ripple={{ color: '#ccc' }}>
                    <View className='flex flex-row mx-3'>
                        <Text className='text-center p-4 text-lg dark:text-white'>
                            Proceed Payment
                        </Text>
                        {loading ? <ActivityIndicator size="small" color="green" /> : ""}
                    </View>
                </Pressable>
            </InsetShadow> : <View></View>}
        </View>
    </StripeProvider>
}

export default Payment


/*
<View className='justify-center items-center content-center flex flex-row'>
        <StripeProvider
            publishableKey={"pk_test_51LCgyhHxnP45lSO9a4uFqTT3Yt0WI43jgac3CwWNNeEBILQ7BG0rKf8ofpVju9HGhQM51ajaAgZSJQ39gZENoCSn00ulcgApCz"}
        >
            {props.allProducts.length !== 0 ? <InsetShadow containerStyle={{ borderRadius: 8 }} >
                <Pressable onPress={() => buy()} android_ripple={{ color: '#ccc' }}>
                    <Text className='text-center p-4 text-lg'>
                        Proceed Payment
                    </Text>
                </Pressable>
            </InsetShadow> : <View></View>}
        </StripeProvider>
    </View>
*/