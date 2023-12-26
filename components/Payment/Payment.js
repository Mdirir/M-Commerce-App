import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { Alert, Pressable, Text, View } from "react-native"
import InsetShadow from "react-native-inset-shadow"
import { ShopConsumer } from "../../store/context"

function Payment(props) {
    const navigation = useNavigation()
    const context = ShopConsumer()
    const { updateState } = context
    //console.log(props.totalPrice);
    //console.log(props.product_title);
    async function resetCart() {
        const ress = await AsyncStorage.getItem("products")
        const res = JSON.parse(ress)
        //reset Everything
        res.inCart = 0
        res.product = []
        res.totalPrice = 0
        try {
            await updateState(res).then(Alert.alert(
                "Successful",
                "Your payment is successfull",
                [
                    { text: "OK", onPress: () => navigation.push('Homepage') }
                ]
            ))
        } catch (error) {
            console.log('error resseting the cart', error)
        }
    }
    async function handlePayment() {
        //username
        //console.log(props.userName);
        console.log(props.allProducts)
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
    return <View className='justify-center items-center content-center flex flex-row'>
        {props.allProducts.length !== 0 ? <InsetShadow containerStyle={{ borderRadius: 8 }} >
            <Pressable onPress={() => handlePayment()} android_ripple={{ color: '#ccc' }}>
                <Text className='text-center p-4 text-lg'>
                    Proceed Payment
                </Text>
            </Pressable>
        </InsetShadow> : <View></View>}
    </View>
}

export default Payment