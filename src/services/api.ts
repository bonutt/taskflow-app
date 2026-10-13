// API publica usada na Home: https://dummyjson.com/quotes/random

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export async function getRandomQuote(): Promise<Quote> {
  const response = await fetch('https://dummyjson.com/quotes/random');

  if (!response.ok) {
    throw new Error('Erro ao buscar a frase');
  }

  const data: Quote = await response.json();
  return data;
}
