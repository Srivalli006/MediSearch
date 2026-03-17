import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, User, LogOut, LayoutDashboard, ShieldCheck, Search } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  const dashboardPath = () => {
    if (!user) return '/auth';
    if (user.role === 'admin') return '/admin-dashboard';
    if (user.role === 'pharmacy_owner') return '/pharmacy-dashboard';
    return '/';
  };

  return (
    <nav style={{
      position: 'fixed', 
      top: scrolled ? '1.25rem' : '0', 
      left: '50%', 
      transform: 'translateX(-50%)',
      width: scrolled ? 'calc(100% - 2.5rem)' : '100%', 
      maxWidth: scrolled ? '1200px' : 'none',
      zIndex: 1000, 
      height: 'var(--nav-height)',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
    }}>
      <div className="glass-panel" style={{
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        padding: scrolled ? '0 1.5rem' : '0 2rem', 
        borderRadius: scrolled ? 'var(--radius-lg)' : '0',
        boxShadow: scrolled ? '0 20px 40px rgba(0,0,0,0.3)' : 'none',
        borderLeft: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        borderRight: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        borderTop: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div className="container" style={{ 
          display: 'flex', 
          justify: 'space-between', 
          alignItems: 'center', 
          padding: 0,
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{ 
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--pink-accent) 100%)',
              padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
            }}>
              <Activity size={22} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ 
              fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em', 
              fontFamily: 'Outfit', color: 'white' 
            }}>
              Medi<span style={{ color: 'var(--primary)' }}>Search</span>
            </span>
          </Link>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {/* Nav Links */}
            <Link to="/search" style={{ 
              color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', 
              fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', transition: 'all 0.2s'
            }} className="nav-item-hover">
              <Search size={18} /> Search
            </Link>

            <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }} />

            {user ? (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--surface-border)',
                  fontSize: '0.85rem', color: 'white', fontWeight: 500
                }}>
                  {user.role === 'admin' ? <ShieldCheck size={16} color="var(--primary)" /> : <User size={16} color="var(--secondary)" />}
                  {user.name}
                </div>

                {user.role !== 'customer' && (
                  <Link to={dashboardPath()} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                )}

                <button onClick={handleLogout} className="btn-secondary"
                  style={{ 
                    padding: '0.5rem', borderRadius: 'var(--radius-md)', 
                    color: 'var(--accent)', display: 'flex', alignItems: 'center', 
                    background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.2)',
                    cursor: 'pointer', transition: 'all 0.2s'
                  }}>
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <Link to="/auth?mode=signup" className="btn-secondary" style={{ padding: '0.6rem 1.25rem', border: 'none' }}>
                  Sign Up
                </Link>
                <Link to="/auth" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem' }}>
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
