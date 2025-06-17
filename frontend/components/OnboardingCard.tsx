import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface OnboardingCardProps {
  image: any;
  title: string;
  description: string;
  dotsIndex: number;
  buttons: {
    text: string;
    action: () => void;
  }[];
  showSkip?: boolean;
}

export default function OnboardingCard({
  image,
  title,
  description,
  dotsIndex,
  buttons,
  showSkip = true,
}: OnboardingCardProps) {
  const router = useRouter();

  return (
    <SafeAreaView className="bg-secondry h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full flex items-center h-full pt-8 px-12">
          <Image
            source={image}
            className="w-96 h-96 mb-4 rounded-lg"
            resizeMode="cover"
          />

          <View className="bg-primary p-6 rounded-xl shadow-lg w-full">
            <Text className="text-white text-3xl font-extrabold text-center mb-5">
              {title}
            </Text>
            <Text className="text-white text-lg text-center mb-4">
              {description}
            </Text>

            <View className="flex-row justify-center gap-2 mb-6">
              {[0, 1, 2].map((i) => (
                <View
                  key={i}
                  className={`w-2 h-2 bg-white rounded-full ${
                    i === dotsIndex ? "" : "opacity-50"
                  }`}
                />
              ))}
            </View>

            {buttons.map((btn, i) => (
              <TouchableOpacity
                key={i}
                className="bg-white px-6 py-3 rounded-2xl mb-4"
                onPress={btn.action}
              >
                <Text className="text-primary text-xl font-bold text-center">
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}

            {showSkip && (
              <TouchableOpacity
                className="flex-row justify-center gap-2"
                onPress={() => router.push("/auth/signin")}
              >
                <Text className="text-white text-base">Skip</Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
