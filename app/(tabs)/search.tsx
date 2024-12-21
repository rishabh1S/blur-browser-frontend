import React, { useState, useRef, useEffect } from "react";
import { View, BackHandler, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Input } from "~/components/ui/input";

export default function Search() {
  const [url, setUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const webViewRef = useRef<WebView>(null);

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
    }
  };

  const onNavigationStateChange = (navState: {
    url: React.SetStateAction<string>;
  }) => {
    setTempUrl(navState.url);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row items-center p-2">
        <Input
          value={tempUrl}
          onChangeText={setTempUrl}
          placeholder="Search or type URL"
          className="flex-1"
          onSubmitEditing={handleSearch}
          returnKeyType="go"
        />
      </View>
      {url ? (
        <WebView
          ref={webViewRef}
          source={{ uri: url }}
          className="flex-1"
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500 text-lg">Start your search...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
