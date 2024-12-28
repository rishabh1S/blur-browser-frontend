import { View, Text } from "react-native";
import React from "react";
import { Button } from "./ui/button";

interface Site {
  title: string;
  url: string;
}

interface TopSitesProps {
  setUrl: (url: string) => void;
  setIsBrowsing: (isBrowsing: boolean) => void;
}

const TopSites: React.FC<TopSitesProps> = ({ setUrl, setIsBrowsing }) => {
  const topSites: Site[] = [
    { title: "Google", url: "https://www.google.com" },
    { title: "YouTube", url: "https://www.youtube.com" },
    { title: "Facebook", url: "https://www.facebook.com" },
    { title: "Twitter", url: "https://www.twitter.com" },
  ];
  return (
    <View className="w-full mt-8">
      <Text className="text-lg font-semibold text-white mb-3">Top Sites</Text>
      <View className="flex-row flex-wrap justify-between gap-4">
        {topSites.map((site, index) => (
          <Button
            variant="default"
            className="p-4 rounded-lg w-44"
            key={index}
            onPress={() => {
              setUrl(site.url);
              setIsBrowsing(true);
            }}
          >
            <Text className="text-white">{site.title}</Text>
          </Button>
        ))}
      </View>
    </View>
  );
};

export default TopSites;
