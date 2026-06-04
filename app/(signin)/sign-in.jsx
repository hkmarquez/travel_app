import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { images } from '../../constants'
import { fonts } from '../../constants/fonts'
import FormField from '../../components/FormField'
import CustomButton from "../../components/CustomButton"
import { auth } from "../../FirebaseConfig"
import { Link, router } from "expo-router"
import { signInWithEmailAndPassword } from 'firebase/auth'

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = async () => {
    setIsSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      router.replace("/home");
    } catch (error) {
      alert("Login failed: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#00AAFF', '#FFFFFF']}
        start={{ x: 0, y: 1.4 }}
        end={{ x: 0, y: 0 }}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between', // 👈 pushes top and bottom apart
            paddingHorizontal: 32,
            paddingTop: 48,
            paddingBottom: 40,
          }}>

            {/* TOP SECTION */}
            <View style={{ alignItems: 'center', width: '100%', justifyContent: 'center', flex: 1 }}>

              {/* Logo — bigger */}
              <Image
                source={images.logo}
                resizeMode="contain"
                style={{ width: 200, height: 180 }}
              />

              {/* App Name */}
              <Text style={{
                fontSize: 32,
                fontWeight: '700',
                fontFamily: fonts.regular,
                color: '#1a1a2e',
                marginTop: 0,
                marginBottom: 24,
              }}>
                Nomadia
              </Text>

              {/* Username Field */}
              <FormField
                title="Username"
                placeholder="USERNAME"
                value={form.email}
                handleChangeText={(e) => setForm({ ...form, email: e })}
                otherStyles="w-full mb-4"
                keyboardType="email-address"
                inputStyles={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderWidth: 0,
                  textAlign: 'center'
                }}
              />

              {/* Password Field */}
              <FormField
                title="Password"
                placeholder="PASSWORD"
                value={form.password}
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles="w-full mb-2"
                secureTextEntry
                inputStyles={{
                  backgroundColor: 'white',
                  borderRadius: 50,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderWidth: 0,
                  textAlign: 'center'
                }}
              />

              {/* Forgot Password */}
              <TouchableOpacity style={{ alignSelf: 'flex-start', marginBottom: 10 }}>
                <Text style={{ color: '#1a1a2e', fontSize: 14 }}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Sign In Button */}
              <CustomButton
              title="Sign In"
              handlePress={login}
              containerStyles="mt-7"
              isLoading={isSubmitting}
              />

            </View>

            {/* BOTTOM SECTION — pinned to bottom */}
            <View style={{ width: '75%' }}>
              <Link href="/sign-up" asChild>
                <TouchableOpacity style={{
                  backgroundColor: '#2a9d8f',
                  borderRadius: 50,
                  paddingVertical: 16,
                  width: '100%',
                  alignItems: 'center',
                }}>
                  <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                    Create Account
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>

          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default SignIn;