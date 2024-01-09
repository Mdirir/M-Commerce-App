import { View, StyleSheet, Pressable } from 'react-native'
import { styled, useColorScheme } from "nativewind"
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SimpleLineIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Octicons } from '@expo/vector-icons'
import { ShopConsumer } from '../../store/context'
import InsetShadow from 'react-native-inset-shadow'

export default function CustomDrawer(props) {
    const context = ShopConsumer()
    const { state, destroySession } = context
    //console.log('DRAWER----', state)
    // const colorScheme = useColorScheme.togg
    const { colorScheme, toggleColorScheme } = useColorScheme()
    // console.log(colorScheme);
    // props.toggleColorScheme
    //to style this use navigation, screen name -> fid out on your own or pass it params
    async function signOut() {
        const res = await destroySession()
        //props.navigation.push('Auth')
        console.log(res)
        if (res) props.navigation.push('Auth', {
            routeName: 'RequestAuthAccessUsingPush',
        })
    }
    return (
        // <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: colorScheme === 'light' ? "" : "#18140f" }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>

                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                {/* <Title style={styles.title}>EXPLORE</Title> */}
                                <Title className='font-bold text-color1 dark:text-red-500'>EXPLORE</Title>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <FontAwesome
                                    name="home"
                                    color={colorScheme === 'light' ? color : "#ccc"}
                                    size={size + 5}
                                />
                            )}
                            label="Home"
                            inactiveTintColor={colorScheme === 'light' ? 'black' : "#ccc"}
                            // inactiveBackgroundColor='red'
                            onPress={() => {
                                props.navigation.navigate('Home')//below ln doens't wor
                                props.navigation.setOptions = { Title: "HomeScreen", headerStyle: { backgroundColor: "#3c0a6b" }, headerTintColor: 'white', drawerStyle: { backgroundColor: '#ccc' }, drawerActiveTintColor: '#3c0a6b', drawerActiveBackgroundColor: "#f0e1ff", }
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons
                                    name="handbag"
                                    color={colorScheme === 'light' ? color : "#ccc"}
                                    size={size}
                                />
                            )}
                            label="Shop"
                            inactiveTintColor={colorScheme === 'light' ? 'black' : "#ccc"}
                            onPress={() => { props.navigation.navigate('Shop') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons
                                    name="magnifier"
                                    color={colorScheme === 'light' ? color : "#ccc"}
                                    size={size}
                                />
                            )}
                            label="Search"
                            inactiveTintColor={colorScheme === 'light' ? 'black' : "#ccc"}
                            onPress={() => { props.navigation.navigate('Search') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cart"
                                    color={colorScheme === 'light' ? color : "#ccc"}
                                    size={size}
                                />
                            )}
                            label="Cart"
                            inactiveTintColor={colorScheme === 'light' ? 'black' : "#ccc"}
                            onPress={() => { props.navigation.navigate('Cart') }}
                        />

                    </Drawer.Section>
                    <Drawer.Section title={
                        <Text style={{ color: colorScheme === 'light' ? 'black' : "#ccc" }}>Preferences</Text>
                    }>
                        <Pressable onPress={toggleColorScheme}>
                            <Text className='text-lg m-3 dark:text-white text-red'> Theme                     <Octicons
                                name={colorScheme === 'light' ? "moon" : "sun"}
                                color={colorScheme === 'light' ? 'black' : "orange"}
                                size={24}
                            /></Text>
                        </Pressable>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <View className='rounded-lg m-4'>
                    <InsetShadow containerStyle={{ borderRadius: 8, display: 'flex', height: 55, justifyContent: 'center' }} shadowColor={colorScheme === 'light' ? 'black' : 'white'} elevation={5}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="exit-to-app"
                                    color={colorScheme === 'light' ? color : "#ccc"}
                                    size={size}
                                />
                            )}
                            // activeBackgroundColor='red' 
                            // inactiveBackgroundColor='yellow'
                            label={state.session.token && state.session.token.length > 70 ? "Sign Out" : "Sign in"}
                            inactiveTintColor={colorScheme === 'light' ? 'black' : "#ccc"}
                            onPress={() => { signOut() }}
                        />
                    </InsetShadow>
                </View>
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})