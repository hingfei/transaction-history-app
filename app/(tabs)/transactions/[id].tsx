import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { TransactionService } from "@/api/services/TransactionService";
import { Transaction } from "@/api/models/Transaction";
import ThemedText from "@/components/ui/ThemedText";
import { useRevealAmount } from "@/lib/hooks/useRevealAmount";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/lib/constants";

export default function TransactionDetailsScreen() {
    const { id } = useLocalSearchParams();

    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { amountVisible, revealAmount } = useRevealAmount();

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const data = await TransactionService.fetchTransactionById(id as string);
                if (data) {
                    setTransaction(data);
                } else {
                    setError("Transaction not found");
                }
            } catch (err) {
                setError("Failed to load transaction");
            } finally {
                setLoading(false);
            }
        };

        fetchTransaction();
    }, [id]);

    const formatDate = (date: string) => new Date(date).toLocaleString();
    const formatAmount = (amount: number) =>
        `${amount < 0 ? "-" : ""}RM ${Math.abs(amount).toFixed(2)}`;

    if (loading) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color="#0000e6" />
            </View>
        );
    }

    if (error || !transaction) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ThemedText type="default" className="text-error">
                    {error || "Transaction not found"}
                </ThemedText>
            </View>
        );
    }

    return (
        <SafeAreaView edges={["bottom"]} className="flex-1 bg-white p-4">
            <View className="bg-white h-full px-4 py-5 rounded-lg shadow-md border border-gray-200">
                <ThemedText type="title" className="mb-4">
                    {transaction.description}
                </ThemedText>
                <View className="mb-4">
                    <ThemedText type="default" className="text-sm text-black-200 mb-1">
                        Amount
                    </ThemedText>
                    <View className={"flex-row items-center gap-3"}>
                        {amountVisible ? (
                            <ThemedText
                                type="default"
                                className={`text-lg ${transaction.amount < 0 ? "text-error" : "text-success"}`}
                            >
                                {formatAmount(transaction.amount)}
                            </ThemedText>
                        ) : (
                            <ThemedText type="default" className="text-lg">
                                ••••
                            </ThemedText>
                        )}
                        <TouchableOpacity onPress={revealAmount}>
                            <MaterialIcons
                                name={amountVisible ? "visibility-off" : "visibility"}
                                size={18}
                                color={Colors.primary}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="mb-4">
                    <ThemedText type="default" className="text-sm text-black-200 mb-1">
                        Date
                    </ThemedText>
                    <ThemedText type="default" className="text-lg">
                        {formatDate(transaction.date)}
                    </ThemedText>
                </View>
                <View className="mb-4">
                    <ThemedText type="default" className="text-sm text-black-200 mb-1">
                        Type
                    </ThemedText>
                    <ThemedText type="default" className="text-lg capitalize">
                        {transaction.type}
                    </ThemedText>
                </View>
                <View className="mb-4">
                    <ThemedText type="default" className="text-sm text-black-200 mb-1">
                        Transfer To
                    </ThemedText>
                    <ThemedText type="default" className="text-lg">
                        {transaction.transferTo}
                    </ThemedText>
                </View>
                <View className="mb-4">
                    <ThemedText type="default" className="text-sm text-black-200 mb-1">
                        Status
                    </ThemedText>
                    <ThemedText
                        type="default"
                        className={`text-lg capitalize ${transaction.status === "success" ? "text-success" : transaction.status === "failed" ? "text-error" : "text-primary"}`}
                    >
                        {transaction.status}
                    </ThemedText>
                </View>
                <View>
                    <ThemedText type="default" className="text-sm text-black-200 mb-1">
                        Transaction ID
                    </ThemedText>
                    <ThemedText type="default" className="text-lg">
                        {transaction.transactionId}
                    </ThemedText>
                </View>
            </View>
        </SafeAreaView>
    );
}
