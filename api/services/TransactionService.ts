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

            // If perPage is -1, fetch all
            if (perPage === -1) {
                return {
                    total,
                    transactions: filteredTransactions,
                };
            } else {
                const start = (page - 1) * perPage;
                const end = start + perPage;
                const paginatedTransactions = filteredTransactions.slice(start, end);

                return {
                    total,
                    transactions: paginatedTransactions,
                };
            }

        } catch (error) {
            throw new Error("Failed to fetch transactions");
        }
    }

    static async fetchTransactionById(id: string): Promise<Transaction> {
        try {
            // In real life scenario we should fetch the transaction by passing the id to api
            const { transactions} = await this.fetchTransactions(1, -1);

            return transactions.find((t) => t.id === id) as Transaction;
        } catch (error) {
            throw new Error("Failed to fetch transaction");
        }
    }
}
