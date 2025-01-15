import React, { useState } from 'react';
import { ClipboardList, Clock, AlertTriangle, CheckCircle, Package, Timer, X, Phone } from 'lucide-react';
import { format } from 'date-fns';

const stats = [
  { name: 'Active Repairs', value: '24', icon: ClipboardList, color: 'blue' },
  { name: 'Pending Pickup', value: '8', icon: Clock, color: 'green' },
  { name: 'Urgent', value: '3', icon: AlertTriangle, color: 'red' },
  { name: 'Completed Today', value: '12', icon: CheckCircle, color: 'indigo' },
];

interface Repair {
  id: string;
  customer: string;
  device: string;
  issue: string;
  startDate: Date;
  estimatedCompletion: Date;
  technician: string;
  priority: 'high' | 'medium' | 'low';
  status: 'diagnosing' | 'repairing' | 'waiting_parts';
}

interface PendingPickup {
  id: string;
  customer: string;
  device: string;
  readyDate: Date;
  contactAttempts: number;
  phone: string;
}

interface RepairUpdateModal {
  isOpen: boolean;
  repair: Repair | null;
}

const initialRepairs: Repair[] = [
  {
    id: '1',
    customer: 'John Doe',
    device: 'MacBook Pro 2021',
    issue: "Won't power on",
    startDate: new Date('2024-03-14'),
    estimatedCompletion: new Date('2024-03-17'),
    technician: 'Mike Wilson',
    priority: 'high',
    status: 'diagnosing'
  },
  {
    id: '2',
    customer: 'Sarah Brown',
    device: 'iPhone 14 Pro',
    issue: 'Cracked screen',
    startDate: new Date('2024-03-15'),
    estimatedCompletion: new Date('2024-03-16'),
    technician: 'Alice Johnson',
    priority: 'medium',
    status: 'repairing'
  },
  {
    id: '3',
    customer: 'Robert Chen',
    device: 'Dell XPS 15',
    issue: 'Battery replacement',
    startDate: new Date('2024-03-13'),
    estimatedCompletion: new Date('2024-03-18'),
    technician: 'David Smith',
    priority: 'low',
    status: 'waiting_parts'
  }
];

const initialPickups: PendingPickup[] = [
  {
    id: '1',
    customer: 'John Doe',
    device: 'MacBook Pro 2021',
    readyDate: new Date('2024-03-15'),
    contactAttempts: 2,
    phone: '(555) 123-4567',
  },
  {
    id: '2',
    customer: 'Jane Smith',
    device: 'iPhone 13',
    readyDate: new Date('2024-03-14'),
    contactAttempts: 1,
    phone: '(555) 987-6543',
  },
  {
    id: '3',
    customer: 'Mike Johnson',
    device: 'Samsung Galaxy S21',
    readyDate: new Date('2024-03-13'),
    contactAttempts: 3,
    phone: '(555) 456-7890',
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-800';
    case 'medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'diagnosing':
      return 'bg-purple-100 text-purple-800';
    case 'repairing':
      return 'bg-blue-100 text-blue-800';
    case 'waiting_parts':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function Dashboard() {
  const [repairs, setRepairs] = useState<Repair[]>(initialRepairs);
  const [pickups, setPickups] = useState<PendingPickup[]>(initialPickups);
  const [modal, setModal] = useState<RepairUpdateModal>({
    isOpen: false,
    repair: null
  });

  const handleUpdateClick = (repair: Repair) => {
    setModal({ isOpen: true, repair });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (modal.repair) {
      setModal({
        ...modal,
        repair: { ...modal.repair, status: e.target.value as Repair['status'] }
      });
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (modal.repair) {
      setModal({
        ...modal,
        repair: { ...modal.repair, priority: e.target.value as Repair['priority'] }
      });
    }
  };

  const handleSave = () => {
    if (modal.repair) {
      setRepairs(repairs.map(repair => 
        repair.id === modal.repair?.id ? modal.repair : repair
      ));
      setModal({ isOpen: false, repair: null });
    }
  };

  const handleContactCustomer = (pickup: PendingPickup) => {
    setPickups(pickups.map(p => 
      p.id === pickup.id 
        ? { ...p, contactAttempts: p.contactAttempts + 1 }
        : p
    ));
  };

  const handleMarkPickedUp = (pickupId: string) => {
    setPickups(pickups.filter(p => p.id !== pickupId));
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white rounded-lg shadow-sm p-6 flex items-center"
            >
              <div className={`p-3 rounded-lg bg-${stat.color}-100 mr-4`}>
                <Icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Repairs Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Timer className="w-6 h-6 text-blue-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Active Repairs</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer/Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technician
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timeline
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {repairs.map((repair) => (
                  <tr key={repair.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{repair.customer}</div>
                      <div className="text-sm text-gray-500">{repair.device}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{repair.issue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{repair.technician}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(repair.status)}`}>
                        {repair.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(repair.priority)}`}>
                        {repair.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        <div>Start: {format(repair.startDate, 'MMM d')}</div>
                        <div>Est: {format(repair.estimatedCompletion, 'MMM d')}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleUpdateClick(repair)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Update
                        </button>
                        <button className="text-green-600 hover:text-green-900 font-medium">
                          Complete
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

      {/* Pending Pickups Section */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Package className="w-6 h-6 text-green-600 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Pending Pickups</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer/Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ready Since
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Attempts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pickups.map((pickup) => (
                  <tr key={pickup.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{pickup.customer}</div>
                      <div className="text-sm text-gray-500">{pickup.device}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {format(pickup.readyDate, 'MMM d, yyyy')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {format(pickup.readyDate, 'h:mm a')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pickup.contactAttempts >= 3 
                          ? 'bg-red-100 text-red-800'
                          : pickup.contactAttempts >= 2
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {pickup.contactAttempts} attempts
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{pickup.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleContactCustomer(pickup)}
                          className="flex items-center text-blue-600 hover:text-blue-900 font-medium"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Contact
                        </button>
                        <button 
                          onClick={() => handleMarkPickedUp(pickup.id)}
                          className="text-green-600 hover:text-green-900 font-medium"
                        >
                          Picked Up
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

      {/* Update Modal */}
      {modal.isOpen && modal.repair && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Repair Status
              </h3>
              <button
                onClick={() => setModal({ isOpen: false, repair: null })}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer/Device
                </label>
                <p className="text-sm text-gray-900">
                  {modal.repair.customer} - {modal.repair.device}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={modal.repair.status}
                  onChange={handleStatusChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="diagnosing">Diagnosing</option>
                  <option value="repairing">Repairing</option>
                  <option value="waiting_parts">Waiting for Parts</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  value={modal.repair.priority}
                  onChange={handlePriorityChange}
                  className="w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex items-center justify-end p-4 border-t gap-4">
              <button
                onClick={() => setModal({ isOpen: false, repair: null })}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}