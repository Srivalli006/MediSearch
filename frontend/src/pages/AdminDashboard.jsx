import React, { useState, useEffect } from 'react';
import {
  Users, Building2, Shield, Activity, Package, CheckCircle, XCircle,
  Loader2, Trash2, BarChart2, AlertCircle, FlaskConical, RefreshCw
} from 'lucide-react';
import axios from 'axios';

const API = 'http://localhost:5000/api';
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem('token')}` });

const DEPT_COLORS = {
  General:'#6366f1', Cardiology:'#ef4444', Paediatrics:'#f59e0b',
  Dermatology:'#ec4899', Orthopaedics:'#14b8a6', Neurology:'#8b5cf6',
  Oncology:'#f97316', ENT:'#84cc16', Psychiatry:'#a78bfa', Pulmonology:'#38bdf8',
  Gynaecology:'#db2777', Ophthalmology:'#06b6d4'
};

const AdminDashboard = () => {
  const [stats, setStats]             = useState(null);
  const [users, setUsers]             = useState([]);
  const [pharmacies, setPharmacies]   = useState([]);
  const [medicines, setMedicines]     = useState([]);
  const [deptStats, setDeptStats]     = useState({ searchStats:[], medicineStats:[] });
  const [activeTab, setActiveTab]     = useState('overview');
  const [loading, setLoading]         = useState(true);
  const [toast, setToast]             = useState(null);

  const showToast = (msg, type='success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000); };

  const loadAll = async () => {
    setLoading(true);
    try {
      const headers = authHeader();
      const [s, u, p, m, d] = await Promise.all([
        axios.get(`${API}/admin/stats`,            { headers }),
        axios.get(`${API}/admin/users`,            { headers }),
        axios.get(`${API}/admin/pharmacies`,       { headers }),
        axios.get(`${API}/admin/medicines`,        { headers }),
        axios.get(`${API}/admin/department-stats`, { headers }),
      ]);
      setStats(s.data); setUsers(u.data); setPharmacies(p.data);
      setMedicines(m.data); setDeptStats(d.data);
    } catch { showToast('Failed to load dashboard data', 'error'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadAll(); }, []);

  const verifyPharmacy = async (id) => {
    try {
      await axios.put(`${API}/admin/pharmacies/${id}/verify`, {}, { headers: authHeader() });
      setPharmacies(prev => prev.map(p => p._id===id ? { ...p, isVerified:true } : p));
      showToast('Pharmacy verified successfully');
    } catch { showToast('Failed to verify pharmacy', 'error'); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`${API}/admin/users/${id}`, { headers: authHeader() });
      setUsers(prev => prev.filter(u => u._id!==id));
      showToast('User deleted');
    } catch (err) { showToast(err.response?.data?.message || 'Failed to delete user', 'error'); }
  };

  const deletePharmacy = async (id) => {
    if (!window.confirm('Remove this pharmacy and its inventory?')) return;
    try {
      await axios.delete(`${API}/admin/pharmacies/${id}`, { headers: authHeader() });
      setPharmacies(prev => prev.filter(p => p._id!==id));
      showToast('Pharmacy removed');
    } catch { showToast('Failed to remove pharmacy', 'error'); }
  };

  const deleteMedicine = async (id) => {
    if (!window.confirm('Remove this medicine from catalog?')) return;
    try {
      await axios.delete(`${API}/admin/medicines/${id}`, { headers: authHeader() });
      setMedicines(prev => prev.filter(m => m._id!==id));
      showToast('Medicine removed');
    } catch { showToast('Failed to remove medicine', 'error'); }
  };

  const tabs = [
    { id:'overview',   label:'Overview',   icon:Activity },
    { id:'users',      label:'Users',      icon:Users },
    { id:'pharmacies', label:'Pharmacies', icon:Building2 },
    { id:'medicines',  label:'Medicines',  icon:Package },
    { id:'analytics',  label:'Analytics',  icon:BarChart2 },
  ];

  // Max value for bar chart scaling
  const maxSearch = Math.max(...deptStats.searchStats.map(s=>s.count), 1);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'2rem' }}>
      {/* Toast */}
      {toast && (
        <div style={{ position:'fixed', top:'80px', right:'1.5rem', zIndex:9999, padding:'0.75rem 1.25rem',
          borderRadius:'var(--radius-md)', background: toast.type==='error' ? 'rgba(244,63,94,0.95)' : 'rgba(16,185,129,0.95)',
          color:'white', display:'flex', alignItems:'center', gap:'0.5rem', boxShadow:'0 10px 30px rgba(0,0,0,0.3)' }}>
          {toast.type==='error' ? <AlertCircle size={16}/> : <CheckCircle size={16}/>} {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <h1 style={{ fontSize:'2rem', marginBottom:'0.5rem' }}>Admin Control Center</h1>
          <p style={{ color:'var(--text-secondary)', margin:0 }}>Monitor and manage the entire MediSearch system.</p>
        </div>
        <button className="btn btn-secondary" onClick={loadAll} style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
          <RefreshCw size={16}/> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:'0.25rem', background:'rgba(15,23,42,0.5)', padding:'0.3rem', borderRadius:'var(--radius-lg)', border:'1px solid var(--surface-border)', width:'fit-content' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
            padding:'0.45rem 1rem', border:'none', borderRadius:'var(--radius-md)', cursor:'pointer',
            display:'flex', alignItems:'center', gap:'0.4rem', fontSize:'0.85rem', fontWeight:500, transition:'all 0.2s',
            background: activeTab===t.id ? 'var(--surface-hover)' : 'transparent',
            color: activeTab===t.id ? 'white' : 'var(--text-secondary)'
          }}><t.icon size={14}/> {t.label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'4rem', gap:'1rem', color:'var(--text-secondary)' }}><Loader2 size={28} className="animate-spin"/> Loading data...</div>
      ) : (
        <>
          {/* OVERVIEW TAB */}
          {activeTab==='overview' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              <div className="grid-cols-4">
                {[
                  { label:'Total Users',        value: stats?.totalUsers,         icon:Users,     color:'var(--primary)',   bg:'rgba(79,70,229,0.1)' },
                  { label:'Active Pharmacies',  value: stats?.verifiedPharmacies, icon:Building2, color:'var(--secondary)', bg:'rgba(16,185,129,0.1)' },
                  { label:'Pending Approval',   value: stats?.pendingPharmacies,  icon:Shield,    color:'#F59E0B',          bg:'rgba(245,158,11,0.1)' },
                  { label:'Total Medicines',    value: stats?.totalMedicines,     icon:Package,   color:'var(--accent)',    bg:'rgba(244,63,94,0.1)' },
                ].map((s,i) => (
                  <div key={i} className="glass-panel" style={{ padding:'1.5rem', display:'flex', alignItems:'center', gap:'1rem' }}>
                    <div style={{ padding:'1rem', background:s.bg, borderRadius:'var(--radius-md)', color:s.color }}><s.icon size={24}/></div>
                    <div><h3 style={{ fontSize:'1.75rem', margin:0 }}>{s.value}</h3><p style={{ color:'var(--text-secondary)', fontSize:'0.9rem', margin:0 }}>{s.label}</p></div>
                  </div>
                ))}
              </div>

              {/* Pending pharmacies */}
              <div className="glass-panel" style={{ padding:'1.5rem' }}>
                <h2 style={{ fontSize:'1.1rem', margin:'0 0 1rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <Shield size={18} color="var(--primary)"/> Pending Pharmacy Approvals
                </h2>
                {pharmacies.filter(p=>!p.isVerified).length === 0 ? (
                  <p style={{ color:'var(--text-secondary)', margin:0 }}>All pharmacies are verified. ✅</p>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                    {pharmacies.filter(p=>!p.isVerified).map(p => (
                      <div key={p._id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'1rem', background:'rgba(15,23,42,0.4)', borderRadius:'var(--radius-sm)' }}>
                        <div>
                          <h4 style={{ margin:0, fontWeight:500 }}>{p.name}</h4>
                          <p style={{ margin:0, fontSize:'0.8rem', color:'var(--text-secondary)' }}>Owner: {p.ownerId?.name} • {p.address}</p>
                        </div>
                        <div style={{ display:'flex', gap:'0.5rem' }}>
                          <button className="btn btn-primary" style={{ padding:'0.4rem 0.8rem', background:'var(--secondary)', display:'flex', alignItems:'center', gap:'0.35rem', fontSize:'0.85rem' }} onClick={() => verifyPharmacy(p._id)}>
                            <CheckCircle size={14}/> Verify
                          </button>
                          <button className="btn btn-secondary" style={{ padding:'0.4rem 0.8rem', color:'var(--accent)', display:'flex', alignItems:'center', gap:'0.35rem', fontSize:'0.85rem' }} onClick={() => deletePharmacy(p._id)}>
                            <XCircle size={14}/> Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* USERS TAB */}
          {activeTab==='users' && (
            <div className="glass-panel" style={{ overflow:'hidden' }}>
              <div style={{ padding:'1.5rem', borderBottom:'1px solid var(--surface-border)' }}>
                <h2 style={{ fontSize:'1.1rem', margin:0 }}>All Users ({users.length})</h2>
              </div>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead style={{ background:'rgba(15,23,42,0.4)' }}>
                  <tr>
                    {['Name','Email','Role','Joined','Actions'].map(h=>(
                      <th key={h} style={{ padding:'0.75rem 1rem', color:'var(--text-secondary)', fontWeight:500, fontSize:'0.85rem', textAlign:'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} style={{ borderBottom:'1px solid var(--surface-border)' }} className="table-row-hover">
                      <td style={{ padding:'0.85rem 1rem', fontWeight:500 }}>{u.name}</td>
                      <td style={{ padding:'0.85rem 1rem', color:'var(--text-secondary)', fontSize:'0.9rem' }}>{u.email}</td>
                      <td style={{ padding:'0.85rem 1rem' }}>
                        <span style={{ padding:'0.2rem 0.65rem', borderRadius:'var(--radius-full)', fontSize:'0.78rem', fontWeight:600,
                          background: u.role==='admin'?'rgba(244,63,94,0.15)':u.role==='pharmacy_owner'?'rgba(79,70,229,0.15)':'rgba(16,185,129,0.15)',
                          color: u.role==='admin'?'var(--accent)':u.role==='pharmacy_owner'?'var(--primary)':'var(--secondary)'
                        }}>{u.role}</span>
                      </td>
                      <td style={{ padding:'0.85rem 1rem', color:'var(--text-secondary)', fontSize:'0.85rem' }}>{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                      <td style={{ padding:'0.85rem 1rem' }}>
                        <button className="btn btn-secondary" style={{ padding:'0.35rem 0.6rem', color:'var(--accent)', borderColor:'rgba(244,63,94,0.2)' }} onClick={()=>deleteUser(u._id)}><Trash2 size={14}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <style>{`.table-row-hover:hover { background: var(--surface-hover) !important; }`}</style>
            </div>
          )}

          {/* PHARMACIES TAB */}
          {activeTab==='pharmacies' && (
            <div className="glass-panel" style={{ overflow:'hidden' }}>
              <div style={{ padding:'1.5rem', borderBottom:'1px solid var(--surface-border)' }}>
                <h2 style={{ fontSize:'1.1rem', margin:0 }}>All Pharmacies ({pharmacies.length})</h2>
              </div>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead style={{ background:'rgba(15,23,42,0.4)' }}>
                  <tr>
                    {['Name','Owner','Address','Status','Actions'].map(h=>(
                      <th key={h} style={{ padding:'0.75rem 1rem', color:'var(--text-secondary)', fontWeight:500, fontSize:'0.85rem', textAlign:'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pharmacies.map(p => (
                    <tr key={p._id} style={{ borderBottom:'1px solid var(--surface-border)' }} className="table-row-hover">
                      <td style={{ padding:'0.85rem 1rem', fontWeight:500 }}>{p.name}</td>
                      <td style={{ padding:'0.85rem 1rem', color:'var(--text-secondary)', fontSize:'0.9rem' }}>{p.ownerId?.name}</td>
                      <td style={{ padding:'0.85rem 1rem', color:'var(--text-secondary)', fontSize:'0.85rem', maxWidth:'200px' }}>{p.address}</td>
                      <td style={{ padding:'0.85rem 1rem' }}>
                        {p.isVerified ? <span className="badge badge-success">Verified</span> : <span className="badge badge-warning">Pending</span>}
                      </td>
                      <td style={{ padding:'0.85rem 1rem' }}>
                        <div style={{ display:'flex', gap:'0.5rem' }}>
                          {!p.isVerified && (
                            <button className="btn btn-primary" style={{ padding:'0.35rem 0.75rem', background:'var(--secondary)', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'0.3rem' }} onClick={()=>verifyPharmacy(p._id)}>
                              <CheckCircle size={13}/> Verify
                            </button>
                          )}
                          <button className="btn btn-secondary" style={{ padding:'0.35rem 0.6rem', color:'var(--accent)', borderColor:'rgba(244,63,94,0.2)' }} onClick={()=>deletePharmacy(p._id)}><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* MEDICINES TAB */}
          {activeTab==='medicines' && (
            <div className="glass-panel" style={{ overflow:'hidden' }}>
              <div style={{ padding:'1.5rem', borderBottom:'1px solid var(--surface-border)' }}>
                <h2 style={{ fontSize:'1.1rem', margin:0 }}>Medicine Catalog ({medicines.length})</h2>
              </div>
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead style={{ background:'rgba(15,23,42,0.4)' }}>
                  <tr>
                    {['Name','Manufacturer','Composition','Department','Actions'].map(h=>(
                      <th key={h} style={{ padding:'0.75rem 1rem', color:'var(--text-secondary)', fontWeight:500, fontSize:'0.85rem', textAlign:'left' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {medicines.map(m => {
                    const dc = DEPT_COLORS[m.department] || '#6366f1';
                    return (
                      <tr key={m._id} style={{ borderBottom:'1px solid var(--surface-border)' }} className="table-row-hover">
                        <td style={{ padding:'0.85rem 1rem', fontWeight:500 }}>{m.name}</td>
                        <td style={{ padding:'0.85rem 1rem', color:'var(--text-secondary)', fontSize:'0.9rem' }}>{m.manufacturer}</td>
                        <td style={{ padding:'0.85rem 1rem' }}>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:'0.25rem' }}>
                            {(m.composition||[]).map((c,i)=>(
                              <span key={i} style={{ padding:'0.15rem 0.5rem', borderRadius:'var(--radius-full)', background:'rgba(16,185,129,0.1)', color:'var(--secondary)', fontSize:'0.72rem', display:'flex', alignItems:'center', gap:'0.25rem' }}>
                                <FlaskConical size={10}/>{c}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding:'0.85rem 1rem' }}>
                          <span style={{ padding:'0.2rem 0.65rem', borderRadius:'var(--radius-full)', background:`${dc}18`, border:`1px solid ${dc}35`, color:dc, fontSize:'0.78rem', fontWeight:600 }}>{m.department}</span>
                        </td>
                        <td style={{ padding:'0.85rem 1rem' }}>
                          <button className="btn btn-secondary" style={{ padding:'0.35rem 0.6rem', color:'var(--accent)', borderColor:'rgba(244,63,94,0.2)' }} onClick={()=>deleteMedicine(m._id)}><Trash2 size={14}/></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {activeTab==='analytics' && (
            <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {/* Department Medicine Count */}
              <div className="glass-panel" style={{ padding:'1.5rem' }}>
                <h2 style={{ fontSize:'1.1rem', margin:'0 0 1.5rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <Package size={18} color="var(--primary)"/> Medicines by Department
                </h2>
                <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                  {deptStats.medicineStats.map(s => {
                    const max = Math.max(...deptStats.medicineStats.map(d=>d.medicines), 1);
                    const dc = DEPT_COLORS[s._id] || '#6366f1';
                    return (
                      <div key={s._id} style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                        <span style={{ minWidth:'130px', fontSize:'0.85rem', color:'var(--text-secondary)' }}>{s._id}</span>
                        <div style={{ flex:1, background:'rgba(255,255,255,0.05)', borderRadius:'var(--radius-full)', height:'10px', overflow:'hidden' }}>
                          <div style={{ height:'100%', width:`${(s.medicines/max)*100}%`, background:`${dc}`, borderRadius:'var(--radius-full)', transition:'width 0.8s ease' }}/>
                        </div>
                        <span style={{ minWidth:'30px', fontSize:'0.85rem', fontWeight:600, color:dc, textAlign:'right' }}>{s.medicines}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Search Demand by Department */}
              <div className="glass-panel" style={{ padding:'1.5rem' }}>
                <h2 style={{ fontSize:'1.1rem', margin:'0 0 0.5rem', display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <BarChart2 size={18} color="var(--secondary)"/> Department-Wise Search Demand
                </h2>
                <p style={{ color:'var(--text-secondary)', fontSize:'0.85rem', margin:'0 0 1.5rem' }}>Tracks which departments users search most frequently.</p>
                {deptStats.searchStats.length === 0 ? (
                  <p style={{ color:'var(--text-secondary)' }}>No search activity yet. Data appears after users perform searches.</p>
                ) : (
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
                    {deptStats.searchStats.map(s => {
                      const dc = DEPT_COLORS[s._id] || '#6366f1';
                      return (
                        <div key={s._id} style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                          <span style={{ minWidth:'130px', fontSize:'0.85rem', color:'var(--text-secondary)' }}>{s._id}</span>
                          <div style={{ flex:1, background:'rgba(255,255,255,0.05)', borderRadius:'var(--radius-full)', height:'10px', overflow:'hidden' }}>
                            <div style={{ height:'100%', width:`${(s.count/maxSearch)*100}%`, background:dc, borderRadius:'var(--radius-full)', transition:'width 0.8s ease' }}/>
                          </div>
                          <span style={{ minWidth:'40px', fontSize:'0.85rem', fontWeight:600, color:dc, textAlign:'right' }}>{s.count} searches</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
