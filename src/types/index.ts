export interface Medicine {
  id: string
  name: string
  dosage: string
  quantity: number
  unit: string
  expiryDate: string
  category: string
  notes?: string
}

export const CATEGORIES = [
  'Pain Relief',
  'First Aid',
  'Prescription',
  'Vitamins & Supplements',
  'Allergy',
  'Cold & Flu',
  'Other',
]

export const MOCK_MEDICINES: Medicine[] = [
  {
    id: '1',
    name: 'Ibuprofen',
    dosage: '200mg',
    quantity: 45,
    unit: 'tablets',
    expiryDate: '2027-05-15',
    category: 'Pain Relief',
    notes: 'Take with food',
  },
  {
    id: '2',
    name: 'Amoxicillin',
    dosage: '500mg',
    quantity: 0,
    unit: 'capsules',
    expiryDate: '2024-01-10',
    category: 'Prescription',
    notes: 'Finish full course',
  },
  {
    id: '3',
    name: 'Vitamin C',
    dosage: '1000mg',
    quantity: 120,
    unit: 'tablets',
    expiryDate: '2026-11-20',
    category: 'Vitamins & Supplements',
  },
  {
    id: '4',
    name: 'Band-Aids',
    dosage: 'Assorted',
    quantity: 15,
    unit: 'pieces',
    expiryDate: '2030-01-01',
    category: 'First Aid',
  },
  {
    id: '5',
    name: 'Loratadine',
    dosage: '10mg',
    quantity: 5,
    unit: 'tablets',
    expiryDate: '2025-08-12',
    category: 'Allergy',
    notes: 'Non-drowsy',
  },
]
