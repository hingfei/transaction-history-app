import { Transaction as TransactionType } from "@/types";

export class Transaction {
    id: string;
    amount: number;
    date: string;
    description: string;
    type: "debit" | "credit";
    transferTo: string;
    status: "success" | "pending" | "failed";
    transactionId: string;

    constructor(data: TransactionType) {
        this.id = data.id;
        this.amount = data.amount;
        this.date = data.date;
        this.description = data.description;
        this.type = data.type;
        this.transferTo = data.transfer_to;
        this.status = data.status;
        this.transactionId = data.transaction_id;
    }

    static fromJson(json: any): Transaction {
        return new Transaction({
            id: json.id,
            amount: json.amount,
            date: json.date,
            description: json.description,
            type: json.type,
            transfer_to: json.transfer_to,
            status: json.status,
            transaction_id: json.transaction_id,
        });
    }
}
