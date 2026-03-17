import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Package, MapPin, Phone, Navigation, 
  FlaskConical, Info, Calendar, ShieldCheck, 
  Clock, CheckCircle2, AlertCircle, Building2, ChevronRight,
  MessageCircle, Zap, ShieldAlert, Baby, Car, Wine, Pill,
  Activity, Thermometer, Brain, Microscope
} from 'lucide-react';
import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/api`;

const MedicineDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [similarMedicines, setSimilarMedicines] = useState([]);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(`${API}/search/medicine/${id}`);
        setData(res.data);
        
        // Fetch similar medicines based on composition (same active ingredients)
        const catalogRes = await axios.get(`${API}/search/catalog`);
        const currentIngredients = (res.data.medicine.detailedComposition || []).map(c => c.ingredient.toLowerCase());
        
        const filtered = catalogRes.data
          .filter(m => m._id !== id)
          .map(m => {
            const matches = (m.detailedComposition || []).filter(c => 
              currentIngredients.includes(c.ingredient.toLowerCase())
            ).length;
            return { ...m, matchCount: matches };
          })
          .filter(m => m.matchCount > 0)
          .sort((a, b) => b.matchCount - a.matchCount || b.department === res.data.medicine.department)
          .slice(0, 5);

        // Fallback to department if no composition match
        if (filtered.length === 0 && res.data.medicine.department) {
          const deptMatch = catalogRes.data
            .filter(m => m.department === res.data.medicine.department && m._id !== id)
            .slice(0, 5);
          setSimilarMedicines(deptMatch);
        } else {
          setSimilarMedicines(filtered);
        }
      } catch (err) {
        setError("Failed to load medicine details. It might have been removed.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="container" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'80vh' }}>
      <div className="glass-panel pulse-animation" style={{ padding:'3rem', borderRadius:'var(--radius-lg)', textAlign:'center' }}>
        <div className="loader-ring" style={{ marginBottom:'1.5rem' }}></div>
        <h3 style={{ margin:0, letterSpacing:'0.05em' }}>Accessing Medical Catalog...</h3>
      </div>
      <style>{`
        .loader-ring { width:50px; height:50px; border:4px solid rgba(99,102,241,0.1); border-top-color:var(--primary); border-radius:50%; animation:spin 1s ease-in-out infinite; margin:0 auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        .pulse-animation { animation: pulse 2s infinite; }
      `}</style>
    </div>
  );

  if (error || !data) return (
    <div className="container" style={{ textAlign:'center', padding:'10rem 0' }}>
      <div className="glass-panel" style={{ maxWidth:'500px', margin:'0 auto', padding:'3rem', borderRadius:'var(--radius-lg)' }}>
        <AlertCircle size={48} color="var(--accent)" style={{ marginBottom:'1rem' }} />
        <h2 style={{ marginBottom:'1rem' }}>Data Unavailable</h2>
        <p style={{ color:'var(--text-secondary)', marginBottom:'2rem' }}>{error || "The medicine you are looking for could not be found."}</p>
        <Link to="/search" className="btn btn-primary">Return to Search</Link>
      </div>
    </div>
  );

  const { medicine, availability = [] } = data;
  const overview = medicine.clinicalOverview || {};

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div className="section-card">
               <h4 style={{ display:'flex', alignItems:'center', gap:'0.75rem', color:'var(--primary)', marginBottom:'1.25rem' }}>
                 <Thermometer size={20}/> Indications / Uses
               </h4>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{overview.uses || "Standard therapeutic indications apply. Consult clinical documentation for specific usage."}</p>
             </div>
             
             <div className="section-card">
               <h4 style={{ display:'flex', alignItems:'center', gap:'0.75rem', color:'var(--primary)', marginBottom:'1.25rem' }}>
                 <Microscope size={20}/> Mechanism of Action
               </h4>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{overview.mechanism || "Biochemical pathway details pending clinical review."}</p>
             </div>

             <div className="section-card">
               <h4 style={{ display:'flex', alignItems:'center', gap:'0.75rem', color:'var(--primary)', marginBottom:'1.25rem' }}>
                 <Info size={20}/> Product Description
               </h4>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{medicine.description}</p>
             </div>
          </div>
        );
      case 'safety':
        return (
          <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
             <div className="warning-card">
               <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                 <div className="icon-box warning"><Wine size={20}/></div>
                 <h4 style={{ margin:0 }}>Alcohol</h4>
               </div>
               <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', margin:0 }}>{overview.alcoholWarning || "Caution recommended: Consult pharmacist."}</p>
             </div>

             <div className="warning-card">
               <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                 <div className="icon-box success"><Baby size={20}/></div>
                 <h4 style={{ margin:0 }}>Pregnancy</h4>
               </div>
               <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', margin:0 }}>{overview.pregnancyCategory || "Safety profile available upon medical consultation."}</p>
             </div>

             <div className="warning-card">
               <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                 <div className="icon-box info"><Car size={20}/></div>
                 <h4 style={{ margin:0 }}>Driving</h4>
               </div>
               <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', margin:0 }}>{overview.drivingWarning || "Generally safe unless drowsiness occurs."}</p>
             </div>

             <div className="warning-card">
               <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1rem' }}>
                 <div className="icon-box danger"><ShieldAlert size={20}/></div>
                 <h4 style={{ margin:0 }}>Contraindications</h4>
               </div>
               <p style={{ fontSize:'0.9rem', color:'var(--text-secondary)', margin:0 }}>{overview.contraindications || "Standard allergic contraindications."}</p>
             </div>
          </div>
        );
      case 'composition':
        return (
          <div className="animate-fade-in">
             <div className="section-card" style={{ padding:0, background:'transparent', border:'none' }}>
                <h4 style={{ display:'flex', alignItems:'center', gap:'0.75rem', color:'var(--secondary)', marginBottom:'1.5rem' }}>
                  <FlaskConical size={20}/> Active Ingredients breakdown
                </h4>
                <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                  {(medicine.detailedComposition || []).map((item, idx) => (
                    <div key={idx} className="glass-panel" style={{ padding:'1.5rem', borderRadius:'var(--radius-md)', border:'1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem' }}>
                        <span style={{ fontSize:'1.1rem', fontWeight:700, color:'white' }}>{item.ingredient}</span>
                        <span className="badge badge-success" style={{ padding:'0.4rem 0.8rem' }}>{item.quantity}{item.unit}</span>
                      </div>
                      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.5rem', fontSize:'0.85rem' }}>
                        <div>
                          <div style={{ color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', fontSize:'0.7rem', marginBottom:'0.25rem' }}>How to use</div>
                          <div style={{ color:'var(--text-secondary)' }}>{item.howToUse || "As directed by physician."}</div>
                        </div>
                        <div>
                          <div style={{ color:'var(--text-muted)', fontWeight:700, textTransform:'uppercase', fontSize:'0.7rem', marginBottom:'0.25rem' }}>Storage</div>
                          <div style={{ color:'var(--text-secondary)' }}>{item.storage || "Cool, dry place."}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="container" style={{ padding: '6rem 2rem 10rem' }}>
      <style>{`
        .section-card { padding: 2.5rem; background: rgba(255,255,255,0.02); border-radius: var(--radius-lg); border: 1px solid rgba(255,255,255,0.05); }
        .warning-card { padding: 1.5rem; background: rgba(255,255,255,0.03); border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.07); transition: transform 0.3s; }
        .warning-card:hover { transform: translateY(-4px); background: rgba(255,255,255,0.05); }
        .icon-box { width: 40px; height: 40px; border-radius: 10px; display: flex; alignItems: center; justifyContent: center; }
        .icon-box.warning { background: rgba(245, 158, 11, 0.1); color: #f59e0b; }
        .icon-box.success { background: rgba(16, 185, 129, 0.1); color: #10b981; }
        .icon-box.info { background: rgba(59, 130, 246, 0.1); color: #3b82f6; }
        .icon-box.danger { background: rgba(239, 68, 68, 0.1); color: #ef4444; }
        .tab-btn { padding: 1rem 2rem; background: none; border: none; color: var(--text-secondary); cursor: pointer; font-weight: 600; font-size: 1rem; position: relative; transition: all 0.3s; }
        .tab-btn.active { color: var(--primary); }
        .tab-btn.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: var(--primary); box-shadow: 0 0 10px var(--primary-glow); }
        .similar-card { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: var(--radius-md); background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); transition: all 0.3s; cursor: pointer; text-decoration: none; margin-bottom: 0.75rem; }
        .similar-card:hover { background: rgba(255,255,255,0.05); border-color: var(--primary-glow); transform: translateX(5px); }
      `}</style>

      {/* Breadcrumb */}
      <Link to="/search" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '2.5rem', fontWeight: 600 }}>
        <ArrowLeft size={18} /> Back to medications
      </Link>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', alignItems: 'start' }}>
        
        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Header Card */}
          <section className="glass-panel" style={{ padding: '4rem', borderRadius: 'var(--radius-lg)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position:'absolute', top:'-50px', right:'-50px', width:'200px', height:'200px', background:'var(--primary)', opacity:0.05, filter:'blur(80px)', borderRadius:'50%' }}></div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <span className="badge badge-success" style={{ padding: '0.6rem 1.25rem', fontSize:'0.85rem' }}>
                <ShieldCheck size={16} style={{ marginRight: '6px', verticalAlign: 'middle' }} /> Authentic Product
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 700 }}>ID: MS-{medicine._id.slice(-6).toUpperCase()}</span>
            </div>

            <h1 style={{ fontSize: '4.5rem', lineHeight: 1.1, marginBottom: '0.75rem', letterSpacing: '-0.04em', fontWeight: 800 }}>{medicine.name}</h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '3rem', opacity: 0.8 }}>{medicine.manufacturer} Pharmaceutical</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
               <div style={{ padding:'1.25rem', background:'rgba(255,255,255,0.03)', borderRadius:'var(--radius-md)', border:'1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color:'var(--text-muted)', fontSize:'0.7rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>Therapeutic Class</div>
                  <div style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--primary)' }}>{medicine.department}</div>
               </div>
               <div style={{ padding:'1.25rem', background:'rgba(255,255,255,0.03)', borderRadius:'var(--radius-md)', border:'1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color:'var(--text-muted)', fontSize:'0.7rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:'0.5rem' }}>Verification State</div>
                  <div style={{ fontSize:'1.1rem', fontWeight:700 }}>Active License</div>
               </div>
            </div>
          </section>

          {/* Info Tabs Section */}
          <section className="glass-panel" style={{ padding: '0', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}>
              <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Clinical Overview</button>
              <button className={`tab-btn ${activeTab === 'safety' ? 'active' : ''}`} onClick={() => setActiveTab('safety')}>Safety Profile</button>
              <button className={`tab-btn ${activeTab === 'composition' ? 'active' : ''}`} onClick={() => setActiveTab('composition')}>Detailed Composition</button>
            </div>
            <div style={{ padding: '3rem' }}>
              {renderTabContent()}
            </div>
          </section>

          {/* Availability Card */}
          <section className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)' }}>
             <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'2.5rem' }}>
                <h3 style={{ margin:0, fontSize:'1.75rem', display:'flex', alignItems:'center', gap:'1rem' }}>
                  <Package size={24} color="var(--primary)"/> Market Availability
                </h3>
                <span className="badge badge-success">{availability.length} Verified Sources</span>
             </div>

             {availability.length === 0 ? (
               <div style={{ textAlign:'center', padding:'4rem' }}>
                 <Clock size={48} color="var(--text-muted)" style={{ opacity:0.3, marginBottom:'1rem' }}/>
                 <p style={{ color:'var(--text-muted)', fontSize:'1.1rem' }}>Out of stock at all monitored locations.</p>
               </div>
             ) : (
               <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'1.5rem' }}>
                 {availability.map((inv, idx) => (
                   <div key={idx} style={{ padding:'2rem', borderRadius:'var(--radius-md)', background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div>
                        <h4 style={{ margin:'0 0 0.5rem', fontSize:'1.2rem', color:'white' }}>{inv.pharmacyId?.name}</h4>
                        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', color:'var(--text-secondary)', fontSize:'0.9rem' }}>
                          <MapPin size={14} color="var(--accent)"/> {inv.pharmacyId?.address}
                        </div>
                      </div>
                      <div style={{ textAlign:'right', display:'flex', alignItems:'center', gap:'2.5rem' }}>
                         <div>
                            <div style={{ fontSize:'1.75rem', fontWeight:800, color:'var(--secondary)' }}>₹{inv.price}</div>
                            <div style={{ fontSize:'0.8rem', color:'var(--text-muted)', fontWeight:600 }}>{inv.stockQuantity} units available</div>
                         </div>
                         <div style={{ display:'flex', gap:'0.75rem' }}>
                            <a href={`tel:${inv.pharmacyId?.contactNumber}`} className="btn btn-secondary" style={{ width:'45px', height:'45px', padding:0, borderRadius:'12px', display:'flex', justifyContent:'center', alignItems:'center' }}><Phone size={20}/></a>
                            <button onClick={() => window.open(`https://maps.google.com/?q=${inv.pharmacyId?.location?.lat},${inv.pharmacyId?.location?.lng}`, '_blank')} className="btn btn-primary" style={{ padding:'0.75rem 1.5rem', borderRadius:'12px', display:'flex', alignItems:'center', gap:'0.75rem' }}>Directions <Navigation size={18}/></button>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </section>
        </div>

        {/* Sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
           <div className="glass-panel" style={{ padding:'2rem', borderRadius:'var(--radius-lg)' }}>
              <h4 style={{ margin:'0 0 1.5rem', display:'flex', alignItems:'center', gap:'0.75rem' }}>
                 <Zap size={18} color="var(--accent)"/> Smart Alternatives
              </h4>
              {similarMedicines.length > 0 ? (
                similarMedicines.map(m => (
                  <Link key={m._id} to={`/medicine/${m._id}`} className="similar-card">
                    <div className="icon-box" style={{ background:'rgba(255,255,255,0.05)', flexShrink:0 }}><Pill size={18}/></div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontWeight:700, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', color:'white' }}>{m.name}</div>
                      <div style={{ fontSize:'0.75rem', color:'var(--text-secondary)' }}>{m.manufacturer}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <p style={{ color:'var(--text-muted)', fontSize:'0.85rem' }}>No alternatives found in this category.</p>
              )}
           </div>

           <div className="glass-panel" style={{ padding:'2rem', borderRadius:'var(--radius-lg)', background:'linear-gradient(135deg, rgba(99,102,241,0.05) 0%, rgba(168,85,247,0.05) 100%)' }}>
              <Activity size={32} color="var(--primary)" style={{ marginBottom:'1rem' }}/>
              <h4 style={{ margin:'0 0 0.75rem' }}>Clinical Excellence</h4>
              <p style={{ fontSize:'0.85rem', color:'var(--text-secondary)', lineHeight:1.6, margin:0 }}>Information provided is sourced from authorized clinical datasets. Always consult your physician before starting any medication.</p>
           </div>
        </aside>

      </div>
    </div>
  );
};

export default MedicineDetail;
