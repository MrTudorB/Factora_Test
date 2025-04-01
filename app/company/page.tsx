'use client';

import { useWalletStore } from '@/store/walletStore';
import { useState } from 'react';
import CreateInvoiceForm, { Invoice } from '@/components/company/CreateInvoiceForm';
import FactoringQuote from '@/components/company/FactoringQuote';
import InvoiceList from '@/components/company/InvoiceList';

interface CompanyData {
  companyName: string;
  email: string;
}

export default function CompanyPage() {
  const { isConnected } = useWalletStore();
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [mockInvoices, setMockInvoices] = useState<Invoice[]>([]);
  const [formData, setFormData] = useState<CompanyData>({
    companyName: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering company:', formData);
    setCompanyData(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInvoiceSubmit = (invoice: Invoice) => {
    setMockInvoices(prev => [invoice, ...prev]); // Add new invoices at the start
    console.log('New invoice created:', invoice);
  };

  const handleAcceptQuote = () => {
    if (mockInvoices.length > 0) {
      // Update the status of the latest invoice to 'Funded'
      setMockInvoices(prev => prev.map((invoice, index) => 
        index === 0 ? { ...invoice, status: 'Funded' } : invoice
      ));
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8 text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Company Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Please connect your wallet to access the Company Portal
          </p>
        </div>
      </div>
    );
  }

  if (!companyData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Register Your Company</h2>
            <p className="mt-2 text-sm text-gray-600">
              Complete this form to access the Company Dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const latestPendingInvoice = mockInvoices.find(invoice => invoice.status === 'Pending');

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
          <h2 className="text-3xl font-extrabold text-gray-900">Company Dashboard</h2>
          <div className="mt-4 border-t border-gray-200 pt-4">
            <p className="text-lg text-gray-500">Welcome, {companyData.companyName}!</p>
            <p className="mt-2 text-sm text-gray-500">Your registered email: {companyData.email}</p>
          </div>
        </div>

        {/* Create Invoice Form */}
        <CreateInvoiceForm onInvoiceSubmit={handleInvoiceSubmit} />

        {/* Factoring Quote */}
        <FactoringQuote 
          latestInvoice={latestPendingInvoice}
          onAcceptQuote={handleAcceptQuote}
        />

        {/* Invoices List */}
        <InvoiceList invoices={mockInvoices} />
      </div>
    </div>
  );
} 