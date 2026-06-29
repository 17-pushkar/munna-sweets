"use client";

import { createContext, useContext, useEffect, useState } from "react";

type CartItem = {
  name: string;
  slug: string;
  price: number;
  weight: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  increaseQuantity: (slug: string, weight: string) => void;
  decreaseQuantity: (slug: string, weight: string) => void;
  removeFromCart: (slug: string, weight: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("munna-sweets-cart");

    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("munna-sweets-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (cartItem) =>
          cartItem.slug === item.slug && cartItem.weight === item.weight
      );

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.slug === item.slug && cartItem.weight === item.weight
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, item];
    });
  };

  const increaseQuantity = (slug: string, weight: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.slug === slug && item.weight === weight
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (slug: string, weight: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.slug === slug && item.weight === weight
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (slug: string, weight: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.slug === slug && item.weight === weight))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("munna-sweets-cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}