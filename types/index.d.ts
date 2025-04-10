export type Transaction = {
    id: string;
    description: string;
    amount: number;
    date: string;
    type: "debit" | "credit";
    transfer_to: string;
    status: "success" | "pending" | "failed";
    transaction_id: string;
};
