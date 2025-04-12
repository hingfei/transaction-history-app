import {
    View,
    SectionList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { TransactionService } from "@/api/services/TransactionService";
import { Transaction } from "@/api/models/Transaction";
import ThemedText from "@/components/ui/ThemedText";
import TransactionItem from "@/components/TransactionItem";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/lib/constants";
import FilterModal from "@/components/FilterModal";
import { useRevealAmount } from "@/lib/hooks/useRevealAmount";

export default function TransactionsListingScreen() {
    const [sections, setSections] = useState<{ title: string; data: Transaction[] }[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [filterType, setFilterType] = useState<"debit" | "credit" | undefined>(undefined);

    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const { amountVisible, revealAmount } = useRevealAmount();

    const PER_PAGE = 10;
    const totalPages = Math.ceil(total / PER_PAGE);

    const fetchData = async () => {
        setLoading(true);

        try {
            const { transactions, total: newTotal } = await TransactionService.fetchTransactions(
                page,
                PER_PAGE,
                filterType
            );
            setTotal(newTotal);

            // Group the transactions based on date
            const groupedTransactions = transactions.reduce(
                (groups, transaction) => {
                    const date = new Date(transaction.date).toLocaleDateString();

                    if (!groups[date]) {
                        groups[date] = [];
                    }

                    groups[date].push(transaction);
                    return groups;
                },
                {} as Record<string, Transaction[]>
            );

            // Sort the transactions based on date, latest should be shown first
            const sortedSections = Object.entries(groupedTransactions)
                .map(([date, data]) => ({
                    title: date,
                    data: data.sort(
                        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
                    ),
                }))
                .sort(
                    (a, b) =>
                        new Date(b.data[0].date).getTime() - new Date(a.data[0].date).getTime()
                );

            setSections(sortedSections);
        } catch (err) {
            setError("Failed to load transactions");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        fetchData();
    }, [page, filterType]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const handleFilter = (type: "debit" | "credit" | undefined) => {
        setFilterType(type);
        setPage(1);
        setFilterModalVisible(false);
    };

    if (loading && !refreshing) {
        return (
            <View className="flex-1 bg-white items-center justify-center">
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <SectionList
                sections={sections}
                renderItem={({ item }) => (
                    <TransactionItem transaction={item} amountVisible={amountVisible} />
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View className="bg-purple-100 p-2">
                        <ThemedText className="font-semibold text-lg">{title}</ThemedText>
                    </View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 16 }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={Colors.primary}
                        colors={[Colors.primary]}
                        progressViewOffset={10}
                    />
                }
                ListHeaderComponent={
                    <View className="flex-row justify-between items-center px-4 py-3">
                        <ThemedText type="title">Transactions</ThemedText>
                        <View className={"flex-row flex gap-3"}>
                            <TouchableOpacity onPress={revealAmount}>
                                <MaterialIcons
                                    name={amountVisible ? "visibility-off" : "visibility"}
                                    size={24}
                                    color={Colors.primary}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
                                <MaterialIcons name="filter-alt" size={24} color={Colors.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
            {error && (
                <ThemedText className="text-error text-center mt-2 text-sm">{error}</ThemedText>
            )}

            <Pagination page={page} totalPages={totalPages} setPage={setPage} />

            <FilterModal
                filterModalVisible={filterModalVisible}
                setFilterModalVisible={setFilterModalVisible}
                filterType={filterType}
                handleFilter={handleFilter}
            />
        </SafeAreaView>
    );
}

const Pagination = ({
    page,
    totalPages,
    setPage,
}: {
    page: number;
    totalPages: number;
    setPage: (page: (prev: any) => number) => void;
}) => {
    return (
        <View className="flex-row justify-between items-center p-4">
            <TouchableOpacity
                onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
            >
                <MaterialIcons
                    name="keyboard-arrow-left"
                    size={24}
                    color={page === 1 ? Colors.disabled : Colors.black}
                />
            </TouchableOpacity>
            <ThemedText>
                {page} of {totalPages}
            </ThemedText>
            <TouchableOpacity
                onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={page === totalPages}
            >
                <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color={page === totalPages ? Colors.disabled : Colors.black}
                />
            </TouchableOpacity>
        </View>
    );
};
