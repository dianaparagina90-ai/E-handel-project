import type { Order } from '../types/types';

const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (order: Order): Promise<Order> => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(order)
  });

  if (!response.ok) {
    throw new Error('Failed to create order');
  }

  return response.json();
};

export const getOrder = async (id:string): Promise<Order> => {
  const response = await fetch(`${API_URL}/orders/${id}`)
  if (!response.ok) {
    throw new Error("Kunde inte hämta ordern")
  }

  return response.json()

}

