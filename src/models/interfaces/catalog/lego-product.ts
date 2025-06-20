export interface LegoProduct {
  id: string;
  key: string;
  name: string;
  slug: string;
  description: string;
  numberOfPieces: number;
  recommendedAge: string;
  categoryId: string;
  price: {
    value: number;
    withDiscountValue?: number;
    currency: string;
  };
  images: string[];
  sku: string;
}
