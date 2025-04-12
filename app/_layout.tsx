import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import "./global.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Colors } from "@/lib/constants";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <AuthProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTitleStyle: { fontWeight: "bold" },
                    headerTintColor: "#FFFFFF",
                }}
            >
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen
                    name="transaction-details/[id]"
                    options={{
                        title: "Transaction Details",
                        headerBackButtonDisplayMode: "generic",
                    }}
                />
            </Stack>
        </AuthProvider>
    );
}
