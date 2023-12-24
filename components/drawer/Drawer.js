import { View, StyleSheet, Pressable } from 'react-native';
import { styled, useColorScheme } from "nativewind";
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
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { ShopConsumer } from '../../store/context';

export default function CustomDrawer(props) {
    const context = ShopConsumer()
    const { state, destroySession } = context
    // const colorScheme = useColorScheme.togg
    const { colorScheme, toggleColorScheme } = useColorScheme()
    // console.log(colorScheme);
    // props.toggleColorScheme
    //to style this use navigation, screen name -> fid out on your own or pass it params
    function signOut() {
        destroySession()
        props.navigation.push('Auth')
    }
    return (
        // <View style={{ flex: 1 }}>
        <View className='flex-1'>
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
                                    color={color}
                                    size={size + 5}
                                />
                            )}
                            label="Home"
                            // inactiveBackgroundColor='red'
                            onPress={() => {
                                props.navigation.navigate('Home');//below ln doens't wor
                                props.navigation.setOptions = { Title: "HomeScreen", headerStyle: { backgroundColor: "#3c0a6b" }, headerTintColor: 'white', drawerStyle: { backgroundColor: '#ccc' }, drawerActiveTintColor: '#3c0a6b', drawerActiveBackgroundColor: "#f0e1ff", }
                            }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons
                                    name="handbag"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Shop"
                            onPress={() => { props.navigation.navigate('Shop') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <SimpleLineIcons
                                    name="magnifier"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Search"
                            onPress={() => { props.navigation.navigate('Search') }}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cart"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Cart"
                            onPress={() => { props.navigation.navigate('Cart') }}
                        />

                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <Pressable onPress={toggleColorScheme}>
                            <Text> Theme - {colorScheme}</Text>
                        </Pressable>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem className="flex-1 items-center justify-center text-color1 bg-blue-500 dark:bg-slate-900"
                    icon={({ color, size }) => (
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    // activeBackgroundColor='red'
                    // inactiveBackgroundColor='yellow'
                    label="Sign Out"
                    onPress={() => { signOut() }}
                />
            </Drawer.Section>
        </View>
    );
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
});