export interface CategoryColor {
  name: string;
  color: string;
  backgroundColor: string;
}

export const categoryColorMap: Record<string, CategoryColor> = {
  Electronics: {
    name: 'Electronics',
    color: '#004a87',
    backgroundColor: '#e8f2f8',
  },
  'Personal Belonging': {
    name: 'Personal Belonging',
    color: '#2e7d32',
    backgroundColor: '#e8f5e9',
  },
  Clothing: {
    name: 'Clothing',
    color: '#c2185b',
    backgroundColor: '#fce4ec',
  },
  'Sports Equipment': {
    name: 'Sports Equipment',
    color: '#e8590c',
    backgroundColor: '#fff3e0',
  },
  Other: {
    name: 'Other',
    color: '#546e7a',
    backgroundColor: '#eceff1',
  },
};

export function getCategoryColor(category: string): CategoryColor {
  return categoryColorMap[category] || categoryColorMap['Other'];
}
