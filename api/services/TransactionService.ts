import { Transaction } from "@/api/models/Transaction";
import transactionsData from "@/data/transactions.json";

type TransactionsResponse = {
    total: number;
    transactions: Transaction[];
};

export class TransactionService {
    static async fetchTransactions(
        page: number = 1,
        perPage: number = 10,
        filterType?: "debit" | "credit",
    ): Promise<TransactionsResponse> {
        try {
            // To simulate a network request
            await new Promise((resolve) => setTimeout(resolve, 500));

            const rawData = transactionsData as { total: number; transactions: any[] };

            let filteredTransactions = rawData.transactions.map((data) =>
                Transaction.fromJson(data)
            );

            // To simulate filter, should be passing queries to api in real scenario
            if (filterType) {
                filteredTransactions = filteredTransactions.filter(
                    (t) => t.type === filterType
                );
            }

            // To simulate pagination, should be passing queries to api in real scenario
            const total = filteredTransactions.length; // Total after filtering
            const start = (page - 1) * perPage;
            const end = start + perPage;
            const paginatedTransactions = filteredTransactions.slice(start, end);

            return {
                total,
                transactions: paginatedTransactions,
            };
        } catch (error) {
            throw new Error("Failed to fetch transactions");
        }
    }
}
