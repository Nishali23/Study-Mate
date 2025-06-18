import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import OnboardingCard from "../components/OnboardingCard";
import "../global.css";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    image: require("../assets/images/onboarding1.jpeg"),
    title: "Time and Task \nManaging App for \nEveryone",
    description:
      "Plan, manage, and track your tasks with ease.\nStart being productive today.",
    dotsIndex: 0,
    buttons: [{ text: "Get Started" }],
  },
  {
    image: require("../assets/images/onboarding2.jpeg"),
    title: "Schedule Your \nTask & Projects \nEasily",
    description:
      "Easily prioritize and schedule all your tasks.\nStay on top of your game.",
    dotsIndex: 1,
    buttons: [{ text: "Next" }],
  },
  {
    image: require("../assets/images/onboarding3.jpeg"),
    title: "Manage Your Time\nand Be Productive",
    description:
      "Visualize progress and stay organized.\nGet started now with a free account.",
    dotsIndex: 2,
    buttons: [{ text: "Sign Up" }, { text: "Log In" }],
    showSkip: false,
  },
];

export default function Onboarding() {
  const router = useRouter();
  const carouselRef = useRef<any>(null);

  return (
    <>
      <Carousel
        ref={carouselRef}
        width={width}
        height={height}
        data={slides}
        loop={false}
        scrollAnimationDuration={400}
        renderItem={({ item, index }) => (
          <OnboardingCard
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
            dotsIndex={item.dotsIndex}
            showSkip={item.showSkip ?? true}
            buttons={
              item.dotsIndex === 2
                ? [
                    {
                      text: "Sign Up",
                      action: () => router.push("/auth/signup"),
                    },
                    {
                      text: "Sign In",
                      action: () => router.push("/auth/signin"),
                    },
                  ]
                : [
                    {
                      text: item.dotsIndex === 0 ? "Get Started" : "Next",
                      action: () => carouselRef.current?.next(),
                    },
                  ]
            }
          />
        )}
      />
      <StatusBar style="light" />
    </>
  );
}
