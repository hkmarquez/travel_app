import { StyleSheet, Text, View } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from 'react';

const RootLayout = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [error, setError] = useState(null);



  const [loadedFonts] = useFonts({
//     "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
//     "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
//     "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
//     "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
//     "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
//     "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
//     "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
//     "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
//     "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Montserrat-Italic": require("../assets/fonts/Montserrat-Italic-VariableFont_wght.ttf"),
    "Montserrat": require("../assets/fonts/Montserrat-VariableFont_wght.ttf")
  });

  useEffect(() => {
    if (loadedFonts) {
      setFontsLoaded(true);
      SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
    }

    if (error) {
      throw error; // Handle font loading error
    }
  }, [loadedFonts, error]);

  // Wait for fonts to be loaded
  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync(); // Prevent splash screen from hiding while fonts are loading
    return <View style={{ flex: 1, backgroundColor: '#161622' }} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(signin)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
