import { View, TouchableOpacity, Text } from "react-native";

import ThemedText from "@/components/ui/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/lib/constants";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <View className={"flex-1 bg-white p-4"}>
            <View className={"text-center border-b border-gray-200 pb-4"}>
                <ThemedText type="title" className={"mb-2 text-center"}>
                    Welcome to Secure Bank
                </ThemedText>
                <ThemedText className={"text-center"}>Your trusted financial partner</ThemedText>
            </View>


            <View className={"px-2.5 pt-4"}>
                <ThemedText className={"!text-2xl font-medium mb-4"}>Quick Actions</ThemedText>
                <View className={"flex flex-row flex-wrap gap-3"}>
                    <TouchableOpacity
                        onPress={() => router.push("/transactions")}
                        className={"bg-white shadow-sm p-2 rounded-lg flex flex-col items-center w-1/4"}
                    >
                        <MaterialIcons
                            name="list"
                            size={44}
                            color={Colors.primary}
                        />
                        <ThemedText className="text-xs">Transactions</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
