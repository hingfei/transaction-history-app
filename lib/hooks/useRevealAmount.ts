import { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export const useRevealAmount = () => {
    const [amountVisible, setAmountVisible] = useState(false);

    const revealAmount = async () => {
        if (amountVisible) {
            setAmountVisible(false);
        } else {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Reveal Amount",
                fallbackLabel: "Use Passcode",
            });
            if (result.success) {
                setAmountVisible(true);
            }
        }
    };

    return { amountVisible, revealAmount };
};
