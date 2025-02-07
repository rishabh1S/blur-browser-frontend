import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "~/lib/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AnimatedTabBar from "~/components/AnimatedTabBar";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return <MaterialCommunityIcons size={28} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          height: 60,
          paddingTop: 7,
          borderRadius: 15,
          paddingBottom: 0, // ios only
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="history" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bookmarks"
        options={{
          title: "Bookmarks",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="pin-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="home-variant-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tabs"
        options={{
          title: "Tabs",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="square-rounded-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="dots-horizontal-circle-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
