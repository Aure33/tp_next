export interface SponsoredProduct {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  onlineStoreUrl?: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
  tags: string[];
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  products: {
    edges: {
      node: SponsoredProduct;
    }[];
  };
}
