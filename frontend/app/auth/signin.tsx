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

export default function Signin() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch(
        "http://172.20.10.3:3000/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Signed in successfully!");
        router.push("/dashboard/home");
      } else {
        alert(data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-secondry h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full flex items-center  px-10 ">
          <Text className="text-sixth w-full text-left text-5xl font-bold mb-14 mt-12">
            Welcome Back
          </Text>

          <View className="w-full flex-row items-center  rounded-xl mb-5 px-5 py-4  ">
            <Feather name="mail" size={20} color="gray" className="mr-5" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="gray"
              keyboardType="email-address"
              className=" text-sixth font-semibold text-xl mb-1"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="w-full flex-row items-center rounded-xl mb-14 px-5 py-4 ">
            <Feather name="lock" size={20} color="gray" className="mr-5" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              secureTextEntry={!showPassword}
              className="flex-1 text-sixth  font-semibold text-xl mb-1"
              value={password}
              onChangeText={setPassword}
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
            className="flex items-center justify-center w-full bg-primary py-4 rounded-xl mb-12"
            onPress={handleSignIn}
          >
            <Text className="text-white text-center text-xl font-bold">
              Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text className=" flex items-center justify-center text-primary mb-12 font-bold">
              Forgot Password?
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
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text className="text-primary font-bold text-lg">Sign up</Text>
            </TouchableOpacity>
          </View>

          <StatusBar style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
