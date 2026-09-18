import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { type Product, type CategoryOption, CATEGORIES as DEFAULT_CATEGORIES, PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

interface ProductContextType {
  products: Product[];
  categories: CategoryOption[];
  isLoading: boolean;
  error: string | null;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [categories, setCategories] = useState<CategoryOption[]>(DEFAULT_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const res = await fetch(`${API_BASE}/products`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          // Normalize IDs: ensure each product has .id (backend gives _id or id)
          const normalized: Product[] = json.data.map((p: any) => ({
            ...p,
            id: p.id || p._id,
            colors: Array.isArray(p.colors) ? p.colors : [{ name: 'Default', hex: '#1A1A1A' }],
            sizes: Array.isArray(p.sizes) ? p.sizes : ['M', 'L', 'XL', 'XXL'],
            images: Array.isArray(p.images) ? p.images : [],
            details: Array.isArray(p.details) ? p.details : [],
            fabricCare: Array.isArray(p.fabricCare) ? p.fabricCare : [],
            relatedIds: Array.isArray(p.relatedIds) ? p.relatedIds : []
          }));
          setProducts(normalized);
        }
      } else {
        setProducts(DEFAULT_PRODUCTS);
      }
    } catch (err: any) {
      console.warn('[Younes Shop API] Live API fallback to default products:', err.message);
      setProducts(DEFAULT_PRODUCTS);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const mapped: CategoryOption[] = json.data.map((c: any) => ({
            id: c.slug || c.id || c._id,
            label: c.label,
            labelAr: c.labelAr || c.label,
            count: c.count || 0,
            image: c.image || '',
            description: c.description || '',
            descriptionAr: c.descriptionAr || c.description || ''
          }));
          setCategories(mapped);
        }
      }
    } catch (err) {
      console.warn('[Younes Shop API] Could not load categories from server:', err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        isLoading,
        error,
        refreshProducts: fetchProducts
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
