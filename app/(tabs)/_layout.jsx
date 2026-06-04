import { View, Text, Image, TouchableOpacity, Alert, Modal, Animated } from 'react-native'
import { Tabs, router } from 'expo-router'
import { icons, images } from '../../constants'
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6" />
      <Text
        numberOfLines={1}
        className={`${focused ? 'font-semibold' : 'font-normal'} text-xs`}
        style={{
          color: color,
          textAlign: 'center',
          width: 'auto',
          maxWidth: 80,
          minWidth: 50,
        }}
      >
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const slideAnim = useRef(new Animated.Value(-280)).current;

  const openDrawer = () => {
    setDrawerOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(slideAnim, {
      toValue: -280,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setDrawerOpen(false));
  };

  const handleSignOut = async () => {
    closeDrawer();
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/sign-in');
            } catch (error) {
              alert('Sign out failed: ' + error.message);
            }
          }
        }
      ]
    );
  };

const defaultHeader = {
  headerShown: true,
  headerTintColor: '#fff',

  headerBackground: () => (
    <LinearGradient
      colors={['#00AAFF', '#FFFFFF']}   // customize these colors
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.1 }}
      style={{ flex: 1 }}
    />
  ),

  headerLeft: () => (
    <TouchableOpacity onPress={openDrawer} style={{ marginLeft: 16 }}>
      <Text style={{ color: '#fff', fontSize: 24 }}>☰</Text>
    </TouchableOpacity>
  ),

  headerTitle: () => null,
};


  return (
    <>
      {/* Drawer Modal */}
      <Modal
        visible={drawerOpen}
        transparent
        animationType="none"
        onRequestClose={closeDrawer}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          activeOpacity={1}
          onPress={closeDrawer}
        >
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: 280,
              backgroundColor: '#161622',
              paddingTop: 60,
              paddingHorizontal: 24,
              transform: [{ translateX: slideAnim }],
            }}
          >
            <TouchableOpacity onPress={closeDrawer} style={{ marginBottom: 32 }}>
              <Text style={{ color: '#fff', fontSize: 24 }}>✕</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { closeDrawer(); router.push('/home'); }}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 16 }}
            >
              <Image source={icons.home} style={{ width: 20, height: 20, tintColor: '#e0e0e0' }} resizeMode="contain" />
              <Text style={{ color: '#e0e0e0', fontSize: 16, fontWeight: '500' }}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { closeDrawer(); router.push('/create'); }}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 16 }}
            >
              <Image source={icons.plus} style={{ width: 20, height: 20, tintColor: '#e0e0e0' }} resizeMode="contain" />
              <Text style={{ color: '#e0e0e0', fontSize: 16, fontWeight: '500' }}>Create</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => { closeDrawer(); router.push('/calendar'); }}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 16 }}
            >
              <Image source={icons.bookmark} style={{ width: 20, height: 20, tintColor: '#e0e0e0' }} resizeMode="contain" />
              <Text style={{ color: '#e0e0e0', fontSize: 16, fontWeight: '500' }}>Calendar</Text>
            </TouchableOpacity>

            <View style={{ borderTopWidth: 0.5, borderTopColor: '#232533', marginVertical: 24 }} />

            <TouchableOpacity
              onPress={handleSignOut}
              style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 16 }}
            >
              <Image source={icons.profile} style={{ width: 20, height: 20, tintColor: '#ff6347' }} resizeMode="contain" />
              <Text style={{ color: '#ff6347', fontSize: 16, fontWeight: '500' }}>Sign Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: { display: 'none' },
          ...defaultHeader,
        }}>

        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} name="Home" focused={focused} />
            ),

//             headerTitle: () => (
//               <Image
//                 source={images.logo}
//                 style={{ width: 100, height: 60, opacity: 0.5 }}
//                 resizeMode="contain"
//               />
//             ),
            headerTitleContainerStyle: {
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 100, // shift logo left
            },

            headerLeft: () => (
              <View style={{ width: 90, paddingLeft: 16 }}>
                <TouchableOpacity onPress={openDrawer}>
                  <Text style={{ color: '#fff', fontSize: 24 }}>☰</Text>
                </TouchableOpacity>
              </View>
            ),

            headerRight: () => (
              <TouchableOpacity
                onPress={() =>
                  router.push({ pathname: '/home', params: { openModal: true } })
                }
                style={{
                  backgroundColor: '#3B82F6',
                  paddingHorizontal: 10,
                  paddingVertical: 6,
                  borderRadius: 16,
                  marginRight: 16,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
                  Add Itinerary
                </Text>
              </TouchableOpacity>
            ),
          }}
        />


        <Tabs.Screen
          name="create"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.plus} color={color} name="Create" focused={focused} />
            )
          }} />

        <Tabs.Screen
          name="calendar"
          options={{
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.bookmark} color={color} name="Calendar" focused={focused} />
            )
          }} />

        <Tabs.Screen
          name="sign-out"
          options={{
            href: null,
          }} />

          <Tabs.Screen
            name="view"
            options={{
              href: null,          // hides from tab bar
              headerShown: false,  // prevents overriding your tab headers
            }}
          />

      </Tabs>
    </>
  );
};

export default TabsLayout;