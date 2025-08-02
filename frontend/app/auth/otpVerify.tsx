import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";

export default function OtpVerify() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputs.current[index + 1]?.focus();
      }

      if (!value && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleResend = async () => {
    try {
      setTimer(60);
      setIsResendDisabled(true);

      const response = await axios.post(
        "http://172.20.10.3:3000/api/v1/auth/resendotp",
        {
          email,
        }
      );

      if (response.status === 200) {
        Alert.alert("OTP Resent", "A new OTP has been sent to your email.");
      } else {
        Alert.alert(
          "Failed to resend OTP",
          response.data.message || "Please try again later."
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to resend OTP"
      );
      console.error(error);
      setIsResendDisabled(false);
    }
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter all 6 digits.");
      return;
    }

    try {
      const response = await axios.post(
        "http://172.20.10.3:3000/api/v1/auth/verifyotp",
        {
          email,
          otp: finalOtp,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "OTP Verified Successfully!", [
          {
            text: "OK",
            onPress: () => router.push("/auth/signin"),
          },
        ]);
      } else {
        Alert.alert(
          "Invalid OTP",
          response.data.message || "Please try again."
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Verification failed",
        error.response?.data?.message || "Please try again."
      );
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="bg-secondry h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full flex items-center px-10">
          <Text className="text-sixth w-full text-left text-4xl font-bold mb-14 mt-16 ">
            Enter Your Verification Code
          </Text>

          <View className="mb-10">
            <Text className="text-fourth text-lg font-semibold text-center">
              Enter the OTP sent to your Email {email}
            </Text>
          </View>

          <View className="flex-row justify-between w-full mb-12">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputs.current[index] = ref;
                }}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="number-pad"
                maxLength={1}
                className="bg-white text-black w-12 h-12 text-center rounded-lg text-xl font-bold border border-gray-300"
              />
            ))}
          </View>

          <View className="mb-6">
            <Text className="text-fourth text-xl font-semibold">
              {isResendDisabled ? ` ${timer}s` : "Didn't receive the code?"}
            </Text>
          </View>

          <View className="mb-8">
            <TouchableOpacity
              disabled={isResendDisabled}
              onPress={handleResend}
            >
              <Text
                className={`text-primary text-xl font-bold ${
                  isResendDisabled ? "opacity-50" : ""
                }`}
              >
                {isResendDisabled ? "Send again" : "Resend now"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            className="flex items-center justify-center w-full bg-primary py-4 rounded-xl mb-12"
            onPress={handleVerify}
          >
            <Text className="text-white text-center text-xl font-bold">
              Verify
            </Text>
          </TouchableOpacity>

          <StatusBar style="light" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
