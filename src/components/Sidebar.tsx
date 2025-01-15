import React from 'react';
import { LayoutDashboard, Users, Laptop, Wrench, BoxesIcon, FileText, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Devices', href: '/devices', icon: Laptop },
  { name: 'Repairs', href: '/repairs', icon: Wrench },
  { name: 'Inventory', href: '/inventory', icon: BoxesIcon },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white">
      <div className="flex items-center justify-center h-16 border-b border-gray-800">
        <Laptop className="w-8 h-8 mr-2" />
        <span className="text-xl font-bold">Device Tracker</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="py-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-sm ${
                    location.pathname === item.href
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}