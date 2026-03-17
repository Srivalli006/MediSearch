import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Activity, ShieldCheck, HeartPulse, ArrowRight, Sparkles, PlusCircle } from 'lucide-react';

const Home = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  return (
    <div className="container" style={{ 
      flex: 1, display: 'flex', flexDirection: 'column', 
      gap: '8rem', padding: '6rem 1.5rem 10rem', alignItems: 'center' 
    }}>
      
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', maxWidth: '950px', 
        display: 'flex', flexDirection: 'column', 
        alignItems: 'center', gap: '2.5rem',
        position: 'relative'
      }} className="animate-fade-in">
        
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '400px', background: 'var(--primary-glow)',
          filter: 'blur(120px)', opacity: 0.1, zIndex: -1
        }} />

        <div style={{ 
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem', 
          padding: '0.6rem 1.25rem', borderRadius: 'var(--radius-full)', 
          background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', 
          color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 700,
          fontFamily: 'Outfit'
        }}>
          <Sparkles size={16} /> Empowering Local Healthcare
        </div>

        <h1 style={{ 
          fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1, 
          fontWeight: 800, letterSpacing: '-0.04em', margin: 0,
          background: 'linear-gradient(to bottom, #fff 30%, #94a3b8 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>
          Search Medicines.<br />
          <span style={{ 
            background: 'linear-gradient(to right, #6366f1, #10b981)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
          }}>Save Time.</span>
        </h1>

        <p style={{ 
          color: 'var(--text-secondary)', fontSize: '1.25rem', 
          maxWidth: '700px', lineHeight: 1.6, fontWeight: 400
        }}>
          Skip the endless phone calls. Instantly find availability and pricing from pharmacies in your neighborhood with real-time inventory tracking.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/search" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
            <Search size={22} strokeWidth={2.5} /> Find Medicine Now
          </Link>
          {!user && (
            <Link to="/auth" className="btn btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem' }}>
              <PlusCircle size={22} /> List Your Pharmacy
            </Link>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2rem', width: '100%', maxWidth: '1200px' 
      }}>
        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'rgba(99, 102, 241, 0.1)', 
            borderRadius: '18px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', color: 'var(--primary)',
            boxShadow: 'inset 0 0 20px rgba(99, 102, 241, 0.1)'
          }}>
            <Search size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Smart Search</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Search by brand name, generic composition, or medical department with intelligent autocomplete.
            </p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'rgba(16, 185, 129, 0.1)', 
            borderRadius: '18px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', color: 'var(--secondary)',
            boxShadow: 'inset 0 0 20px rgba(16, 185, 129, 0.1)'
          }}>
            <MapPin size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Geospatial Results</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Automatically sort results by proximity to your current location. Get turn-by-turn directions instantly.
            </p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'rgba(244, 63, 94, 0.1)', 
            borderRadius: '18px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', color: 'var(--accent)',
            boxShadow: 'inset 0 0 20px rgba(244, 63, 94, 0.1)'
          }}>
            <ShieldCheck size={32} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>Verified Accuracy</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem' }}>
              Our network of verified pharmacy owners updates inventory data directly for 99.9% availability reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <footer style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
          Direct Access To Local Healthcare
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', color: 'var(--text-secondary)' }}>
          <Activity size={24} color="var(--primary)" />
          <span style={{ fontSize: '1.1rem', fontWeight: 500 }}>Powered by MediSearch Health Infrastructure v2.0</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
