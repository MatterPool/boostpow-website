export interface BoostSignalSummarySerialize {
    totalDifficulty: number;
    totalEnergy: number;
    recentSignalTime?: number;
    entity: {
        boosthash: string,
        content: string,
        contenthex: string,
        category: string,
        categoryhex: string,
        userNonce: string,
        userNoncehex: string,
        additionalData: string,
        additionalDatahex: string,
        tag: string,
        taghex: string,
        boostJobId: string,
        boostJobProofId: string,
        metadataHash: string,
        minerPubKeyHash: string,
        time: number,
        difficulty: number,
        energy: number,
    },
    signals: any[]
};
