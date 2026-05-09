import { Laptop, Criteria, MetricCard, User } from '@/types/dashboard.type';
import { Laptop as LaptopIcon, SlidersHorizontal } from 'lucide-react';

/**
 * DUMMY DATA - Untuk development purposes
 * Ganti dengan data dari API/Database di production
 */

export const dummyUser: User = {
  id: '1',
  username: 'Admin User',
  role: 'admin',
};

export const dummyLaptops: Laptop[] = [
  {
    id: '1',
    name: 'ThinkPad X1 Carbon',
    price: 8500000,
    cpuScore: 95,
    ram: 16,
    storage: 512,
    performanceScore: 92,
    conditionScore: 95,
    age: 2,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Dell XPS 13',
    price: 10200000,
    cpuScore: 98,
    ram: 16,
    storage: 256,
    performanceScore: 95,
    conditionScore: 85,
    age: 1,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'HP Pavilion 14',
    price: 5400000,
    cpuScore: 75,
    ram: 8,
    storage: 256,
    performanceScore: 72,
    conditionScore: 70,
    age: 3,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-03-05'),
  },
  {
    id: '4',
    name: 'MacBook Air M1',
    price: 12000000,
    cpuScore: 100,
    ram: 16,
    storage: 512,
    performanceScore: 98,
    conditionScore: 95,
    age: 2,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
];

export const dummyCriteria: Criteria[] = [
  {
    id: '1',
    name: 'Harga',
    weight: 0.3,
    type: 'cost',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Performa',
    weight: 0.4,
    type: 'benefit',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Kondisi',
    weight: 0.2,
    type: 'benefit',
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Usia',
    weight: 0.1,
    type: 'cost',
    isActive: true,
    createdAt: new Date(),
  },
];

export const dummyMetrics: MetricCard[] = [
  {
    title: 'Total Laptops',
    value: 124,
    description: 'Inventory units tracked',
    icon: LaptopIcon,
    bgIcon: 'bg-primary text-white',
  },
  {
    title: 'Total Criteria',
    value: 5,
    description: 'SMART weight parameters',
    icon: SlidersHorizontal,
    bgIcon: 'bg-secondary text-white',
  },
];
