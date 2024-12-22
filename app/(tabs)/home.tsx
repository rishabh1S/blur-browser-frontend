import React, { useState, useRef, useEffect } from "react";
import {
  View,
  BackHandler,
  Text,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { WebView } from "react-native-webview";

const topSites = [
  { title: "Google", url: "https://www.google.com" },
  { title: "YouTube", url: "https://www.youtube.com" },
  { title: "Facebook", url: "https://www.facebook.com" },
  { title: "Twitter", url: "https://www.twitter.com" },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showBlur, setShowBlur] = useState(true);
  const webViewRef = useRef<WebView>(null);

  // Animation values
  const searchBarTop = useRef(new Animated.Value(0)).current;
  const blurOpacity = useRef(new Animated.Value(0)).current;

  const handleBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  const handleSearch = () => {
    if (tempUrl.trim() !== "") {
      const formattedUrl = tempUrl.includes("http")
        ? tempUrl
        : `https://www.google.com/search?q=${encodeURIComponent(tempUrl)}`;
      setUrl(formattedUrl);
      setShowBlur(false);
      setIsSearchFocused(false);
    }
  };

  const onNavigationStateChange = (navState: {
    url: React.SetStateAction<string>;
  }) => {
    setTempUrl(navState.url);
  };

  const focusSearchBar = () => {
    setIsSearchFocused(true);
    Animated.timing(searchBarTop, {
      toValue: 1, // Move to the top
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    if (showBlur) {
      Animated.timing(blurOpacity, {
        toValue: 1, // Fully visible blur
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const unfocusSearchBar = () => {
    setIsSearchFocused(false);
    Keyboard.dismiss();
    Animated.timing(searchBarTop, {
      toValue: 0, // Move back to center
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();

    if (showBlur) {
      Animated.timing(blurOpacity, {
        toValue: 0, // Hide blur
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View className="flex-1">
      <TouchableWithoutFeedback onPress={unfocusSearchBar}>
        <View className="flex-1">
          <ImageBackground
            source={{
              uri: "https://i.pinimg.com/736x/a7/f5/8c/a7f58c782a6a38b8fced1c3803f50c8b.jpg",
            }}
            className="flex-1 justify-start"
          >
            {/* Custom Glassmorphism Effect */}
            {isSearchFocused && showBlur && (
              <Animated.View
                style={[
                  {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  },
                  {
                    opacity: blurOpacity,
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                  },
                ]}
              />
            )}

            {/* Search Bar */}
            <Animated.View
              style={{
                marginTop: searchBarTop.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["60%", "10%"], // Move from center to top
                }),
              }}
              className="z-10 px-4 py-1"
            >
              <TextInput
                value={tempUrl}
                onChangeText={setTempUrl}
                placeholder="Search or enter an address"
                className="w-full px-6 py-4 text-white bg-black/30
                 border-b-2 border-violet-500
                 transition-all duration-200 ease-in-out
                focus:bg-zinc-900"
                placeholderTextColor="white"
                onFocus={focusSearchBar}
                onSubmitEditing={handleSearch}
                returnKeyType="go"
              />
            </Animated.View>

            {/* WebView or Welcome Screen */}
            {url ? (
              <WebView
                ref={webViewRef}
                source={{ uri: url }}
                className="flex-1"
                onNavigationStateChange={onNavigationStateChange}
                onLoad={() => setIsSearchFocused(false)}
              />
            ) : (
              !isSearchFocused && (
                <View className="flex-1 items-center justify-center px-4">
                  <Text className="text-2xl font-bold text-white mb-4">
                    Welcome to Blur Browser
                  </Text>
                  {/* Top Sites */}
                  <View className="w-full mt-8">
                    <Text className="text-lg font-semibold text-white mb-3">
                      Top Sites
                    </Text>
                    <View className="flex-row flex-wrap justify-between">
                      {topSites.map((site, index) => (
                        <TouchableOpacity
                          key={index}
                          className="bg-white bg-opacity-20 p-4 rounded-lg mb-4 w-44 items-center justify-center"
                          onPress={() => setUrl(site.url)}
                        >
                          <Text className="text-black text-center">
                            {site.title}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              )
            )}
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
