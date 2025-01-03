import React, { useState } from "react";
import { View } from "react-native";
import BrowserComponent from "~/components/BrowserComponent";
import HomeComponent from "~/components/HomeComponent";

export default function Home() {
  const [url, setUrl] = useState("");
  const [tempUrl, setTempUrl] = useState("");
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = () => {
    if (tempUrl.trim() !== "") {
      let formattedUrl;

      // Check if the input is a valid URL or domain
      if (/^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/i.test(tempUrl)) {
        formattedUrl = tempUrl.startsWith("http")
          ? tempUrl
          : `https://${tempUrl}`;
      } else {
        // Otherwise, treat it as a search query
        formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(
          tempUrl
        )}`;
      }

      setUrl(formattedUrl);
      setIsBrowsing(true);
      setIsSearchFocused(false);
    }
  };

  const onNavigationStateChange = (navState: {
    url: React.SetStateAction<string>;
  }) => {
    setTempUrl(navState.url);
  };

  return (
    <View className="flex-1">
      {isBrowsing ? (
        <BrowserComponent
          tempUrl={tempUrl}
          setTempUrl={setTempUrl}
          handleSearch={handleSearch}
          url={url}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <HomeComponent
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          tempUrl={tempUrl}
          setTempUrl={setTempUrl}
          handleSearch={handleSearch}
          setIsBrowsing={setIsBrowsing}
          setUrl={setUrl}
        />
      )}
    </View>
  );
}
