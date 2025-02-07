import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { BottomTabBar, BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useTabBarStore } from "~/hooks/useTabBarStore";

const AnimatedTabBar = (props: BottomTabBarProps) => {
  const isTabBarVisible = useTabBarStore((state) => state.isVisible);
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withTiming(isTabBarVisible ? 0 : 60, { duration: 300 });
  }, [isTabBarVisible, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <BottomTabBar {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default AnimatedTabBar;
