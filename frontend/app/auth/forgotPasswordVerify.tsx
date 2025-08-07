import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { Feather } from "@expo/vector-icons";

export default function ForgotPasswordVerify() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (timer <= 0) {
      setIsResendDisabled(false);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
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
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      Alert.alert("Error", "Please enter the complete OTP.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in both password fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://172.20.10.3:3000/api/v1/auth/resetpassword",
        {
          email,
          otp: enteredOtp,
          newPassword,
        }
      );

      Alert.alert("Success", "Password reset successfully.");
      router.push("/auth/signin");
    } catch (error: any) {
      console.error(error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to reset password."
      );
    }
  };

  return (
    <SafeAreaView className="bg-secondry flex-1">
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
            <Text className="text-sixth w-full text-left text-4xl font-bold mb-10 mt-5">
              Verify Your Email
            </Text>

            <Image
              source={require("../../assets/images/fpVerify.jpeg")}
              style={{ width: 200, height: 200, marginBottom: 20 }}
              resizeMode="contain"
            />

            <Text className="text-fourth text-lg font-semibold text-center mb-8">
              Enter the OTP sent to your Email {email}
            </Text>

            <View className="flex-row justify-between w-full mb-6">
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

            <View className="w-full relative mb-5">
              <TextInput
                placeholder="New Password"
                placeholderTextColor="gray"
                secureTextEntry={!showNewPassword}
                value={newPassword}
                onChangeText={setNewPassword}
                className="w-full bg-white text-black rounded-xl px-4 py-4 text-lg font-semibold pr-12"
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Feather
                  name={showNewPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <View className="w-full relative mb-8">
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="w-full bg-white text-black rounded-xl px-4 py-4 text-lg font-semibold pr-12"
              />
              <TouchableOpacity
                className="absolute right-4 top-4"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Feather
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              disabled={isResendDisabled}
              onPress={handleResend}
              className="mb-8"
            >
              <Text
                className={`text-primary text-xl font-bold ${
                  isResendDisabled ? "opacity-50" : ""
                }`}
              >
                {isResendDisabled
                  ? `Resend in ${timer}s`
                  : "Resend Verification Code"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex items-center justify-center w-full bg-primary py-4 rounded-xl mb-12"
              onPress={handleVerify}
            >
              <Text className="text-white text-center text-xl font-bold">
                Verify & Reset Password
              </Text>
            </TouchableOpacity>

            <StatusBar style="light" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
