import { View, TouchableOpacity } from "react-native";
import { Transaction } from "@/api/models/Transaction";
import ThemedText from "@/components/ui/ThemedText";
import { useRouter } from "expo-router";

type TransactionItemProps = {
    transaction: Transaction;
    amountVisible: boolean;
};

export default function TransactionItem({ transaction, amountVisible }: TransactionItemProps) {
    const router = useRouter();

    const formatDate = (date: string) =>
        new Date(date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const formatAmount = (amount: number) => {
        return `${amount < 0 ? "-" : ""}RM ${Math.abs(amount).toFixed(2)}`;
    };

    return (
        <TouchableOpacity
            className="bg-white px-4 py-3"
            onPress={() => router.push(`/transactions/${transaction.id}`)}
        >
            <View className="flex-row flex justify-between items-center w-full">
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
                                    transaction.amount < 0 ? "text-error" : "text-success"
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
