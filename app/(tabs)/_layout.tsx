import { Stack, useRouter, Redirect, Tabs } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Colors } from "@/lib/constants";
import { Platform, TouchableOpacity } from "react-native";
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
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: Colors.secondary,
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTitleStyle: { fontWeight: "bold" },
                    headerTintColor: "#FFFFFF",
                    tabBarStyle: Platform.select({
                        ios: {
                            // Use a transparent background on iOS to show the blur effect
                            position: 'absolute',
                        },
                        default: {},
                    }),
                    headerRight: () => (
                        <TouchableOpacity  className={"mr-4"} onPressIn={handleLogout}>
                            <MaterialIcons name="logout" size={24} color={"#ffffff"} />
                        </TouchableOpacity>
                    ),
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="home" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="transactions/index"
                    options={{
                        title: "Transaction",
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="list" size={size} color={color} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="transactions/[id]"
                    options={{
                        title: "Transaction Details",
                        href: null,
                    }}
                />
            </Tabs>
        </>
    );
}
