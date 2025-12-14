export interface Client {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export type QuotationStatus = 'Draft' | 'Sent' | 'Accepted' | 'Rejected';

export interface Quotation {
  id: string;
  number: string; // e.g., Q-2023-001
  date: string;
  validUntil: string;
  clientId: string;
  clientName: string; // Denormalized for easier display
  items: LineItem[];
  subtotal: number;
  taxRate: number; // Percentage (e.g., 10 for 10%)
  taxAmount: number;
  total: number;
  status: QuotationStatus;
  notes?: string;
}

export const initialClients: Client[] = [
  {
    id: 'c1',
    name: 'Acme Corp',
    email: 'contact@acme.com',
    address: '123 Industrial Way, Tech City',
    phone: '(555) 123-4567',
  },
  {
    id: 'c2',
    name: 'Globex Corporation',
    email: 'procurement@globex.com',
    address: '456 Global Blvd, Metropolis',
    phone: '(555) 987-6543',
  },
  {
    id: 'c3',
    name: 'Soylent Corp',
    email: 'info@soylent.com',
    address: '789 Green Ave, Eco Town',
    phone: '(555) 555-5555',
  },
];

export const initialQuotations: Quotation[] = [
  {
    id: 'q1',
    number: 'QT-2024-001',
    date: '2024-03-10',
    validUntil: '2024-04-10',
    clientId: 'c1',
    clientName: 'Acme Corp',
    items: [
      { id: 'i1', description: 'Web Development Services', quantity: 1, unitPrice: 5000 },
      { id: 'i2', description: 'Hosting Setup', quantity: 1, unitPrice: 200 },
    ],
    subtotal: 5200,
    taxRate: 10,
    taxAmount: 520,
    total: 5720,
    status: 'Sent',
    notes: 'Payment terms: 50% upfront, 50% upon completion.',
  },
  {
    id: 'q2',
    number: 'QT-2024-002',
    date: '2024-03-12',
    validUntil: '2024-04-12',
    clientId: 'c2',
    clientName: 'Globex Corporation',
    items: [
      { id: 'i3', description: 'Consulting Hours', quantity: 10, unitPrice: 150 },
    ],
    subtotal: 1500,
    taxRate: 10,
    taxAmount: 150,
    total: 1650,
    status: 'Draft',
    notes: 'Preliminary estimate based on initial requirements.',
  },
  {
    id: 'q3',
    number: 'QT-2024-003',
    date: '2024-02-28',
    validUntil: '2024-03-28',
    clientId: 'c1',
    clientName: 'Acme Corp',
    items: [
      { id: 'i4', description: 'Annual Maintenance Contract', quantity: 1, unitPrice: 1200 },
    ],
    subtotal: 1200,
    taxRate: 10,
    taxAmount: 120,
    total: 1320,
    status: 'Accepted',
  },
];
