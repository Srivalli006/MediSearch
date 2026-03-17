import React, { useState, useEffect } from 'react';
import { Plus, Package, AlertTriangle, Edit2, Trash2, Search, Loader2, X, FlaskConical, AlertCircle, CheckCircle, Building2, RefreshCw } from 'lucide-react';
import axios from 'axios';
import { createPortal } from 'react-dom';

const API = 'http://localhost:5000/api';
const token = () => localStorage.getItem('token');
const user  = () => JSON.parse(localStorage.getItem('user') || '{}');

const LOW_STOCK = 20;

const PharmacyDashboard = () => {
  const [inventory, setInventory]       = useState([]);
  const [medicines, setMedicines]       = useState([]);
  const [pharmacies, setPharmacies]     = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [searchTerm, setSearchTerm]     = useState('');
  const [loading, setLoading]           = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem]         = useState(null);
  const [showRegModal, setShowRegModal] = useState(false);
  const [toast, setToast]               = useState(null);

  const [form, setForm] = useState({ medicineId:'', stockQuantity:'', price:'', expiryDate:'' });
  const [medicineSearchTerm, setMedicineSearchTerm] = useState('');
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
  const [dbStatus, setDbStatus] = useState({ connected: true, dbStatus: 'Checking...', dbName: '' });

  // For registering a new pharmacy
  const [pharmForm, setPharmForm] = useState({ name: '', address: '', lat: '', lng: '', contactNumber: '' });
  const [registering, setRegistering] = useState(false);

  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const loadPharmacies = async () => {
    try {
      const { data } = await axios.get(`${API}/pharmacies/my`, { headers:{ Authorization:`Bearer ${token()}` } });
      setPharmacies(data);
      if (data.length > 0) setSelectedPharmacy(data[0]._id);
    } catch (e) { showToast('Failed to load pharmacies', 'error'); }
    finally { setLoading(false); }
  };

  // Load pharmacies owned by this user & DB status
  useEffect(() => { 
    loadPharmacies(); 
    axios.get(`${API}/status/db`).then(res => setDbStatus(res.data)).catch(() => {});
  }, []);

  // Load medicine catalog & inventory when pharmacy selected
  useEffect(() => {
    if (!selectedPharmacy) return;
    const load = async () => {
      setLoading(true);
      try {
        const [invRes, medRes] = await Promise.all([
          axios.get(`${API}/inventory/pharmacy/${selectedPharmacy}`),
          axios.get(`${API}/search/catalog`)
        ]);
        setInventory(invRes.data);
        setMedicines(medRes.data);
      } catch { showToast('Failed to load inventory', 'error'); }
      finally { setLoading(false); }
    };
    load();
  }, [selectedPharmacy]);

  const refreshInventory = async () => {
    if (!selectedPharmacy) return;
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/inventory/pharmacy/${selectedPharmacy}`);
      setInventory(data);
      showToast('Inventory refreshed');
    } catch { showToast('Refresh failed', 'error'); }
    finally { setLoading(false); }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    console.log('🚀 Saving inventory item...', form);
    try {
      if (editItem) {
        await axios.put(`${API}/inventory/${editItem._id}`,
          { stockQuantity: form.stockQuantity, price: form.price, expiryDate: form.expiryDate },
          { headers:{ Authorization:`Bearer ${token()}` } });
        showToast('Inventory updated');
      } else {
        const res = await axios.post(`${API}/inventory/add`,
          { ...form, pharmacyId: selectedPharmacy },
          { headers:{ Authorization:`Bearer ${token()}` } });
        console.log('✅ Medicine added:', res.data);
        showToast('Medicine added to inventory');
      }
      
      // Close modal first for better UX
      setShowAddModal(false); 
      setEditItem(null); 
      setForm({ medicineId:'', stockQuantity:'', price:'', expiryDate:'' });
      setMedicineSearchTerm('');
      
      // Refresh inventory list
      setLoading(true);
      const { data } = await axios.get(`${API}/inventory/pharmacy/${selectedPharmacy}`);
      console.log('📦 Refetched inventory:', data);
      setInventory(data);
    } catch (err) { 
      console.error('❌ Error saving item:', err);
      const errMsg = err.response?.data?.message || 'Error saving item';
      showToast(errMsg, 'error'); 
      alert(`Backend Error: ${errMsg}\nCheck console for details.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this medicine from inventory?')) return;
    try {
      await axios.delete(`${API}/inventory/${id}`, { headers:{ Authorization:`Bearer ${token()}` } });
      setInventory(prev => prev.filter(i => i._id !== id));
      showToast('Item removed');
    } catch { showToast('Failed to delete item', 'error'); }
  };

  const openEdit = (item) => {
    setEditItem(item);
    setForm({
      medicineId: item.medicineId?._id || '',
      stockQuantity: item.stockQuantity,
      price: item.price,
      expiryDate: item.expiryDate ? item.expiryDate.slice(0,10) : ''
    });
    setShowAddModal(true);
  };

  const handleRegisterPharmacy = async (e) => {
    e.preventDefault();
    setRegistering(true);
    try {
      await axios.post(`${API}/pharmacies/register`, pharmForm, { headers: { Authorization: `Bearer ${token()}` } });
      showToast('Pharmacy Profile Created!');
      setPharmForm({ name: '', address: '', lat: '', lng: '', contactNumber: '' });
      setShowRegModal(false);
      await loadPharmacies();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create pharmacy', 'error');
    } finally {
      setRegistering(false);
    }
  };

  const filtered = inventory.filter(i => i.medicineId?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  // If loading initially, show loader
  if (loading && pharmacies.length === 0) {
    return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'50vh', color:'var(--text-secondary)' }}><Loader2 size={32} className="animate-spin"/></div>
  }

  // If user has NO pharmacies, show the registration form
  if (pharmacies.length === 0) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', maxWidth:'600px', margin:'2rem auto' }}>
        {toast && (
          <div style={{ padding:'0.75rem 1.25rem', borderRadius:'var(--radius-md)', background: toast.type==='error' ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)', color: toast.type==='error' ? 'var(--accent)' : 'var(--secondary)', border:`1px solid ${toast.type==='error'?'rgba(244,63,94,0.3)':'rgba(16,185,129,0.3)'}`, display:'flex', alignItems:'center', gap:'0.5rem' }}>
            {toast.type==='error' ? <AlertCircle size={16}/> : <CheckCircle size={16}/>} {toast.msg}
          </div>
        )}
        <div className="glass-panel" style={{ padding:'2.5rem' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
            <Building2 size={28} color="var(--primary)"/>
            <h1 style={{ fontSize:'1.75rem', margin:0 }}>Register Pharmacy</h1>
          </div>
          <p style={{ color:'var(--text-secondary)', marginBottom:'2rem' }}>You need to create your pharmacy profile before managing inventory.</p>
          
          <form onSubmit={handleRegisterPharmacy} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
            <div>
              <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Pharmacy Name</label>
              <input type="text" placeholder="e.g. Apollo Pharmacy" value={pharmForm.name} onChange={e=>setPharmForm(p=>({...p,name:e.target.value}))} required/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Address</label>
              <input type="text" placeholder="e.g. 123 Main St, City" value={pharmForm.address} onChange={e=>setPharmForm(p=>({...p,address:e.target.value}))} required/>
            </div>
            <div>
              <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Contact Number</label>
              <input type="text" placeholder="+91 9876543210" value={pharmForm.contactNumber} onChange={e=>setPharmForm(p=>({...p,contactNumber:e.target.value}))} required/>
            </div>
            <div style={{ display:'flex', gap:'1rem' }}>
              <div style={{ flex:1 }}>
                <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Latitude (GPS)</label>
                <input type="number" step="any" placeholder="17.3850" value={pharmForm.lat} onChange={e=>setPharmForm(p=>({...p,lat:e.target.value}))} required/>
              </div>
              <div style={{ flex:1 }}>
                <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Longitude (GPS)</label>
                <input type="number" step="any" placeholder="78.4867" value={pharmForm.lng} onChange={e=>setPharmForm(p=>({...p,lng:e.target.value}))} required/>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding:'0.9rem', marginTop:'0.5rem' }} disabled={registering}>
              {registering ? 'Creating Profile...' : 'Create Pharmacy Profile'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', top:'80px', right:'1.5rem', zIndex:9999, padding:'0.75rem 1.25rem', borderRadius:'var(--radius-md)',
          background: toast.type==='error' ? 'rgba(244,63,94,0.95)' : 'rgba(16,185,129,0.95)',
          color:'white', display:'flex', alignItems:'center', gap:'0.5rem', boxShadow:'0 10px 30px rgba(0,0,0,0.3)', animation:'fadeIn 0.2s ease' }}>
          {toast.type==='error' ? <AlertCircle size={16}/> : <CheckCircle size={16}/>} {toast.msg}
        </div>
      )}

      {/* DB Status Banner */}
      {dbStatus.dbStatus === 'In-Memory' && (
        <div style={{ 
          background: 'rgba(245, 158, 11, 0.1)', 
          border: '1px solid rgba(245, 158, 11, 0.3)', 
          color: '#F59E0B', 
          padding: '1rem 1.5rem', 
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backdropFilter: 'blur(10px)'
        }}>
          <AlertTriangle size={20} />
          <div>
            <strong style={{ display: 'block' }}>Local Persistence Mode: In-Memory</strong>
            <span style={{ fontSize: '0.85rem' }}>The server could not connect to MongoDB Atlas. Data you add will be lost when the server restarts. <a href="#" onClick={(e) => { e.preventDefault(); alert("To fix this, please whitelist your current IP address in the MongoDB Atlas Network Access settings."); }} style={{ color: '#F59E0B', textDecoration: 'underline' }}>How to fix?</a></span>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem' }}>
        <div>
          <h1 style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>Pharmacy Dashboard</h1>
          <p style={{ color:'var(--text-secondary)', margin:0 }}>Manage your inventory and medicine stock.</p>
        </div>
        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', alignItems:'center' }}>
          {pharmacies.length > 0 && (
            <select value={selectedPharmacy} onChange={e=>setSelectedPharmacy(e.target.value)}
              style={{ padding:'0.5rem 1rem', borderRadius:'var(--radius-md)', background:'var(--surface)', border:'1px solid var(--surface-border)', color:'white' }}>
              {pharmacies.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
            </select>
          )}
          <div style={{ display:'flex', gap:'0.75rem' }}>
            <button className="btn btn-secondary" onClick={refreshInventory} title="Refresh List" disabled={loading}>
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button className="btn btn-secondary" onClick={() => setShowRegModal(true)} style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
              <Building2 size={18} /> Add Pharmacy
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => { setEditItem(null); setForm({ medicineId:'', stockQuantity:'', price:'', expiryDate:'' }); setMedicineSearchTerm(''); setShowAddModal(true); }} 
              style={{ display:'flex', alignItems:'center', gap:'0.4rem', opacity: (selectedPharmacy && !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified) ? 0.6 : 1, cursor: (selectedPharmacy && !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified) ? 'not-allowed' : 'pointer' }}
              disabled={selectedPharmacy && !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified}
              title={selectedPharmacy && !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified ? "Admin approval pending" : "Add Medicine"}
            >
              <Plus size={18} /> Add Medicine
            </button>
          </div>
        </div>
      </div>

      {/* Verification Status Banner */}
      {selectedPharmacy && pharmacies.find(p => p._id === selectedPharmacy) && !pharmacies.find(p => p._id === selectedPharmacy).isVerified && (
        <div style={{ 
          background: 'rgba(244, 63, 94, 0.1)', 
          border: '1px solid rgba(244, 63, 94, 0.3)', 
          color: 'var(--accent)', 
          padding: '1rem 1.5rem', 
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          backdropFilter: 'blur(10px)',
          marginBottom: '1rem'
        }}>
          <AlertCircle size={20} />
          <div>
            <strong style={{ display: 'block' }}>Wait for Admin Response</strong>
            <span style={{ fontSize: '0.85rem' }}>Your pharmacy is not yet approved. You will be able to add medicines and manage inventory once the admin approves your request.</span>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid-cols-3">
        {[
          { label:'Total Medicines', value: inventory.length, color:'var(--primary)', bg:'rgba(79,70,229,0.1)', icon: Package },
          { label:'Low Stock', value: inventory.filter(i=>i && i.stockQuantity>0&&i.stockQuantity<=LOW_STOCK).length, color:'#F59E0B', bg:'rgba(245,158,11,0.1)', icon: AlertTriangle },
          { label:'Out of Stock', value: inventory.filter(i=>i && i.stockQuantity===0).length, color:'var(--accent)', bg:'rgba(244,63,94,0.1)', icon: Package },
        ].map((s,i) => (
          <div key={i} className="glass-panel" style={{ padding:'1.5rem', display:'flex', alignItems:'center', gap:'1rem' }}>
            <div style={{ padding:'1rem', background:s.bg, borderRadius:'var(--radius-md)', color:s.color }}><s.icon size={24}/></div>
            <div><h3 style={{ fontSize:'1.75rem', margin:0 }}>{s.value}</h3><p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', margin:0 }}>{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="glass-panel" style={{ overflow:'hidden' }}>
        <div style={{ padding:'1.5rem', borderBottom:'1px solid var(--surface-border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h2 style={{ fontSize:'1.25rem', margin:0 }}>Inventory List</h2>
          <div style={{ position:'relative' }}>
            <Search size={16} color="var(--text-secondary)" style={{ position:'absolute', left:'0.75rem', top:'50%', transform:'translateY(-50%)' }}/>
            <input type="text" placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
              style={{ paddingLeft:'2.25rem', paddingRight:'1rem', paddingTop:'0.45rem', paddingBottom:'0.45rem', width:'220px' }}/>
          </div>
        </div>
        {loading ? (
          <div style={{ padding:'3rem', textAlign:'center', color:'var(--text-secondary)', display:'flex', alignItems:'center', justifyContent:'center', gap:'0.75rem' }}><Loader2 size={24} className="animate-spin"/> Loading inventory...</div>
        ) : (
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', textAlign:'left' }}>
              <thead style={{ background:'rgba(15,23,42,0.4)' }}>
                <tr>
                  {['Medicine', 'Composition', 'Stock', 'Price (₹)', 'Expiry', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding:'0.75rem 1rem', color:'var(--text-secondary)', fontWeight:500, fontSize:'0.85rem' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => (
                  <tr key={item._id} style={{ borderBottom:'1px solid var(--surface-border)' }} className="table-row-hover">
                    <td style={{ padding:'0.9rem 1rem', fontWeight:500 }}>{item.medicineId?.name || 'Unknown Medicine'}</td>
                    <td style={{ padding:'0.9rem 1rem' }}>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.25rem' }}>
                        {(item.medicineId?.composition||[]).slice(0,2).map((c,i)=>(
                          <span key={i} style={{ padding:'0.15rem 0.5rem', borderRadius:'var(--radius-full)', background:'rgba(16,185,129,0.1)', color:'var(--secondary)', fontSize:'0.72rem' }}>{c}</span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding:'0.9rem 1rem' }}>{item.stockQuantity}</td>
                    <td style={{ padding:'0.9rem 1rem' }}>₹{item.price}</td>
                    <td style={{ padding:'0.9rem 1rem', fontSize:'0.85rem', color:'var(--text-secondary)' }}>{new Date(item.expiryDate).toLocaleDateString('en-IN')}</td>
                    <td style={{ padding:'0.9rem 1rem' }}>
                      {item.stockQuantity===0 ? <span className="badge badge-danger">Out of Stock</span>
                        : item.stockQuantity<=LOW_STOCK ? <span className="badge badge-warning">Low Stock</span>
                        : <span className="badge badge-success">In Stock</span>}
                    </td>
                    <td style={{ padding:'0.9rem 1rem' }}>
                      <div style={{ display:'flex', gap:'0.5rem' }}>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding:'0.35rem 0.6rem', opacity: !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified ? 0.6 : 1, cursor: !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified ? 'not-allowed' : 'pointer' }} 
                          onClick={()=>openEdit(item)} 
                          title={!pharmacies.find(p => p._id === selectedPharmacy)?.isVerified ? "Admin approval pending" : "Edit"}
                          disabled={!pharmacies.find(p => p._id === selectedPharmacy)?.isVerified}
                        >
                          <Edit2 size={14}/>
                        </button>
                        <button 
                          className="btn btn-secondary" 
                          style={{ padding:'0.35rem 0.6rem', color:'var(--accent)', borderColor:'rgba(244,63,94,0.2)', opacity: !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified ? 0.6 : 1, cursor: !pharmacies.find(p => p._id === selectedPharmacy)?.isVerified ? 'not-allowed' : 'pointer' }} 
                          onClick={()=>handleDelete(item._id)} 
                          title={!pharmacies.find(p => p._id === selectedPharmacy)?.isVerified ? "Admin approval pending" : "Delete"}
                          disabled={!pharmacies.find(p => p._id === selectedPharmacy)?.isVerified}
                        >
                          <Trash2 size={14}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length===0 && <tr><td colSpan={7} style={{ padding:'2rem', textAlign:'center', color:'var(--text-secondary)' }}>No inventory items found.</td></tr>}
              </tbody>
            </table>
            <style>{`.table-row-hover:hover { background: var(--surface-hover) !important; }`}</style>
          </div>
        )}
      </div>
      {/* Add/Edit Modal */}
      {showAddModal && createPortal(
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
          <div className="glass-panel animate-fade-in" style={{ width:'100%', maxWidth:'520px', padding:'2.5rem', position:'relative', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 25px 50px -12px rgba(0,0,0,0.5)', maxHeight:'90vh', overflowY:'auto' }}>
            <button onClick={()=>{ setShowAddModal(false); setEditItem(null); setMedicineSearchTerm(''); setShowMedicineDropdown(false); }} style={{ position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', color:'var(--text-secondary)', cursor:'pointer' }}><X size={20}/></button>
            <h2 style={{ margin:'0 0 1.5rem' }}>{editItem ? 'Edit Inventory Item' : 'Add Medicine to Inventory'}</h2>
            <form onSubmit={handleAddOrUpdate} style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
              {!editItem && (
                <div>
                  <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Medicine</label>
                  <div style={{ position:'relative' }}>
                    <Search size={16} color="var(--text-secondary)" style={{ position:'absolute', left:'0.75rem', top:'50%', transform:'translateY(-50%)', zIndex: 2 }}/>
                    <input 
                      type="text" 
                      placeholder="Search for a medicine..." 
                      value={medicineSearchTerm} 
                      onChange={e => {
                        setMedicineSearchTerm(e.target.value);
                        setShowMedicineDropdown(true);
                      }}
                      onFocus={() => setShowMedicineDropdown(true)}
                      onBlur={() => setTimeout(() => setShowMedicineDropdown(false), 200)}
                      style={{ paddingLeft:'2.5rem', width:'100%', background:'var(--surface)', border:'1px solid var(--surface-border)', color: 'white' }}
                    />
                    
                    {/* Clear selection button if a medicine is already selected */}
                    {form.medicineId && (
                       <button 
                         type="button"
                         onClick={() => {
                           setForm(f => ({...f, medicineId: ''}));
                           setMedicineSearchTerm('');
                           setShowMedicineDropdown(true);
                         }}
                         style={{ position:'absolute', right:'0.75rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', color:'var(--text-secondary)', cursor:'pointer', zIndex: 2 }}>
                         <X size={14}/>
                       </button>
                    )}
                    {showMedicineDropdown && (
                      <div style={{ 
                        position:'absolute', 
                        top:'100%', 
                        left:0, 
                        right:0, 
                        background:'#1e293b',
                        border:'1px solid var(--surface-border)', 
                        borderRadius:'var(--radius-md)', 
                        marginTop:'0.25rem', 
                        maxHeight:'200px', 
                        overflowY:'auto', 
                        zIndex: 100,
                        boxShadow:'0 10px 25px -5px rgba(0, 0, 0, 0.7)' 
                      }}>
                        {medicines.filter(m => m && m.name && m.name.toLowerCase().includes(medicineSearchTerm.toLowerCase())).length > 0 ? (
                          medicines.filter(m => m && m.name && m.name.toLowerCase().includes(medicineSearchTerm.toLowerCase())).map(m => (
                          <div 
                            key={m._id} 
                            onMouseDown={(e) => {
                              e.preventDefault();
                              setForm(f => ({...f, medicineId: m._id}));
                              setMedicineSearchTerm(m.name);
                              setShowMedicineDropdown(false);
                            }}
                            style={{ padding:'0.75rem 1rem', cursor:'pointer', borderBottom:'1px solid rgba(255,255,255,0.05)', background: form.medicineId === m._id ? 'var(--surface-hover)' : 'transparent' }}
                            className="medicine-dropdown-item"
                          >
                            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem' }}>
                              <FlaskConical size={14} color="var(--primary)"/>
                              <div>
                                <div style={{ fontWeight: 500 }}>{m.name}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{m.manufacturer}</div>
                              </div>
                            </div>
                          </div>
                        ))
                        ) : (
                           <div style={{ padding:'1rem', textAlign:'center', color:'var(--text-secondary)', fontSize:'0.85rem' }}>No matches</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {[
                { label:'Stock Quantity', key:'stockQuantity', type:'number', ph:'e.g. 50', min:'0' },
                { label:'Price (₹)', key:'price', type:'number', ph:'e.g. 15', min:'0' },
                { label:'Expiry Date', key:'expiryDate', type:'date', ph:'' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>{f.label}</label>
                  <input type={f.type} placeholder={f.ph} min={f.min} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))} required/>
                </div>
              ))}
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex:1 }} onClick={()=>{ setShowAddModal(false); setEditItem(null); setMedicineSearchTerm(''); setShowMedicineDropdown(false); }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex:1 }}>{editItem ? 'Update' : 'Add to Inventory'}</button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Register Pharmacy Modal */}
      {showRegModal && createPortal(
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.8)', zIndex:9999, display:'flex', alignItems:'center', justifyContent:'center', backdropFilter:'blur(8px)' }}>
          <div className="glass-panel animate-fade-in" style={{ width:'100%', maxWidth:'550px', padding:'2.5rem', position:'relative', border:'1px solid rgba(255,255,255,0.1)', boxShadow:'0 25px 50px -12px rgba(0,0,0,0.5)', maxHeight:'90vh', overflowY:'auto' }}>
            <button onClick={()=>setShowRegModal(false)} style={{ position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', color:'var(--text-secondary)', cursor:'pointer' }}><X size={20}/></button>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.5rem' }}>
              <Building2 size={24} color="var(--primary)"/>
              <h2 style={{ margin:0 }}>Register New Pharmacy</h2>
            </div>
            <p style={{ color:'var(--text-secondary)', marginBottom:'1.5rem', fontSize:'0.9rem' }}>Add another pharmacy to your management profile.</p>
            <form onSubmit={handleRegisterPharmacy} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>
              <div>
                <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Pharmacy Name</label>
                <input type="text" placeholder="e.g. Apollo Pharmacy Branch 2" value={pharmForm.name} onChange={e=>setPharmForm(p=>({...p,name:e.target.value}))} required/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Address</label>
                <input type="text" placeholder="e.g. 456 Main St, City" value={pharmForm.address} onChange={e=>setPharmForm(p=>({...p,address:e.target.value}))} required/>
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Contact Number</label>
                <input type="text" placeholder="+91 9876543210" value={pharmForm.contactNumber} onChange={e=>setPharmForm(p=>({...p,contactNumber:e.target.value}))} required/>
              </div>
              <div style={{ display:'flex', gap:'1rem' }}>
                <div style={{ flex:1 }}>
                  <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Latitude</label>
                  <input type="number" step="any" placeholder="17.3850" value={pharmForm.lat} onChange={e=>setPharmForm(p=>({...p,lat:e.target.value}))} required/>
                </div>
                <div style={{ flex:1 }}>
                  <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.4rem' }}>Longitude</label>
                  <input type="number" step="any" placeholder="78.4867" value={pharmForm.lng} onChange={e=>setPharmForm(p=>({...p,lng:e.target.value}))} required/>
                </div>
              </div>
              <div style={{ display:'flex', gap:'0.75rem', marginTop:'0.5rem' }}>
                <button type="button" className="btn btn-secondary" style={{ flex:1 }} onClick={()=>setShowRegModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex:1 }} disabled={registering}>
                  {registering ? 'Registering...' : 'Register Pharmacy'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default PharmacyDashboard;
