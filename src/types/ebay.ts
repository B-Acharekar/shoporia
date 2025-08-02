export interface EbayItem {
  itemId: string;
  title: string;
  price?: {
    value: string;
    currency: string;
  };
  image?: {
    imageUrl: string;
  };
  additionalImages?: {
    imageUrl: string;
  }[];
resolvedImage?: string;

}

export interface EbayResponse {
  items: EbayItem[];
  total: number;
  perPage: number;
  page: number;
  totalPages: number;
}