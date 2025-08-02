import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

export default function SendOtp() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState(params.email || "");

  const handleGetOtp = async () => {
    try {
      const response = await axios.post(
        "http://172.20.10.3:3000/api/v1/auth/sendotp",
        {
          email,
        }
      );

      if (response.status === 200) {
        Alert.alert("OTP Sent", "Please check your email.");
        router.push({
          pathname: "/auth/otpVerify",
          params: { email },
        });
      } else {
        Alert.alert("Failed", response.data.message || "Failed to send OTP");
      }
    } catch (error: any) {
      console.error("OTP error:", error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <SafeAreaView className="bg-secondry h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full flex items-center px-10">
          <Text className="text-sixth w-full text-left text-4xl font-bold mb-10 mt-16">
            OTP Verification
          </Text>

          <Image
            source={require("../../assets/images/otpVerify.jpeg")}
            style={{ width: 200, height: 200, marginBottom: 20 }}
            resizeMode="contain"
          />

          <View className="mb-10">
            <Text className="text-fourth text-lg font-semibold text-center mt-6 mb-5">
              We will send a verification code to your email
              john*****@gmail.com.{"\n"}
              Please check your inbox.
            </Text>
          </View>

          <TouchableOpacity
            className="flex items-center justify-center w-full bg-primary py-4 rounded-xl mb-12"
            onPress={handleGetOtp}
          >
            <Text className="text-white text-center text-xl font-bold">
              Get OTP
            </Text>
          </TouchableOpacity>

          <StatusBar style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
