export interface UploadStatus {
    items: Array<{
        payment_address: string;
        payment_sats_needed: number;
        txid: string;
        fileurl: string;
        blockhash: string;
        created_time: number;
        first_broadcast_time: number;
        last_broadcast_time: number;
    }>;
};
