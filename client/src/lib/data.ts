export interface Quote {
  id: number;
  text: string;
  author: string;
  category: string;
  isFavorite: boolean;
}

export const initialQuotes: Quote[] = [
  {
    id: 1,
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    category: "Work",
    isFavorite: false,
  },
  {
    id: 2,
    text: "Life is what happens when you're busy making other plans.",
    author: "John Lennon",
    category: "Life",
    isFavorite: true,
  },
  {
    id: 3,
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    category: "Inspiration",
    isFavorite: false,
  },
  {
    id: 4,
    text: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle",
    category: "Wisdom",
    isFavorite: false,
  },
  {
    id: 5,
    text: "Whoever is happy will make others happy too.",
    author: "Anne Frank",
    category: "Happiness",
    isFavorite: true,
  },
  {
    id: 6,
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    author: "Ralph Waldo Emerson",
    category: "Leadership",
    isFavorite: false,
  },
  {
    id: 7,
    text: "You will face many defeats in life, but never let yourself be defeated.",
    author: "Maya Angelou",
    category: "Resilience",
    isFavorite: false,
  },
  {
    id: 8,
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: "Resilience",
    isFavorite: true,
  },
  {
    id: 9,
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    author: "Abraham Lincoln",
    category: "Life",
    isFavorite: false,
  },
  {
    id: 10,
    text: "Never let the fear of striking out keep you from playing the game.",
    author: "Babe Ruth",
    category: "Sports",
    isFavorite: false,
  },
  {
    id: 11,
    text: "Money and success don’t change people; they merely amplify what is already there.",
    author: "Will Smith",
    category: "Success",
    isFavorite: false,
  },
  {
    id: 12,
    text: "Your time is limited, so don't waste it living someone else's life.",
    author: "Steve Jobs",
    category: "Life",
    isFavorite: true,
  },
];
