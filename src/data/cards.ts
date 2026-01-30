export type Rarity =
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Double Rare'
  | 'Art Rare'
  | 'Super Rare'
  | 'Special Art Rare'
  | 'Immersive Rare'
  | 'Crown Rare'

export interface CardsData {
  cardRarities: Record<string, Rarity>
  cardsByRarity: Record<Rarity, number[]>
  slotRates: {
    '4': Record<Rarity, number>
    '5': Record<Rarity, number>
  }
}
