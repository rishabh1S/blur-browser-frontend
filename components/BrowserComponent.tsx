import { BackHandler, TextInput, useColorScheme, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";
import Colors from "~/lib/Colors";
import { useTabBarStore } from "~/hooks/useTabBarStore";

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
  const { isTabBarVisible, setIsTabBarVisible } = useTabBarStore((state) => ({
    isTabBarVisible: state.isVisible,
    setIsTabBarVisible: state.setIsVisible,
  }));

  const injectedJavaScript = `
  (() => {
  let lastY = window.scrollY, accum = 0, lastDir = '';
  const thresh = 150;
  window.addEventListener('scroll', () => {
    const y = window.scrollY, delta = y - lastY;
    lastY = y;
    if (delta > 0) {
      accum += delta;
      if (accum >= thresh && lastDir !== 'down') {
        lastDir = 'down';
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'scroll', direction: 'down' }));
        accum = 0;
      }
    } else if (delta < 0) {
      if (lastDir !== 'up') {
        lastDir = 'up';
        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'scroll', direction: 'up' }));
      }
      accum = 0;
    }
  });
  })();
`;

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
        injectedJavaScript={injectedJavaScript}
        onMessage={(event) => {
          const message = JSON.parse(event.nativeEvent.data);
          if (message.type === "scroll") {
            setIsTabBarVisible(message.direction === "up");
          }
        }}
        onLoad={() => setIsTabBarVisible(true)}
        className="flex-1"
        onNavigationStateChange={onNavigationStateChange}
        pullToRefreshEnabled
      />
    </View>
  );
};

export default BrowserComponent;
