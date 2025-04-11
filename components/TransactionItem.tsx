import { View, TouchableOpacity } from "react-native";
import { Transaction } from "@/api/models/Transaction";
import ThemedText from "@/components/ui/ThemedText";

type TransactionItemProps = {
    transaction: Transaction;
    amountVisible: boolean;
};

export default function TransactionItem({ transaction, amountVisible }: TransactionItemProps) {
    const formatDate = (date: string) =>
        new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const formatAmount = (amount: number) => {
        return `${amount < 0 ? "-" : ""}RM ${Math.abs(amount).toFixed(2)}`;
    };

    return (
        <TouchableOpacity className="bg-white px-4 py-3">
            <View className="flex-row flex justify-between items-center">
                <View>
                    <ThemedText className="text-lg font-semibold mb-1">
                        {transaction.description}
                    </ThemedText>
                    <ThemedText className="text-sm text-black-200">
                        {formatDate(transaction.date)}
                    </ThemedText>
                </View>
                <View className={"flex items-end"}>
                    <View>
                        {amountVisible ? (
                            <ThemedText
                                className={`text-lg ${
                                    transaction.amount < 0 ? "text-red-500" : "text-green-500"
                                }`}
                            >
                                {formatAmount(transaction.amount)}
                            </ThemedText>
                        ) : (
                            <ThemedText className={"text-lg"}>••••</ThemedText>
                        )}
                    </View>

                    <ThemedText className="text-xs text-gray-100 capitalize">
                        {transaction.type}
                    </ThemedText>
                </View>
            </View>
        </TouchableOpacity>
    );
}
