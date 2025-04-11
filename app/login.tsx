import { View, Alert, TouchableOpacity } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import ThemedText from "@/components/ui/ThemedText";

export default function LoginScreen() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            await login();
            router.replace("/(app)");
        } catch (error) {
            Alert.alert("Login Failed", (error as Error).message || "Something went wrong.");
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-primary p-4">
            <ThemedText className="!text-4xl font-bold text-white mb-3">Secure Bank</ThemedText>
            <ThemedText className={"text-blue-100 text-lg mb-16 font-medium"}>
                Smart, Trusted, and Efficient
            </ThemedText>
            <TouchableOpacity
                onPress={handleLogin}
                className={"bg-white px-4 py-3 rounded-lg flex flex-row items-center gap-x-2"}
            >
                <ThemedText className={" font-bold text-xl"}>Login with Biometrics</ThemedText>
                <MaterialIcons name="fingerprint" size={30} color="black" />
            </TouchableOpacity>
        </View>
    );
}
