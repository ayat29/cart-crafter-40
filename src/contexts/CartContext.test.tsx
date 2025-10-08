import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  it('adds items to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    
    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Test Product',
        price: 10,
        image: '/test.jpg',
      });
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('updates quantity when adding same item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    const product = {
      id: '1',
      name: 'Test Product',
      price: 10,
      image: '/test.jpg',
    };

    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('calculates total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Product 1',
        price: 10,
        image: '/test.jpg',
      });
      result.current.addToCart({
        id: '2',
        name: 'Product 2',
        price: 20,
        image: '/test.jpg',
      });
    });

    expect(result.current.total).toBe(30);
  });

  it('removes items from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Test Product',
        price: 10,
        image: '/test.jpg',
      });
    });

    act(() => {
      result.current.removeFromCart('1');
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('clears cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: '1',
        name: 'Product 1',
        price: 10,
        image: '/test.jpg',
      });
      result.current.addToCart({
        id: '2',
        name: 'Product 2',
        price: 20,
        image: '/test.jpg',
      });
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });
});

