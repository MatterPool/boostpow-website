import { BoostSignalRankerModel } from 'boostpow-js/dist/boost-signal-ranker-model';


export function parseBoostSearch(blob: BoostSignalRankerModel): Array<any> {
    const boostSignalSummaries = [];
    for (const item of blob.list) {
        boostSignalSummaries.push({
            totalDifficulty: item.totalDifficulty,
            totalEnergy: item.totalDifficulty,
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
            signals: item.signals
        });

    }
    return boostSignalSummaries;
}
