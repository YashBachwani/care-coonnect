import React from 'react';
import { Download, CreditCard, CheckCircle, Clock, FileText, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

const PaymentsModule = () => {
  // Mock Data
  const payments = [
    { 
      id: 'INV-001', 
      date: 'Oct 24, 2025', 
      service: 'General Consultation', 
      amount: 500, 
      status: 'Paid', 
      method: 'UPI' 
    },
    { 
      id: 'INV-002', 
      date: 'Sep 15, 2025', 
      service: 'Root Canal & X-Ray', 
      amount: 4500, 
      status: 'Paid', 
      method: 'Credit Card' 
    },
    { 
      id: 'INV-003', 
      date: 'Nov 01, 2025', 
      service: 'Teeth Whitening Advance', 
      amount: 2000, 
      status: 'Pending', 
      method: '-' 
    },
  ];

  // Calculate Stats
  const totalPaid = payments
    .filter(p => p.status === 'Paid')
    .reduce((acc, curr) => acc + curr.amount, 0);
    
  const pendingAmount = payments
    .filter(p => p.status === 'Pending')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // Format Currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Download Handler
  const handleDownloadInvoice = (invoice) => {
    const content = `
    INVOICE - CARE CONNECT
    ----------------------
    Invoice ID: ${invoice.id}
    Date:       ${invoice.date}
    Status:     ${invoice.status}
    Payment:    ${invoice.method}
    
    Service:    ${invoice.service}
    Amount:     Rs. ${invoice.amount}
    
    ----------------------
    Thank you for choosing Care Connect.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${invoice.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Invoice ${invoice.id} downloaded`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing & Payments</h2>
          <p className="text-gray-500 text-sm">Manage your invoices and payment history.</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#13c5dd] to-cyan-600 rounded-2xl p-6 text-white shadow-lg shadow-[#13c5dd]/20">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <CheckCircle size={18} />
            <span className="text-sm font-medium">Total Paid</span>
          </div>
          <h3 className="text-3xl font-bold">{formatCurrency(totalPaid)}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-orange-500">
            <Clock size={18} />
            <span className="text-sm font-medium">Pending Dues</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{formatCurrency(pendingAmount)}</h3>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <FileText size={18} />
            <span className="text-sm font-medium">Total Invoices</span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900">{payments.length}</h3>
        </div>
      </div>
      
      {/* Payments Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Invoice Details</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Service</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Method</th>
                <th className="p-5 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{p.id}</p>
                        <p className="text-xs text-gray-500">{p.date}</p>
                        {/* Mobile view service name */}
                        <p className="sm:hidden text-xs text-[#13c5dd] mt-1">{p.service}</p>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-5 hidden sm:table-cell">
                    <span className="text-sm font-medium text-gray-700">{p.service}</span>
                  </td>
                  
                  <td className="p-5">
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-bold text-gray-900">{formatCurrency(p.amount)}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'Paid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {p.status}
                      </span>
                    </div>
                  </td>

                  <td className="p-5 hidden md:table-cell">
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <CreditCard size={14} /> {p.method}
                    </span>
                  </td>
                  
                  <td className="p-5 text-right">
                    {p.status === 'Paid' && (
                      <button 
                        onClick={() => handleDownloadInvoice(p)}
                        className="text-gray-400 hover:text-[#13c5dd] hover:bg-[#13c5dd]/10 p-2 rounded-lg transition-all" 
                        title="Download Invoice"
                      >
                        <Download size={18} />
                      </button>
                    )}
                    {p.status === 'Pending' && (
                      <button className="bg-[#13c5dd] text-white text-xs px-3 py-1.5 rounded-lg hover:bg-[#0fb3ca] transition-colors shadow-sm">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsModule;