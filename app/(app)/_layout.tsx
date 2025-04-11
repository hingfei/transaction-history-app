import { Stack, useRouter, Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Colors } from "@/lib/constants";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppLayout() {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: Colors.background },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: { fontWeight: "bold" },
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            logout();
                            router.replace("/login");
                        }}
                    >
                        <MaterialIcons name="logout" size={24} color={"#ffffff"} />
                    </TouchableOpacity>
                ),
            }}
        >
            <Stack.Screen name="index" options={{ title: "Secure Bank" }} />
            <Stack.Screen
                name="transactions/[id]"
                options={{
                    title: "Transaction Details",
                }}
            />
        </Stack>
    );
}
