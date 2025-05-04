import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import LibraryScreen from './src/screens/LibraryScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import ZingChartScreen from './src/screens/ZingChartScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreatePlaylistScreen from './src/screens/CreatePlaylistScreen';
import PlaylistDetailScreen from './src/screens/PlaylistDetailScreen';
import PlayerScreen from './src/screens/PlayerScreen';
import MiniPlayerBar from './src/components/MiniPlayerBar';
import { FavoriteProvider } from './src/context/FavoriteContext';
import { DownloadProvider } from './src/context/DownloadContext';
import { StorageProvider } from './src/context/StorageContext';
import FavoriteScreen from './src/screens/FavoriteScreen';
import DownloadScreen from './src/screens/DownloadScreen';
import { AudioProvider } from './src/context/AudioContext';
import LoginScreen from './src/screens/LoginScreen';
import { useNavigationState } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LibraryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LibraryMain" component={LibraryScreen} />
      <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
      <Stack.Screen name="DownloadScreen" component={DownloadScreen} />
      <Stack.Screen name="CreatePlaylist" component={CreatePlaylistScreen} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}

function DiscoverStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscoverMain" component={DiscoverScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} options={{ presentation: 'modal' }} />
    </Stack.Navigator>
  );
}

function MainApp() {
  const navState = useNavigationState(state => state);
  let isPlayerScreen = false;
  if (navState) {
    const findPlayer = (routes) => routes.some(r => r.name === 'Player' || (r.state && findPlayer(r.state.routes)));
    isPlayerScreen = findPlayer(navState.routes);
  }
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#6B3E26',
          },
          tabBarStyle: {
            backgroundColor: '#FFD6E0',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 70,
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Thư viện') {
              return <Ionicons name={focused ? 'library' : 'library-outline'} size={28} color={focused ? '#A259FF' : '#6B3E26'} />;
            }
            if (route.name === 'Khám phá') {
              return <MaterialCommunityIcons name={focused ? 'compass' : 'compass-outline'} size={28} color={focused ? '#A259FF' : '#6B3E26'} />;
            }
            if (route.name === '#zingchart') {
              return <FontAwesome5 name="chart-line" size={28} color={focused ? '#A259FF' : '#6B3E26'} />;
            }
            if (route.name === 'Cá nhân') {
              return <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={28} color={focused ? '#A259FF' : '#6B3E26'} />;
            }
          },
        })}
      >
        <Tab.Screen name="Thư viện" component={LibraryStack} />
        <Tab.Screen name="Khám phá" component={DiscoverStack} />
        <Tab.Screen name="#zingchart" component={ZingChartScreen} />
        <Tab.Screen name="Cá nhân" component={ProfileScreen} />
      </Tab.Navigator>
      {!isPlayerScreen && <MiniPlayerBar />}
      <StatusBar style="auto" />
    </>
  );
}

const RootStack = createStackNavigator();

export default function App() {
  return (
    <AudioProvider>
      <NavigationContainer>
        <StorageProvider>
          <FavoriteProvider>
            <DownloadProvider>
              <RootStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <RootStack.Screen name="Login" component={LoginScreen} />
                <RootStack.Screen name="MainApp" component={MainApp} />
                <RootStack.Screen name="Player" component={PlayerScreen} options={{ presentation: 'modal' }} />
              </RootStack.Navigator>
            </DownloadProvider>
          </FavoriteProvider>
        </StorageProvider>
      </NavigationContainer>
    </AudioProvider>
  );
}
