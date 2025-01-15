import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import type { Device } from '../types';

// Mock data - replace with actual API calls later
const mockDevices: Device[] = [
  {
    id: '1',
    customerId: '1',
    type: 'Laptop',
    brand: 'Apple',
    model: 'MacBook Pro',
    serialNumber: 'C02XL0THJGH7',
    issue: 'Won\'t power on',
    status: 'in_progress',
    estimatedCompletionDate: new Date('2024-03-20'),
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  },
  {
    id: '2',
    customerId: '2',
    type: 'Phone',
    brand: 'Samsung',
    model: 'Galaxy S21',
    serialNumber: 'RZ8M91JZEXA',
    issue: 'Cracked screen',
    status: 'waiting_parts',
    estimatedCompletionDate: new Date('2024-03-25'),
    createdAt: new Date('2024-03-14'),
    updatedAt: new Date('2024-03-14')
  }
];

const statusColors: Record<Device['status'], { bg: string; text: string }> = {
  received: { bg: 'bg-gray-100', text: 'text-gray-800' },
  in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  waiting_parts: { bg: 'bg-red-100', text: 'text-red-800' },
  repaired: { bg: 'bg-green-100', text: 'text-green-800' },
  ready_pickup: { bg: 'bg-blue-100', text: 'text-blue-800' },
  completed: { bg: 'bg-purple-100', text: 'text-purple-800' }
};

export default function Devices() {
  const [devices] = useState<Device[]>(mockDevices);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDevices = devices.filter(device =>
    device.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Devices</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Device
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search devices..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Serial Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Completion</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDevices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{device.brand} {device.model}</div>
                    <div className="text-sm text-gray-500">{device.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{device.serialNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{device.issue}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      statusColors[device.status].bg
                    } ${statusColors[device.status].text}`}>
                      {device.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {device.estimatedCompletionDate.toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-3">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}