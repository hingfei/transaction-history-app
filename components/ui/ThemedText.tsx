import React from "react";
import { Text, TextProps } from "react-native";

type ThemedTextProps = TextProps & {
    className?: string;
    type?: "default" | "title";
    children: React.ReactNode;
};

const typeStyles = {
    default: "text-black-100 text-base",
    title: "text-2xl font-bold text-black",
};

const ThemedText = ({ type = "default", className = "", children }: ThemedTextProps) => {
    const baseClassName = typeStyles[type] || typeStyles.default;

    return <Text className={`${baseClassName} ${className}`}>{children}</Text>;
};

export default ThemedText;
