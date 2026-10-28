import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Calendar,
  Eye, 
  Edit3, 
  Trash2, 
  MoreVertical,
  X,
  ExternalLink
} from 'lucide-react';
import { customerService } from '../services/customerService';
import { DataTable } from '../components/ui/DataTable';
import { StatusBadge } from '../components/ui/StatusBadge';
import { CustomerFormModal } from '../components/forms/CustomerFormModal';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../context/ToastContext';

export const Customers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [customers, setCustomers] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortAsc, setSortAsc] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Drawers
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await customerService.getCustomers({
        page,
        pageSize,
        search,
        tier: '',
        sortBy,
        sortAsc
      });

      let filtered = res.data || [];
      if (statusFilter !== 'All') {
        filtered = filtered.filter(c => (c.account_status || 'Active') === statusFilter);
      }

      setCustomers(filtered);
      setTotal(res.total);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error('Error fetching customers:', err);
      toast.error('Failed to load customers directory.');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, search, statusFilter, sortBy, sortAsc, toast]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSort = (columnKey) => {
    if (sortBy === columnKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(columnKey);
      setSortAsc(true);
    }
  };

  const handleAddNew = () => {
    setSelectedCustomer(null);
    setIsFormOpen(true);
  };

  const handleEdit = (cust) => {
    setSelectedCustomer(cust);
    setIsFormOpen(true);
  };

  const handleDeletePrompt = (cust) => {
    setSelectedCustomer(cust);
    setIsConfirmOpen(true);
  };

  const handleSaveCustomer = async (formData) => {
    setIsSaving(true);
    try {
      if (selectedCustomer) {
        const updated = await customerService.updateCustomer(selectedCustomer.id, formData);
        setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c));
        toast.success(`Customer "${updated.full_name}" updated!`);
      } else {
        const created = await customerService.createCustomer(formData);
        setCustomers(prev => [created, ...prev]);
        setTotal(prev => prev + 1);
        toast.success(`Customer "${created.full_name}" registered!`);
      }
      setIsFormOpen(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error('Error saving customer:', err);
      toast.error('Failed to save customer.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCustomer) return;
    setIsSaving(true);
    try {
      await customerService.deleteCustomer(selectedCustomer.id);
      setCustomers(prev => prev.filter(c => c.id !== selectedCustomer.id));
      setTotal(prev => Math.max(0, prev - 1));
      toast.success(`Customer "${selectedCustomer.full_name}" deleted.`);
      setIsConfirmOpen(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error('Error deleting customer:', err);
      toast.error('Failed to delete customer.');
    } finally {
      setIsSaving(false);
    }
  };

  const columns = [
    {
      header: 'Customer Name',
      accessor: 'full_name',
      className: 'font-serif font-semibold text-slate-900',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-aubergine text-gold font-bold text-xs flex items-center justify-center shrink-0 border border-gold/40">
            {row.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'CU'}
          </div>
          <div>
            <button
              onClick={() => setViewCustomer(row)}
              className="font-bold text-slate-900 text-sm hover:text-gold block text-left"
            >
              {row.full_name}
            </button>
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" />
              {row.city || 'Bigfork'}, {row.state || 'MT'}
            </span>
          </div>
        </div>
      )
    },
    {
      header: 'Email',
      accessor: 'email',
      render: (row) => (
        <div className="flex flex-col text-xs">
          <a href={`mailto:${row.email}`} className="text-slate-800 hover:text-aubergine font-medium">
            {row.email}
          </a>
          {row.phone && (
            <a href={`tel:${row.phone}`} className="text-slate-500 hover:text-slate-700 text-[11px]">
              {row.phone}
            </a>
          )}
        </div>
      )
    },
    {
      header: 'Customer ID',
      accessor: 'customer_id',
      render: (row) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
          {row.customer_id || `CUST-${row.id?.slice(-4).toUpperCase() || '1000'}`}
        </span>
      )
    },
    {
      header: 'Registration Date',
      accessor: 'created_at',
      className: 'text-xs text-slate-600',
      render: (row) => (
        <span className="text-slate-600">
          {row.created_at ? new Date(row.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Oct 2026'}
        </span>
      )
    },
    {
      header: 'Total Orders',
      accessor: 'orders_count',
      className: 'font-mono text-center',
      render: (row) => (
        <div>
          <span className="font-bold text-slate-900 text-sm block">
            {row.orders_count || 0} order(s)
          </span>
          <span className="text-[10px] text-slate-500 font-sans">
            ${Number(row.total_spent || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>
      )
    },
    {
      header: 'Account Status',
      accessor: 'account_status',
      render: (row) => {
        const st = row.account_status || 'Active';
        const isAct = st === 'Active';
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${
            isAct
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-amber-50 text-amber-700 border-amber-200'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isAct ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {st}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            Customers / Users
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage storefront registered collectors, buyer profiles, and order histories.
          </p>
        </div>

        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-aubergine hover:bg-aubergine-light text-white text-xs font-bold font-serif uppercase tracking-wider transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-gold" />
          Add Customer
        </button>
      </div>

      {/* Dynamic Data Table */}
      <DataTable
        columns={columns}
        data={customers}
        total={total}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        sortBy={sortBy}
        sortAsc={sortAsc}
        onSort={handleSort}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search customer by name, email, or Customer ID..."
        isLoading={isLoading}
        onView={setViewCustomer}
        onEdit={handleEdit}
        onDelete={handleDeletePrompt}
        editLabel="Edit Customer"
        emptyTitle="No customers found"
        emptyDescription="Register your primary clientele and high-value precious metals collectors here."
        filterComponent={
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2.5 py-2 focus:ring-1 focus:ring-aubergine focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending Verification">Pending Verification</option>
          </select>
        }
      />

      {/* Customer Form Modal */}
      <CustomerFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setSelectedCustomer(null);
        }}
        onSave={handleSaveCustomer}
        initialData={selectedCustomer}
        isLoading={isSaving}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setSelectedCustomer(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Customer Profile"
        message={`Are you sure you want to delete the record for "${selectedCustomer?.full_name}"? This action cannot be undone.`}
        confirmText="Delete Customer"
        isLoading={isSaving}
      />

      {/* Right-Side Slide-Over Drawer for Customer Details */}
      {viewCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setViewCustomer(null)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl border-l border-slate-200 flex flex-col">
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-aubergine text-gold font-bold text-sm flex items-center justify-center border border-gold/40">
                    {viewCustomer.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'CU'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-slate-900">
                      {viewCustomer.full_name}
                    </h3>
                    <span className="font-mono text-xs text-slate-500">
                      {viewCustomer.customer_id || `CUST-${viewCustomer.id?.slice(-4).toUpperCase()}`}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setViewCustomer(null)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans mb-3">
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <a href={`mailto:${viewCustomer.email}`} className="text-aubergine hover:underline font-medium">
                        {viewCustomer.email}
                      </a>
                    </div>
                    {viewCustomer.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-700">{viewCustomer.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-700">{viewCustomer.city || 'Bigfork'}, {viewCustomer.state || 'MT'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans mb-3">
                    Purchasing & Order Summary
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-500 block">Total Orders</span>
                      <span className="text-lg font-bold font-mono text-slate-900">
                        {viewCustomer.orders_count || 0}
                      </span>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-xs text-slate-500 block">Total Spent</span>
                      <span className="text-lg font-bold font-mono text-aubergine">
                        ${Number(viewCustomer.total_spent || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {viewCustomer.notes && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans mb-2">
                      Collector Notes & Preferences
                    </h4>
                    <p className="text-xs text-slate-700 p-3 bg-amber-50/60 border border-amber-200/60 rounded-xl leading-relaxed">
                      {viewCustomer.notes}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans mb-3">
                    Account Status
                  </h4>
                  <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-xs font-medium text-slate-600">Current Status</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {viewCustomer.account_status || 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    setViewCustomer(null);
                    handleEdit(viewCustomer);
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Customer
                </button>
                <button
                  onClick={() => {
                    setViewCustomer(null);
                    navigate('/orders');
                  }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-aubergine text-white text-xs font-semibold hover:bg-aubergine-light"
                >
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  View Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
