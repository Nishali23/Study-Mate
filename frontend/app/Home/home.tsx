import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;
const CARD_WIDTH = 180;
const CARD_MARGIN = 16;
const CARD_HEIGHT = 150;

export default function Home() {
  const cards = Array.from({ length: 9 }, (_, i) => ({
    id: i.toString(),
    title: `Task ${i + 1}`,
  }));

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  const handleCardPress = (index: number) => {
    setActiveIndex(index);
    flatListRef.current?.scrollToOffset({
      offset:
        index * (CARD_WIDTH + CARD_MARGIN) - (screenWidth - CARD_WIDTH) / 2,
      animated: true,
    });
  };

  const handleScroll = (event: any) => {
    const index = Math.round(
      event.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_MARGIN)
    );
    setActiveIndex(index);
  };

  return (
    <SafeAreaView className="bg-secondry h-full px-5">
      <View className="flex-row justify-between items-center mt-3 mb-6 px-2">
        <TouchableOpacity>
          <Feather name="menu" size={28} color="#805AD1" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={28} color="#805AD1" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={require("../../assets/images/home1.png")}
          style={{
            height: 180,
            padding: 17,
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 20,
          }}
          imageStyle={{ borderRadius: 16 }}
          resizeMode="cover"
        >
          <Text className="text-4xl font-semibold text-sixth mb-3 shadow-sm">
            Hello{"\n"}Sanlaksha!
          </Text>
          <Text className="text-xl text-sixth mt-1 shadow-sm">
            Have a nice day
          </Text>
        </ImageBackground>

        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3 mb-5">
          <Feather name="search" size={20} color="#805AD1" />
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#805AD1"
            className="ml-2 flex-1 text-black"
          />
        </View>

        <View className="flex-row justify-between items-center mb-5 px-2">
          <Text className="text-xl font-bold text-black">Recent Tasks</Text>
          <TouchableOpacity className="flex-row items-center space-x-1">
            <Text className="text-primary text-xl font-semibold">See more</Text>
            <Entypo name="dots-three-vertical" size={16} color="gray" />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          ref={flatListRef}
          data={cards}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          snapToAlignment="center"
          decelerationRate="fast"
          contentContainerStyle={{
            paddingLeft: (screenWidth - CARD_WIDTH) / 2,
            paddingRight: (screenWidth - CARD_WIDTH) / 2,
          }}
          renderItem={({ item, index }) => {
            const isActive = index === activeIndex;

            return (
              <TouchableOpacity
                onPress={() => handleCardPress(index)}
                activeOpacity={0.9}
              >
                <ImageBackground
                  source={require("../../assets/images/home2.png")}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    marginRight: CARD_MARGIN,
                    borderRadius: 12,
                    overflow: "hidden",
                    justifyContent: "center",
                    padding: 16,
                  }}
                  imageStyle={{
                    borderRadius: 12,
                  }}
                  resizeMode="cover"
                >
                  {isActive && (
                    <View
                      style={{
                        ...StyleSheet.absoluteFillObject,
                        backgroundColor: "rgba(0,0,0,0.4)",
                      }}
                    />
                  )}

                  <Text
                    style={{
                      color: isActive ? "#fff" : "#000",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: isActive ? "#D1D5DB" : "#6B7280",
                      marginTop: 8,
                    }}
                  >
                    Description...
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            );
          }}
          className="mb-3"
        />

        <View className="flex-row justify-center items-center mb-6">
          {cards.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${
                index === activeIndex ? "bg-purple-500" : "bg-purple-200"
              }`}
            />
          ))}
        </View>

        <View className="bg-gray-200 p-5 rounded-xl mb-24">
          <Text className="text-lg font-bold text-black mb-3">
            Task Progress
          </Text>
          <ProgressBar
            progress={0.65}
            color="#6D28D9"
            style={{ height: 10, borderRadius: 5 }}
          />
          <Text className="text-sm text-gray-700 mt-2">65% Completed</Text>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 bg-secondry border-t border-fourth flex-row justify-around py-4">
        <TouchableOpacity>
          <Ionicons name="home" size={24} color="#6D28D9" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="list" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
