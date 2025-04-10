// app/(app)/_layout.tsx
import { Stack, useRouter, Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Text } from "react-native";
import { Colors } from "@/lib/contants";

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
                    <Text onPress={() => {
                        logout();
                        router.replace("/login");
                    }} className="text-white mr-4">
                        Logout
                    </Text>
                ),
            }}
        >
            <Stack.Screen name="index" options={{ title: "Secure Bank" }} />
        </Stack>
    );
}
