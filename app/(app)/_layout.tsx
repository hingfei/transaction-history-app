import { Stack, useRouter, Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Colors } from "@/lib/constants";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AppLayout() {
    const { isAuthenticated, logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.replace("/login");
    };

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
                        className={"p-2.5 z-10"}
                        onPressIn={handleLogout}
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
