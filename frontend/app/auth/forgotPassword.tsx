import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from "axios";

export default function forgotpassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://172.20.10.3:3000/api/v1/auth/forgotpassword",
        {
          email,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "OTP sent to your email.");

        router.push({
          pathname: "/auth/forgotPasswordVerify",
          params: { email },
        });
      } else {
        Alert.alert("Error", response.data.message || "Failed to send OTP.");
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <SafeAreaView className="bg-secondry h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="w-full h-full flex items-center px-10">
            <Text className="text-sixth w-full text-left text-4xl font-bold mb-10 mt-16">
              Forgot Password
            </Text>

            <Image
              source={require("../../assets/images/forgotpassword.jpeg")}
              style={{ width: 200, height: 200, marginBottom: 20 }}
              resizeMode="contain"
            />

            <View className="mb-10">
              <Text className="text-fourth text-lg font-semibold text-center mt-6 mb-5">
                Please Enter Your Email Address to{"\n"}
                Receive a Verification Code
              </Text>
            </View>

            <View className="w-full flex-row items-center rounded-xl mb-5 px-5 py-4">
              <Feather name="mail" size={20} color="gray" className="mr-5" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="gray"
                keyboardType="email-address"
                className="text-sixth font-semibold text-xl mb-1 flex-1"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              className="flex items-center justify-center w-full bg-primary py-4 rounded-xl mb-12"
              onPress={handleForgotPassword}
            >
              <Text className="text-white text-center text-xl font-bold">
                Send
              </Text>
            </TouchableOpacity>

            <StatusBar style="light" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
