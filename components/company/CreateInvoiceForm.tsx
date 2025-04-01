'use client';

import { useState } from 'react';

export interface Invoice {
  id: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'Funded' | 'Paid';
  createdAt: string;
}

interface CreateInvoiceFormProps {
  onInvoiceSubmit: (invoice: Invoice) => void;
}

export default function CreateInvoiceForm({ onInvoiceSubmit }: CreateInvoiceFormProps) {
  const [formData, setFormData] = useState({
    amount: '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newInvoice: Invoice = {
      id: `INV-${Date.now()}`,
      amount: parseFloat(formData.amount),
      dueDate: formData.dueDate,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onInvoiceSubmit(newInvoice);
    setFormData({ amount: '', dueDate: '' }); // Reset form
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Invoice</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Invoice Amount (USD)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              name="amount"
              id="amount"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleInputChange}
              className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="0.00"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            id="dueDate"
            required
            value={formData.dueDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Invoice
          </button>
        </div>
      </form>
    </div>
  );
} 