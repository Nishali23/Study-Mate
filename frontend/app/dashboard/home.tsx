import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  return (
    <SafeAreaView className="bg-white h-full px-5">
      <Text className="text-3xl font-bold text-black mt-10 mb-6">
        Welcome to your Dashboard
      </Text>
    </SafeAreaView>
  );
}
