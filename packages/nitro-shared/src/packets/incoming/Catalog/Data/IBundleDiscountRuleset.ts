export interface IBundleDiscountRuleset {
    readonly maxPurchaseSize: number;
    readonly bundleSize: number;
    readonly bundleDiscountSize: number;
    readonly bonusThreshold: number;
    readonly additionalBonusDiscountThresholdQuantities: number[];
}
