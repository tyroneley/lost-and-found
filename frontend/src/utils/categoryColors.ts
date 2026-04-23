export interface CategoryColor {
  name: string;
  color: string;
  backgroundColor: string;
}

export const categoryColorMap: Record<string, CategoryColor> = {
  Electronics: {
    name: 'Electronics',
    color: '#07669e',
    backgroundColor: '#e0f2fe',
  },
  'Personal Belonging': {
    name: 'Personal Belonging',
    color: '#059669',
    backgroundColor: '#ecfdf5',
  },
  Clothing: {
    name: 'Clothing',
    color: '#db2777',
    backgroundColor: '#fce7f3',
  },
  'Sports Equipment': {
    name: 'Sports Equipment',
    color: '#f59e0b',
    backgroundColor: '#fef3c7',
  },
  Other: {
    name: 'Other',
    color: '#4b5563',
    backgroundColor: '#f3f4f6',
  },
};

export function getCategoryColor(category: string): CategoryColor {
  return categoryColorMap[category] || categoryColorMap['Other'];
}
