export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
}

export interface Device {
  id: string;
  customerId: string;
  type: string;
  brand: string;
  model: string;
  serialNumber: string;
  issue: string;
  status: 'received' | 'in_progress' | 'waiting_parts' | 'repaired' | 'ready_pickup' | 'completed';
  estimatedCompletionDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RepairNote {
  id: string;
  deviceId: string;
  technicianId: string;
  note: string;
  createdAt: Date;
}

export interface Part {
  id: string;
  name: string;
  description: string;
  price: number;
  stockLevel: number;
  minimumStock: number;
}