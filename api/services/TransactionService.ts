import { Transaction } from "@/api/models/Transaction";
import transactionsData from "@/data/transactions.json";

export class TransactionService {
    static async fetchTransactions(): Promise<Transaction[]> {
        try {
            // To simulate a network request
            await new Promise((resolve) => setTimeout(resolve, 500));

            const transactions = transactionsData.map((data) => Transaction.fromJson(data));

            return transactions;
        } catch (error) {
            throw new Error("Failed to fetch transactions");
        }
    }
}
