import { BoostPowJobModel } from 'boostpow-js/dist/boost-pow-job-model';

export function parseBoostJob(blob: BoostPowJobModel): any {
    return {
        ...blob.toObject(),
        value: blob.getValue(),
        vout: blob.getVout(),
        txid: blob.getTxid(),
        scripthash: blob.getScriptHash(),
        additionalData: blob.getAdditionalDataHex()
    }
}
