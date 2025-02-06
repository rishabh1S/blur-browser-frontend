import { BackHandler, TextInput, useColorScheme, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import Colors from "~/lib/Colors";

interface BrowserComponentProps {
  searchString: string;
  setSearchString: (url: string) => void;
  handleSearch: () => void;
  url: string;
  onNavigationStateChange: (event: any) => void;
}

const BrowserComponent: React.FC<BrowserComponentProps> = ({
  searchString,
  setSearchString,
  handleSearch,
  url,
  onNavigationStateChange,
}) => {
  const webViewRef = useRef<WebView>(null);
  const [isSecure, setIsSecure] = useState(false);

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

  useEffect(() => {
    setIsSecure(url.startsWith("https:"));
  }, [url]);

  const colorScheme = useColorScheme();

  return (
    <View className="flex-1">
      <View className="transition-all duration-200 ease-in-out bg-white dark:bg-zinc-900 pt-12 flex flex-row items-center gap-4 px-4 border-b-2 border-gray-500/20">
        {isSecure && (
          <MaterialIcons
            name="lock"
            size={20}
            color={Colors[colorScheme ?? "light"].tint}
          />
        )}
        <TextInput
          value={searchString}
          onChangeText={setSearchString}
          placeholder="Enter URL"
          className="flex-1 px-6 py-4 dark:text-white"
          placeholderTextColor="white"
          onSubmitEditing={handleSearch}
          returnKeyType="go"
          numberOfLines={1}
          autoCorrect={false}
          selectionColor="#aa99ff44"
        />
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        className="flex-1"
        onNavigationStateChange={onNavigationStateChange}
        pullToRefreshEnabled
      />
    </View>
  );
};

export default BrowserComponent;
