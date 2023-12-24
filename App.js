import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { Button, Image, Pressable, Text } from "react-native"
import { styled, useColorScheme } from "nativewind";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './screens/Home';
import Shop from './screens/Shop';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import CustomDrawer from './components/drawer/Drawer';
import { FontAwesome } from '@expo/vector-icons';
import ViewProduct from './screens/ViewProduct';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Cart from './screens/Cart';
import { ContextAPI } from './store/context';
import Auth from './screens/Auth';
import Admin from './screens/Admin';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

export default function App() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  function Homee() {
    return (
      <Drawer.Navigator initialRouteName='Auth' screenOptions={{
        sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? 'white' : "#18140f" },
      }}
        drawerContent={props => <CustomDrawer {...props} toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />}>
        <Drawer.Screen
          name="Home" component={Home}
        />
        <Drawer.Screen name="Auth" component={Auth}
          options={{ headerShown: false, headerBackVisible: false, title: "Authentication", sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" } }} />
        <Drawer.Screen name="Admin" component={Admin}
          options={{ headerShown: false, headerBackVisible: false, title: "Admin Dashboard", sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" } }} />
      </Drawer.Navigator>
    );
  }
  return (
    <ContextAPI>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" },

          }}
        >
          <Stack.Screen
            name="Homepage" component={Homee}//nody goes to this screen, justplace honlder for now
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Shop" component={Shop}
            options={{ sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" } }} />
          <Stack.Screen name="View" component={ViewProduct}
            options={({ route }) => {
              const title = route.params.title
              return {
                title: title
              }
            }} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Auth" component={Auth}
            options={{ headerBackVisible: false, title: "Authentication", sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" } }} />
        </Stack.Navigator>
      </NavigationContainer >
    </ContextAPI>
  );
}





/*
<ContextAPI>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" },

          }}
        >
          <Stack.Screen
            name="Homepage" component={Homee}//nody goes to this screen, justplace honlder for now
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Shop" component={Shop}
            options={{ sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" } }} />
          <Stack.Screen name="View" component={ViewProduct}
            options={({ route }) => {
              const title = route.params.title
              return {
                title: title
              }
            }} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="Auth" component={Auth}
            options={{ headerBackVisible: false, title: "Authentication", sceneContainerStyle: { backgroundColor: colorScheme === 'light' ? '#E7EBF0' : "#18140f" } }} />
        </Stack.Navigator>
      </NavigationContainer >
    </ContextAPI>
*/