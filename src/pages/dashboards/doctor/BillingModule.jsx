import React, { useState } from 'react';
import { 
  DollarSign, Download, Plus, Search, Eye, 
  Trash2, X, FileText, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

// --- SUB-COMPONENT: INVOICE FORM MODAL ---
const InvoiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: '', service: '', amount: '', status: 'Pending', date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl border border-gray-100"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="bg-[#13c5dd]/10 p-2 rounded-lg text-[#13c5dd]">
              <Plus size={20} />
            </div>
            Create New Invoice
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Patient Name</label>
            <input required type="text" name="patientName" value={formData.patientName} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="e.g. Rahul Sharma" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Service / Treatment</label>
            <input required type="text" name="service" value={formData.service} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="e.g. Root Canal Therapy" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Amount (₹)</label>
              <input required type="number" name="amount" value={formData.amount} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" placeholder="0.00" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Date</label>
              <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Payment Status</label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none">
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-[#13c5dd] text-white py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-colors shadow-lg shadow-[#13c5dd]/20 mt-2">
            Generate Invoice
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- SUB-COMPONENT: BILL PREVIEW MODAL ---
const BillPreviewModal = ({ bill, isOpen, onClose }) => {
  if (!isOpen || !bill) return null;

  const handleDownload = () => {
    const content = `
    INVOICE #${bill.id}
    -------------------------
    Date: ${bill.date}
    Patient: ${bill.patient}
    Service: ${bill.service || 'Medical Services'}
    
    TOTAL AMOUNT: ₹${bill.amount}
    STATUS: ${bill.status}
    -------------------------
    Care Connect Medical Center
    `;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${bill.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Invoice downloaded");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden relative"
      >
        <div className="bg-gray-900 p-6 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={20}/></button>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 text-[#13c5dd]">
            <CheckCircle size={24} />
          </div>
          <h3 className="text-lg font-bold">Payment Receipt</h3>
          <p className="text-gray-400 text-xs mt-1">Transaction ID: {bill.id}</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <span className="text-gray-500 text-sm">Amount Paid</span>
            <span className="text-2xl font-bold text-gray-900">₹{bill.amount}</span>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Patient</span>
              <span className="font-semibold text-gray-900">{bill.patient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date</span>
              <span className="font-semibold text-gray-900">{bill.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status</span>
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                bill.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {bill.status}
              </span>
            </div>
          </div>

          <button 
            onClick={handleDownload}
            className="w-full bg-[#13c5dd] text-white py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <Download size={18} /> Download Receipt
          </button>
        </div>
        
        {/* Receipt Cutout Effect */}
        <div className="absolute top-0 left-0 w-full h-4 -mt-2 bg-transparent" 
             style={{ backgroundImage: 'radial-gradient(circle, transparent 50%, white 50%)', backgroundSize: '20px 20px', backgroundRepeat: 'repeat-x' }}>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN MODULE ---
const BillingModule = () => {
  const [bills, setBills] = useState([
    { id: 'INV-001', patient: 'Alice Johnson', service: 'Root Canal', amount: 5000, date: '2025-10-24', status: 'Paid' },
    { id: 'INV-002', patient: 'Bob Smith', service: 'Consultation', amount: 1200, date: '2025-10-22', status: 'Pending' },
    { id: 'INV-003', patient: 'Charlie Brown', service: 'Teeth Whitening', amount: 8000, date: '2025-10-20', status: 'Paid' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [previewBill, setPreviewBill] = useState(null);

  // --- STATS CALCULATION ---
  const totalEarnings = bills.filter(b => b.status === 'Paid').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const pendingDues = bills.filter(b => b.status === 'Pending').reduce((acc, curr) => acc + Number(curr.amount), 0);

  // --- HANDLERS ---
  const handleCreate = (data) => {
    const newBill = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      patient: data.patientName,
      service: data.service,
      amount: data.amount,
      date: data.date,
      status: data.status
    };
    setBills([newBill, ...bills]);
    toast.success('Invoice generated successfully');
  };

  const handleDelete = (id) => {
    if(confirm('Are you sure you want to delete this invoice?')) {
      setBills(bills.filter(b => b.id !== id));
      toast.success('Invoice deleted');
    }
  };

  const filteredBills = bills.filter(b => 
    b.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Billing & Invoices</h2>
          <p className="text-gray-500 text-sm">Manage patient payments and generate bills.</p>
        </div>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="bg-[#13c5dd] text-white px-5 py-3 rounded-xl font-bold hover:bg-[#0fb3ca] transition-all shadow-lg shadow-[#13c5dd]/20 flex items-center gap-2"
        >
          <Plus size={20} /> Create Invoice
        </button>
      </div>

      {/* Financial Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#13c5dd] to-cyan-600 p-6 rounded-3xl text-white shadow-lg shadow-[#13c5dd]/20 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-medium mb-1">Total Earnings</p>
            <h3 className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</h3>
          </div>
          <DollarSign className="absolute right-4 bottom-4 text-white/20 w-16 h-16" />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-orange-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-50 p-2 rounded-lg text-orange-500"><Clock size={20} /></div>
            <p className="text-gray-500 text-sm font-medium">Pending Dues</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">₹{pendingDues.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gray-50 p-2 rounded-lg text-gray-500"><FileText size={20} /></div>
            <p className="text-gray-500 text-sm font-medium">Total Invoices</p>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{bills.length}</h3>
        </div>
      </div>

      {/* Search & List */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search by patient name or invoice ID..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#13c5dd] outline-none shadow-sm transition-all"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Invoice ID</th>
              <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Patient</th>
              <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Service</th>
              <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Amount</th>
              <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider">Status</th>
              <th className="p-4 font-bold text-gray-500 text-xs uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredBills.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-gray-500 text-sm font-mono">{b.id}</td>
                <td className="p-4 font-bold text-gray-900">{b.patient}</td>
                <td className="p-4 text-gray-600 text-sm">{b.service}</td>
                <td className="p-4 font-bold text-gray-900">₹{b.amount}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide border ${
                    b.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-100' : 
                    b.status === 'Pending' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                    'bg-red-50 text-red-700 border-red-100'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setPreviewBill(b)}
                      className="p-2 text-gray-400 hover:text-[#13c5dd] hover:bg-[#13c5dd]/10 rounded-lg transition-colors" 
                      title="View Receipt"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(b.id)}
                      className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" 
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredBills.length === 0 && (
          <div className="p-12 text-center text-gray-400">
            <p>No invoices found.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isFormOpen && <InvoiceModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} onSubmit={handleCreate} />}
        {previewBill && <BillPreviewModal isOpen={!!previewBill} bill={previewBill} onClose={() => setPreviewBill(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default BillingModule;