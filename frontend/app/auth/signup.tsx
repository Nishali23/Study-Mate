import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import { Alert } from "react-native";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post(
        "http://172.20.10.3:3000/api/v1/auth/signup",
        {
          name,
          email,
          password,
        }
      );

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Signup Successful", "Check your email for OTP.", [
          {
            text: "OK",
            onPress: () =>
              router.push({ pathname: "/auth/sendOtp", params: { email } }),
          },
        ]);
      } else {
        Alert.alert(
          "Signup Failed",
          response.data.message || "Something went wrong"
        );
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView className="bg-secondry h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full flex items-center  px-10 ">
          <Text className="text-sixth w-full text-left text-5xl font-bold mb-14 mt-12">
            Create an Account
          </Text>

          <View className="w-full flex-row items-center  rounded-xl mb-5 px-5 py-2">
            <Feather name="user" size={20} color="gray" className="mr-5 mt-3" />
            <TextInput
              placeholder="User Name"
              placeholderTextColor="gray"
              onChangeText={(text) => setName(text)}
              keyboardType="email-address"
              className=" text-sixth  font-semibold text-lg   h-10"
            />
          </View>

          <View className="w-full flex-row items-center  rounded-xl mb-5 px-5 py-2 ">
            <Feather name="mail" size={20} color="gray" className="mr-5 mt-3" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
              className=" text-sixth  font-semibold text-lg   h-10"
            />
          </View>

          <View className="w-full flex-row items-center rounded-xl mb-14 px-5 py-2 ">
            <Feather name="lock" size={20} color="gray" className="mr-5 mt-3" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword}
              onChangeText={(text) => setPassword(text)}
              className="flex-1 text-sixth  font-semibold text-lg   h-10"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="flex items-center justify-center   w-full bg-primary py-4 rounded-xl mb-12"
            onPress={handleSignup}
          >
            <Text className="text-white text-center text-xl font-bold">
              Continue
            </Text>
          </TouchableOpacity>

          <Text className="  flex items-center justify-center text-fourth mb-12 font-bold text-md ">
            OR
          </Text>

          <TouchableOpacity className="flex-row items-center justify-center space-x-2 mb-14">
            <FontAwesome name="google" size={20} color="gray" />
            <Text className="text-fourth text-lg ml-2">
              Continue with Google
            </Text>
          </TouchableOpacity>

          <View className="flex-row items-center justify-center">
            <Text className="text-fourth font-bold text-lg mr-2">
              Have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/auth/signin")}>
              <Text className="text-primary font-bold text-lg">Log In</Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
