import { createContext, ReactNode, useContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

type AuthContextType = {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Login to Secure Bank",
                fallbackLabel: "Use Passcode",
                disableDeviceFallback: false,
                cancelLabel: "Cancel",
            });
            if (result.success) {
                setIsAuthenticated(true);
            } else {
                throw new Error("Authentication failed");
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
}
