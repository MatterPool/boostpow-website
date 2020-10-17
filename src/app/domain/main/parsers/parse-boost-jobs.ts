import { BoostPowJobModel } from '@matterpool/boostpow-js/dist/boost-pow-job-model';

export function parseBoostJobs(blob: any[]): any[] {
    console.log('blob', blob);
    return blob;/*{
        ...blob.toObject(),
        value: blob.getValue(),
        vout: blob.getVout(),
        txid: blob.getTxid(),
        scripthash: blob.getScriptHash(),
        additionalData: blob.getAdditionalDataHex()
    }*/
}
