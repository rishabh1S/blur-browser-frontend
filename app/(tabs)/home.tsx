import { useRouter } from "expo-router";
import { View, Text } from "react-native";
import { Button } from "~/components/ui/button";

export default function Home() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-bold dark:text-white">
        Welcome to Browser App
      </Text>
      <Button variant="outline" onPress={() => router.push("/(tabs)/search")}>
        <Text className="dark:text-white">Go to Search</Text>
      </Button>
    </View>
  );
}
