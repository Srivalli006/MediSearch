import React from 'react';
import { MapPin, Phone, Package, Navigation, AlertCircle, FlaskConical, Info, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DEPT_COLORS = {
  General: '#6366f1', Cardiology: '#ef4444', Paediatrics: '#f59e0b',
  Dermatology: '#ec4899', Orthopaedics: '#14b8a6', Neurology: '#8b5cf6',
  Oncology: '#f97316', Gynaecology: '#db2777', Ophthalmology: '#06b6d4',
  ENT: '#84cc16', Psychiatry: '#a78bfa', Pulmonology: '#38bdf8'
};

const MedicineCard = ({ data }) => {
  const navigate = useNavigate();
  const isOutOfStock = data.stock === 0;
  const deptColor = DEPT_COLORS[data.department] || '#6366f1';

  return (
    <div 
      className="glass-panel animate-fade-in" 
      style={{ 
        padding: '1.75rem', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.25rem', 
        borderRadius: 'var(--radius-lg)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.5)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
    >
      {/* Accent Glow */}
      <div style={{ 
        position: 'absolute', top: '-60px', right: '-60px', 
        width: '120px', height: '120px', 
        background: `radial-gradient(circle, ${deptColor} 0%, transparent 70%)`,
        opacity: 0.15, filter: 'blur(30px)' 
      }}/>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{
              padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)',
              background: `${deptColor}15`, border: `1px solid ${deptColor}30`, 
              color: deptColor, fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase'
            }}>{data.department}</span>
            <span className={`badge ${isOutOfStock ? 'badge-danger' : 'badge-success'}`} style={{ fontSize: '0.6rem' }}>
              {isOutOfStock ? 'Unavailable' : 'Instock'}
            </span>
          </div>
          <h3 style={{ fontSize: '1.25rem', margin: 0, lineHeight: 1.2 }}>{data.medicine}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '4px' }}>By {data.manufacturer}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary)', letterSpacing: '-0.02em' }}>₹{data.price}</div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>per unit</div>
        </div>
      </div>

      {/* Composition Preview */}
      {data.composition && data.composition.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {data.composition.slice(0, 2).map((c, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              <FlaskConical size={12} color="var(--primary)" /> {c}
            </div>
          ))}
          {data.composition.length > 2 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{data.composition.length - 2} more</span>}
        </div>
      )}

      {/* Pharmacy Highlight */}
      <div style={{ marginTop: '0.25rem', padding: '1rem', borderRadius: 'var(--radius-md)', background: 'linear-gradient(to right, rgba(99, 102, 241, 0.05), transparent)', borderLeft: '3px solid var(--primary)' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {data.pharmacy}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={14} color="var(--accent)" /> {data.address}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Navigation size={14} color="var(--secondary)" /> {data.distance}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Package size={14} color="var(--secondary)" /> {data.stock} units
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
        <button
          className="btn btn-secondary"
          style={{ flex: 1, height: '44px' }}
          onClick={() => navigate(`/medicine/${data.medicineId}`)}
        >
          <Info size={16}/> Details
        </button>
        <button
          className="btn btn-primary"
          style={{ flex: 1, height: '44px', opacity: isOutOfStock ? 0.5 : 1, cursor: isOutOfStock ? 'not-allowed':'pointer' }}
          disabled={isOutOfStock}
          onClick={() => !isOutOfStock && window.open(`https://maps.google.com/?q=${data.location?.lat},${data.location?.lng}`, '_blank')}
        >
          <Navigation size={16}/> Locate
        </button>
      </div>
    </div>
  );
};

export default MedicineCard;
