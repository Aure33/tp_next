export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  sku: string;
  category: string;
  brand: string;
  images: {
    main: string;
    gallery: string[];
  };
  specs: Record<string, string | number | boolean>;
  similar: string[];
}
