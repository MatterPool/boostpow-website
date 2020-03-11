import { UploadStatus } from "@offers/models/upload-status.interface";
import * as boost from 'boostpow-js';

export function parseBoostSearch(blob: any): Array<any> {
    const boostJobs = [];
    for (const item of blob.result) {
        //boostJobs.push(boost.BoostPowJob.fromRawTransaction(item.boostJob.rawtx));
        boostJobs.push({
            boostJobRequest: item,
            boostPowJob: boost.BoostPowJob.fromRawTransaction(item.boostJob.rawtx)
        });
    }
    return boostJobs;
}
