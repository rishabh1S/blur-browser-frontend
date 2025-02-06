import clsx from "clsx";
import { BlurView } from "expo-blur";
import React, { useRef } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TextInput,
} from "react-native";
import TopSites from "~/components/TopSites";

interface HomeComponentProps {
  isSearchFocused: boolean;
  setIsSearchFocused: (isFocused: boolean) => void;
  searchString: string;
  setSearchString: (url: string) => void;
  handleSearch: () => void;
  setIsBrowsing: (isBrowsing: boolean) => void;
  setUrl: (url: string) => void;
}

const HomeComponent: React.FC<HomeComponentProps> = ({
  isSearchFocused,
  setIsSearchFocused,
  searchString,
  setSearchString,
  handleSearch,
  setIsBrowsing,
  setUrl,
}) => {
  // Animation values
  const searchBarTop = useRef(new Animated.Value(0)).current;

  const focusSearchBar = () => {
    setIsSearchFocused(true);
    Animated.timing(searchBarTop, {
      toValue: 1, // Move to the top
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const unfocusSearchBar = () => {
    setIsSearchFocused(false);
    Keyboard.dismiss();
    Animated.timing(searchBarTop, {
      toValue: 0, // Move back to center
      duration: 400,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableWithoutFeedback onPress={unfocusSearchBar}>
      <View className="flex-1">
        <ImageBackground
          source={{
            uri: "https://i.pinimg.com/736x/a7/f5/8c/a7f58c782a6a38b8fced1c3803f50c8b.jpg",
          }}
          className="flex-1 justify-start"
        >
          {isSearchFocused && (
            <BlurView
              intensity={40}
              experimentalBlurMethod="dimezisBlurView"
              tint="dark"
              className="absolute top-0 left-0 right-0 bottom-0 z-[5]"
            />
          )}
          <Animated.View
            style={{
              marginTop: searchBarTop.interpolate({
                inputRange: [0, 1],
                outputRange: ["80%", "0%"], // Move from center to top
              }),
            }}
            className="z-10"
          >
            <View
              className={clsx(
                "transition-all duration-400 ease-in-out",
                isSearchFocused && "bg-zinc-900 pt-12"
              )}
            >
              <TextInput
                value={searchString}
                onChangeText={setSearchString}
                placeholder="Search or enter an address"
                className="mx-4 focus:mx-0 px-6 py-4 text-white bg-zinc-900/30
                                 border-b-2 border-violet-500 focus:border-violet-600
                                 transition-all duration-200 ease-in-out
                                focus:bg-zinc-900"
                placeholderTextColor="white"
                onFocus={focusSearchBar}
                onSubmitEditing={handleSearch}
                returnKeyType="go"
              />
            </View>
          </Animated.View>
          <View className="flex-1 items-center justify-center px-4">
            <Text className="text-2xl font-bold text-white mb-4">
              Welcome to Blur Browser
            </Text>
            <TopSites setUrl={setUrl} setIsBrowsing={setIsBrowsing} />
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeComponent;
