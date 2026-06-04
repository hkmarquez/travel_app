import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { signOut } from 'firebase/auth';
import { auth } from '../../FirebaseConfig';
import { router } from 'expo-router';

const SignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace('/sign-in');
    } catch (error) {
      console.log(error);
      alert('Sign out failed: ' + error.message);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity
          onPress={handleSignOut}
          style={{
            backgroundColor: '#534AB7',
            paddingHorizontal: 24,
            paddingVertical: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignOut;

// const styles = StyleSheet.create({})