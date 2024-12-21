import React from "react";
import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import Colors from "~/lib/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={28} style={{ marginBottom: -2 }} {...props} />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          height: 56,
          paddingBottom: 0,
          paddingTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="tabs"
        options={{
          title: "Tabs",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="card-multiple-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="search-web" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
