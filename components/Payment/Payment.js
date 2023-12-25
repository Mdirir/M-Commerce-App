import AsyncStorage from "@react-native-async-storage/async-storage"
import { Pressable, Text, View } from "react-native"
import InsetShadow from "react-native-inset-shadow"

function Payment(props) {

    //console.log(props.totalPrice);
    //console.log(props.product_title);
    async function handlePayment() {
        //username
        //console.log(props.userName);
        // console.log(props.allProducts);
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
                //console.log(UserPurchaseHisory[0]['simp'].map((i, index) => console.log(i)), 'jj')
                // Iterate through each object in the new array
                UserPurchaseHisory.forEach(newItem => {
                    // Iterate through each key in the object
                    Object.keys(newItem).forEach(key => {
                        // Find the corresponding array in the existing array based on the key
                        const existingItem = UserProducts.find(item => item[key])

                        if (existingItem) {
                            // Get the index of the array in the existing array
                            const arrayIndex = UserProducts.indexOf(existingItem)

                            // Iterate through the new array and update or append values
                            newItem[key].forEach(newProduct => {
                                const existingProductIndex = existingItem[key].findIndex(existingProduct => existingProduct.id === newProduct.id)

                                if (existingProductIndex !== -1) {
                                    // If product already exists, update values
                                    UserProducts[arrayIndex][key][existingProductIndex] = newProduct
                                } else {
                                    // If product does not exist, append to the array
                                    UserProducts[arrayIndex][key].push(newProduct)
                                }
                            })
                        } else {
                            // IUserProductsf no corresponding array is found, simply push the entire new item
                            UserProducts.push({ [key]: newItem[key] })
                        }
                    })
                })
                //console.log(UserProducts[0]['simp'].map((i, index) => console.log(i)), 'jj')
                console.log(UserProducts, 'yyyyy')
                await AsyncStorage.setItem("UserPurchaseHisory", JSON.stringify(UserProducts))
            } else {
                //if no history just create
                await AsyncStorage.setItem("UserPurchaseHisory", JSON.stringify(UserProducts))
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
        //console.log(UserProducts[0]['simp'].map((i, index) => console.log(i)), 'jj')
        //console.log(userSales);
    }
    return <View className='justify-center items-center content-center flex flex-row'>
        <InsetShadow containerStyle={{ borderRadius: 8 }} >
            <Pressable onPress={() => handlePayment()}>
                <Text className='text-center p-4 text-lg'>
                    Proceed Payment
                </Text>
            </Pressable>
        </InsetShadow>
    </View>
}

export default Payment