import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { useLayoutEffect, useState } from 'react';
import axios from "axios"
import FeaturedProduct from '../products/FeaturedProduct';
import Products from '../products/Products';
import { ActivityIndicator } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Button } from 'react-native';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker'
import { firebase } from '../../config'
import { Switch } from 'react-native';
import InsetShadow from 'react-native-inset-shadow';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function AddProduct() {
    const [formData, setFormData] = useState()
    const [productName, setProductName] = useState()
    const [productDesc, setProductDesc] = useState()
    const [productColors, setProductColors] = useState()
    const [productSize, setProductSize] = useState()
    const [productCategory, setproductCategory] = useState()
    const [productType, setProductType] = useState()
    const [productPrice, setProductPrice] = useState()
    const [productStock, setProductStock] = useState()
    const [productKeyword, setProductKeyword] = useState()
    const [productRating, setProductRating] = useState()
    const [productForKid, setProductForKid] = useState()
    const [productForMen, setProductForMen] = useState()
    const [productForWomen, setProductForWomen] = useState()
    const [productFeatured, setProductFeatured] = useState(false)
    const [productLatest, setProductLatest] = useState(false)
    const [getImage1, setGetImage] = useState()
    const [getImage2, setGetImage2] = useState()
    const [getImage3, setGetImage3] = useState()
    const [upload, setUploading] = useState(false)

    const toggleSwitch = () => setProductLatest(previousState => !previousState);
    const toggleSwitchFeatured = () => setProductFeatured(previousState => !previousState);

    function formatDate(d) {
        let year = d.getFullYear();
        let month = d.getMonth() + 1; // Month is zero-based
        let day = d.getDate();
        let hour = d.getHours();
        let minute = d.getMinutes();
        let second = d.getSeconds();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        hour = hour < 10 ? '0' + hour : hour;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second
        return `${year}-${month}-${day} ${hour}:${minute}:${second}`
    }
    function FormHandler() {
        setUploading(true)
        let currentDate = new Date()
        let formattedDate = formatDate(currentDate)

        const formDataAll = {
            product_id: '255',//Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
            m_cat_id: productForMen,
            w_cat_id: productForWomen,
            k_cat_id: productForKid,
            p_cat_id: productType,
            cat_id: productCategory,
            date: formattedDate,
            product_title: productName,
            product_img1: getImage1.substring(getImage1.lastIndexOf('/') + 1),//
            product_img2: getImage2.substring(getImage2.lastIndexOf('/') + 1),//
            product_img3: getImage3.substring(getImage3.lastIndexOf('/') + 1),//
            product_price: productPrice,
            product_desc: productDesc,
            product_keyword: productKeyword,
            stock: productStock,
            product_rating: productRating,
            product_color: productColors,
            product_size: productSize,
            product_isFeatured: productFeatured,
            product_isLatest: productLatest,
        }
        setFormData(formDataAll)
        SubmitForm()
    }
    async function pickImage(imageNumber) {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                //allowsEditing: true,
                //aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                imageNumber == 1 ? setGetImage(result.uri) : imageNumber == 2 ? setGetImage2(result.uri) : setGetImage3(result.uri)
            } else {
                Alert.alert('You didn\'t Choose an Image')
            }
        } catch (error) {
            Alert.alert('Error Picking Image')
            //console.error('Error Picking Image:', error, error.message);
        }
    }
    function uploadAllImages() {
        if (getImage1 && getImage2 && getImage2) uploadImages(getImage1).then(
            uploadImages(getImage2)).then(
                uploadImages(getImage3))
    }
    async function uploadImages(imageUri) {
        try {
            const { uri } = await FileSystem.getInfoAsync(imageUri)
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest()
                xhr.onload = () => {
                    resolve(xhr.response)
                }
                xhr.onerror = (e) => {
                    reject(new TypeError('NetWork Request Failed'))
                }
                xhr.responseType = 'blob'
                xhr.open('GET', uri, true)
                xhr.send(null)
            })

            const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1)//customName//imageUri.substring(imageUri.lastIndexOf('.'))//chane it temporary
            const ref = firebase.storage().ref().child(filename)

            await ref.put(blob)
            setUploading(false)
            //Alert.alert('Photo Uploaded')
        } catch (error) {
            console.log(error, 'Error Image Uploading');
            setUploading(false)
        }
    }
    async function SubmitForm() {
        try {
            const res = await axios.post(`${process.env.REACT_APP_HTTP_LINK}/product/add`, { //edits in server products and route
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/json' },
            })
            if (res) {
                uploadAllImages()
                Alert.alert('New Product Uploaded')
                setUploading(false)
            }
        } catch (error) {
            setUploading(false)
            Alert.alert('Newtwork Error, Try Again')
            console.log(error, error.message, 'OH NO or Axios 404')
        }
    }
    return (
        <ScrollView className='mx-9 w-full'>
            <View className='w-80 flex flex-1 flex-col gap-y-2 my-4'>
                <View>
                    <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                        <TextInput
                            type='text'
                            className='p-3 w-64 dark:placeholder-white dark:text-black'
                            placeholder='Product Name'
                            onChangeText={(e) => setProductName(e)}
                        />
                    </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='text'
                        className='p-3 w-64 dark:placeholder-white dark:text-black'
                        placeholder='Product Keyword'
                        onChangeText={(e) => setProductKeyword(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='number'
                        keyboardType="numeric"
                        className='p-3 w-64 dark:placeholder-white dark:text-black'
                        placeholder='Product Rating'
                        onChangeText={(e) => {
                            Math.max(1, Math.min(5, Number(e)))
                            setProductRating(e)
                        }}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product For Kids e.g trouser, jacket'
                        onChangeText={(e) => setProductForKid(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product For Men e.g rope'
                        onChangeText={(e) => setProductForMen(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product For Women e.g sari'
                        onChangeText={(e) => setProductForWomen(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='text'
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product Colors e.g Red, Blue, Black'
                        onChangeText={(e) => setProductColors(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='text'
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product Size e.g X XL XXL M'
                        onChangeText={(e) => setProductSize(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='text'
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product Category e.g Men, Women'
                        onChangeText={(e) => setproductCategory(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='text'
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product Type e.g Shirt, Jeans'
                        onChangeText={(e) => setProductType(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='text'
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product Price'
                        onChangeText={(e) => setProductPrice(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        type='text'
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Products in Stock'
                        onChangeText={(e) => setProductStock(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <TextInput
                        multiline={true}
                        numberOfLines={4}
                        maxLength={40}
                        className='p-3 dark:placeholder-white dark:text-black'
                        placeholder='Product Description: eg 20% Cotton'
                        onChangeText={(e) => setProductDesc(e)}
                    />
                </InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <View className='flex flex-row justify-between '>
                        <Text className='p-3  dark:placeholder-white dark:text-black'>
                            Featured Product
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={productFeatured ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitchFeatured}
                            value={productFeatured}
                        />
                    </View></InsetShadow></View>
                <View><InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }} >
                    <View className='flex flex-row justify-between'>
                        <Text className='p-3 dark:placeholder-white dark:text-black'>
                            Latest Product
                        </Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={productLatest ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch}
                            value={productLatest}
                        />
                    </View></InsetShadow></View>
                {//IMAGE video editing
                }

                <Pressable onPress={() => pickImage(1)} android_ripple={{ color: '#ccc' }}>
                    <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                        <View className='p-3 flex flex-row justify-between items-center w-full'>
                            <Text className='text-lg  dark:text-white'>Select Image 1</Text>
                            {getImage1 ? <AntDesign name="check" size={24} color="black" /> : ""}
                        </View>
                    </InsetShadow>
                </Pressable>
                <Pressable onPress={() => pickImage(2)} android_ripple={{ color: '#ccc' }}>
                    <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                        <View className='p-3 flex flex-row justify-between items-center w-full'>
                            <Text className='text-lg  dark:text-white'>Select Image 2</Text>
                            {getImage2 ? <AntDesign name="check" size={24} color="black" /> : ""}
                        </View>
                    </InsetShadow>
                </Pressable>
                <Pressable onPress={() => pickImage(3)} android_ripple={{ color: '#ccc' }}>
                    <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                        <View className='p-3 flex flex-row justify-between items-center w-full'>
                            <Text className='text-lg  dark:text-white'>Select Image 3</Text>
                            {getImage3 ? <AntDesign name="check" size={24} color="black" /> : ""}
                        </View>
                    </InsetShadow>
                </Pressable>
                <Pressable onPress={() => FormHandler()} android_ripple={{ color: '#ccc' }}>
                    <InsetShadow containerStyle={{ borderRadius: 8, height: 'auto' }}>
                        <View className='p-3 flex flex-row justify-between items-center w-full'>
                            <Text className='text-lg  dark:text-white'>Upload Product</Text>
                            {upload ? <ActivityIndicator size="large" color="#00ff00" /> : ""}
                            <Ionicons name="md-cloud-upload-outline" size={24} color="black" />
                        </View>
                    </InsetShadow>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    //inset shadow
    shadow: {
        borderRadius: 25,
        // backgroundColor: "red" //dynamically change the colors dark/light
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
})

export default AddProduct