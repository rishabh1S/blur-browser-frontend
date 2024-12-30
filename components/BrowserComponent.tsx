import { BackHandler, TextInput, View } from "react-native";
import React, { useEffect, useRef } from "react";
import WebView from "react-native-webview";

interface BrowserComponentProps {
  tempUrl: string;
  setTempUrl: (url: string) => void;
  handleSearch: () => void;
  url: string;
  onNavigationStateChange: (event: any) => void;
}

const BrowserComponent: React.FC<BrowserComponentProps> = ({
  tempUrl,
  setTempUrl,
  handleSearch,
  url,
  onNavigationStateChange,
}) => {
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
  return (
    <View className="flex-1">
      <View className="transition-all duration-200 ease-in-out bg-white dark:bg-zinc-900 pt-12">
        <TextInput
          value={tempUrl}
          onChangeText={setTempUrl}
          placeholder="Enter URL"
          className="px-6 py-4 dark:text-white border-b-2 border-gray-400/20"
          placeholderTextColor="white"
          onSubmitEditing={handleSearch}
          returnKeyType="go"
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
