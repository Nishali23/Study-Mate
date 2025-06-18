import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TextInputProps,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";

export default function Signup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="bg-secondry h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full flex items-center  px-10 ">
          <Text className="text-sixth w-full text-left text-5xl font-bold mb-14 mt-12">
            Create an Account
          </Text>

          <View className="w-full flex-row items-center  rounded-xl mb-5 px-5  ">
            <Feather name="user" size={20} color="gray" className="mr-5" />
            <TextInput
              placeholder="User Name"
              placeholderTextColor="gray"
              keyboardType="email-address"
              className=" text-sixth py-4 font-semibold"
            />
          </View>

          <View className="w-full flex-row items-center  rounded-xl mb-5 px-5  ">
            <Feather name="mail" size={20} color="gray" className="mr-5" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              keyboardType="email-address"
              className=" text-sixth py-4 font-semibold"
            />
          </View>

          <View className="w-full flex-row items-center rounded-xl mb-14 px-5 ">
            <Feather name="lock" size={20} color="gray" className="mr-5" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword}
              className="flex-1 text-sixth py-4 font-semibold"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="flex items-center justify-center   w-full bg-primary py-4 rounded-xl mb-12">
            <Text className="text-white text-center text-xl font-bold">
              Continue
            </Text>
          </TouchableOpacity>

          <Text className="  flex items-center justify-center text-fourth mb-12 font-bold text-md ">
            OR
          </Text>

          <TouchableOpacity className="flex-row items-center justify-center space-x-2 mb-14">
            <FontAwesome name="google" size={20} color="gray" />
            <Text className="text-fourth text-lg">Continue with Google</Text>
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
