import React, { createContext, useContext, useState, useEffect } from 'react';
import { type Product, type ProductColor } from '../data/products';

export interface CartItem {
  id: string; // unique cart item id (product.id + color + size)
  product: Product;
  selectedColor: ProductColor;
  selectedSize: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, selectedColor: ProductColor, selectedSize: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  shippingCost: number;
  finalTotal: number;
  appliedDiscount: number;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  promoCode: string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 250;
const STANDARD_SHIPPING_COST = 20;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const localData = localStorage.getItem('lumiere_cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('lumiere_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (
    product: Product,
    selectedColor: ProductColor,
    selectedSize: string,
    quantity: number = 1
  ) => {
    const itemKey = `${product.id}-${selectedColor.name}-${selectedSize}`;

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemKey,
            product,
            selectedColor,
            selectedSize,
            quantity
          }
        ];
      }
    });

    openCart();
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setDiscountPercent(0);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'YOUNES15' || cleanCode === 'SARTORIAL15' || cleanCode === 'WELCOME15') {
      setPromoCode(cleanCode);
      setDiscountPercent(15);
      return { success: true, message: 'تم تطبيق خصم 15% بنجاح!' };
    } else if (cleanCode === 'VIP20') {
      setPromoCode(cleanCode);
      setDiscountPercent(20);
      return { success: true, message: 'تم تطبيق خصم كبار الشخصيات 20%!' };
    } else {
      return { success: false, message: 'رمز القسيمة غير صحيح. جرب "YOUNES15"' };
    }
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const appliedDiscount = Math.round((subtotal * discountPercent) / 100);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_COST;
  const finalTotal = Math.max(0, subtotal - appliedDiscount + shippingCost);

  return (
    <CartContext.Provider
      value={{
        cart,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        shippingCost,
        finalTotal,
        appliedDiscount,
        applyPromoCode,
        promoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
