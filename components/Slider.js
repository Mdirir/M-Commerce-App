import React, { useEffect, useState } from "react"
import { View, ImageBackground, Pressable } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import { images as imagess } from '../assets/Images'

function Slider({ product_images }) {
    let images = [0, 1, 2]
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const lastIndex = images.length - 1
        if (index < 0) {
            setIndex(lastIndex)
        }
        if (index > lastIndex) {
            setIndex(0)
        }
    }, [index])
    useEffect(() => {
        let slider = setInterval(() => {
            setIndex(index + 1)
        }, 5000)
        return () => {
            clearInterval(slider)
        }
    }, [index])
    return (
        <View className="flex flex-row justify-center content-center items-center gap-1">
            <View className="w-36 grid gap-3">
                <Pressable onPress={() => setIndex(1)} android_ripple={{ color: "#ccc" }}>
                    <ImageBackground
                        source={{ uri: product_images[0] }}
                        resizeMode='cover'
                        className="w-fit h-[185px] rounded-t-lg"
                    />
                </Pressable>
                <Pressable onPress={() => setIndex(1)} android_ripple={{ color: "#ccc" }}>
                    <ImageBackground
                        source={{ uri: product_images[1] }}
                        resizeMode='cover'
                        className="w-fit h-[185px] rounded-t-lg bg-green-500"
                    />
                </Pressable>
                <Pressable onPress={() => setIndex(2)} android_ripple={{ color: "#ccc" }}>
                    <ImageBackground
                        source={{ uri: product_images[2] }}
                        resizeMode='cover'
                        className="w-fit h-[185px]  rounded-t-lg bg-green-500"
                    />
                </Pressable>
            </View>
            <View className="flex-1 flex-row justify-center bg-gray-500 content-center items-center mr-3">
                <View className=" w-full rounded-lg">
                    <View className="relative rounded-lg">
                        <ImageBackground
                            source={{ uri: product_images[images[index]] }}
                            resizeMode='cover'
                            className="text-center flex flex-row content-center justify-between items-center relative h-[550] rounded-lg "
                        >
                            <Pressable
                                onPress={() => setIndex(index - 1)} android_ripple={{ color: "#ccc" }}
                                className="ml-5 cursor-pointer flex"
                            >
                                <FontAwesome5 name="chevron-left" size={24} color="black" />
                            </Pressable>
                            <Pressable
                                onPress={() => setIndex(index + 1)} android_ripple={{ color: "#ccc" }}
                                className="mr-5 cursor-pointer flex"
                            >
                                <FontAwesome5 name="chevron-right" size={24} color="black" />
                            </Pressable>
                        </ImageBackground>
                        <View className="-mt-12 z-10 flex flex-row justify-center content-center items-center bg-opacity-0">
                            <Pressable
                                className={`${"rounded-full h-5 w-5 m-3 cursor-pointer bg-green-500"} ${index === 0 ? "h-5 w-5 bg-black dark:bg-white" : null
                                    }`}
                                onPress={() => setIndex(0)} android_ripple={{ color: "#ccc" }}
                            ></Pressable>
                            <Pressable
                                className={`${"rounded-full h-5 w-5 m-3 cursor-pointer bg-green-500"} ${index === 1 ? "h-5 w-5 bg-black dark:bg-white" : null
                                    }`}
                                onPress={() => setIndex(1)} android_ripple={{ color: "#ccc" }}
                            ></Pressable>
                            <Pressable
                                className={`${"rounded-full dark:hover:shadow-lg h-5 w-5 m-3 cursor-pointer bg-green-500"} ${index === 2 ? "h-5 w-5 bg-black dark:bg-white" : null
                                    }`}
                                onPress={() => setIndex(2)} android_ripple={{ color: "#ccc" }}
                            ></Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}




// <View className="h-[360px] w-[200px] rounded">
//     <View className="relative rounded bg-yellow-500">
//         <View
//             className="text-center flex content-center justify-between items-center relative h-[460px] rounded-lg bg-blue-500"
//         // style={{
//         //     backgroundImage: `url('/images/${images[index]}')`,
//         // }}
//         >
//             {/* <ImageBackground
//                                 source={images[1][1]}
//                                 resizeMode='cover'
//                                 className="flex-1 w-fit h-[185px] z-10 rounded-t-lg bg-green-500"
//                             /> */}
//             <Pressable
//                 onPress={() => setIndex(index - 1)}
//                 className="ml-5 cursor-pointer flex"
//             >
//                 <FontAwesome5 name="chevron-left" size={24} color="black" />
//             </Pressable>
//             <Pressable
//                 onPress={() => setIndex(index + 1)}
//                 className="mr-5 cursor-pointer flex"
//             >
//                 <FontAwesome5 name="chevron-right" size={24} color="black" />
//             </Pressable>
//         </View>
//         <View className="absolute -mt-10 ml-[35%] z-10 flex justify-start content-between items-center bg-gray-500 bg-opacity-0">
//             <View
//                 className={`${"rounded-full h-5 w-5 m-3 cursor-pointer"} ${index === 0 ? "h-5 w-5 shadow-sm dark:shadow-lg" : null
//                     }`}
//                 onClick={() => setIndex(0)}
//             ></View>
//             <View
//                 className={`${"rounded-full h-5 w-5 m-3 cursor-pointer"} ${index === 1 ? "h-5 w-5 shadow-sm dark:shadow-lg" : null
//                     }`}
//                 onClick={() => setIndex(1)}
//             ></View>
//             <View
//                 className={`${"rounded-full dark:hover:shadow-lg h-5 w-5 m-3 cursor-pointer "} ${index === 2 ? "h-5 w-5 shadow-sm dark:shadow-md" : null
//                     }`}
//                 onClick={() => setIndex(2)}
//             ></View>
//         </View>
//     </View>
// </View>
export default Slider