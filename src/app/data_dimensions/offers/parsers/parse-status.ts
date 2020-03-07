import { UploadStatus } from "@offers/models/upload-status.interface";

export function parseStatus(blob: any): UploadStatus {
    if (!blob.success) {
        return null;
    }
    const status = [];
    for (const record of blob.result) {
        status.push(record);
    }
    return {
        items: status
    };
}
