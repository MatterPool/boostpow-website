import { BoostSignalRankerModel } from 'boostpow-js/dist/boost-signal-ranker-model';
import { BoostSignalSummarySerialize } from '@main/models/boost-signal-summary-serialize.interface';

export function parseBoostSearch(blob: BoostSignalRankerModel): Array<BoostSignalSummarySerialize> {
    const boostSignalSummaries = [];
    console.log('parsingn');
    for (const item of blob.list) {
        let foundTags = {};

        let recentSignal = 0;
        for (const sig of item.signals) {
            if (sig.time() >= recentSignal) {
                recentSignal = sig.time();
            }
        }
        item.signals.map((sig) =>
        {
            if (/^0+$/.test(sig.tag(true))) {
                return;
            }
            const tagUtf8 = Buffer.from(sig.tag(true), 'hex').reverse().toString('utf8');
            if (!foundTags[tagUtf8]) {
                foundTags[tagUtf8] = 0;
            }
            foundTags[tagUtf8] += sig.difficulty();
        });

        boostSignalSummaries.push({
            totalDifficulty: item.totalDifficulty,
            totalEnergy: item.totalDifficulty,
            recentSignalTime: recentSignal,
            entity: {
                boosthash: item.entity.getBoostPowString().hash(),
                content: item.entity.content(),
                contenthex: item.entity.content(true),
                category: item.entity.category(),
                categoryhex: item.entity.category(true),
                userNonce: item.entity.userNonce(),
                userNoncehex: item.entity.userNonce(true),
                additionalData: item.entity.additionalData(),
                additionalDatahex: item.entity.content(true),
                tag: item.entity.tag(),
                taghex: item.entity.tag(true),
                boostJobId: item.entity.getBoostJobId(),
                boostJobProofId: item.entity.getBoostJobProofId(),
                metadataHash: item.entity.metadataHash(),
                minerPubKeyHash: item.entity.minerPubKeyHash(),
                time: item.entity.time(),
                difficulty: item.entity.difficulty(),
                energy: item.entity.difficulty(),
            },
            tags: foundTags
        });
    }
    return boostSignalSummaries;
}
