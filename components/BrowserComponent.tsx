import { TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import WebView from "react-native-webview";

interface BrowserComponentProps {
  tempUrl: string;
  setTempUrl: (url: string) => void;
  handleSearch: () => void;
  webViewRef: React.RefObject<WebView>;
  url: string;
  onNavigationStateChange: (event: any) => void;
}

const BrowserComponent: React.FC<BrowserComponentProps> = ({
  tempUrl,
  setTempUrl,
  handleSearch,
  webViewRef,
  url,
  onNavigationStateChange,
}) => {
  return (
    <SafeAreaView className="flex-1">
      <TextInput
        value={tempUrl}
        onChangeText={setTempUrl}
        placeholder="Enter URL"
        className="px-6 py-4 dark:text-white bg-white dark:bg-zinc-900 border-b-2 border-gray-400/20"
        placeholderTextColor="white"
        onSubmitEditing={handleSearch}
        returnKeyType="go"
      />
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        className="flex-1"
        onNavigationStateChange={onNavigationStateChange}
        pullToRefreshEnabled
      />
    </SafeAreaView>
  );
};

export default BrowserComponent;
