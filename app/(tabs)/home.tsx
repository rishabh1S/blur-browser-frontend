import React, { useState } from "react";
import { View } from "react-native";
import BrowserComponent from "~/components/BrowserComponent";
import HomeComponent from "~/components/HomeComponent";

export default function Home() {
  const [url, setUrl] = useState("");
  const [searchString, setSearchString] = useState("");
  const [isBrowsing, setIsBrowsing] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = () => {
    if (searchString.trim() !== "") {
      let formattedUrl;

      // Check if the input is a valid URL or domain
      if (/^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/i.test(searchString)) {
        formattedUrl = searchString.startsWith("http")
          ? searchString
          : `https://${searchString}`;
      } else {
        // Otherwise, treat it as a search query
        formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(
          searchString
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
    setSearchString(navState.url);
  };

  return (
    <View className="flex-1">
      {isBrowsing ? (
        <BrowserComponent
          searchString={searchString}
          setSearchString={setSearchString}
          handleSearch={handleSearch}
          url={url}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <HomeComponent
          isSearchFocused={isSearchFocused}
          setIsSearchFocused={setIsSearchFocused}
          searchString={searchString}
          setSearchString={setSearchString}
          handleSearch={handleSearch}
          setIsBrowsing={setIsBrowsing}
          setUrl={setUrl}
        />
      )}
    </View>
  );
}
