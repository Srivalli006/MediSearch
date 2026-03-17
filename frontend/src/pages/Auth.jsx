import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, Building2, Shield, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API = `${import.meta.env.VITE_API_URL}/api`;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('customer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle redirect messages and mode from state/URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('mode') === 'signup') {
      setIsLogin(false);
    }
    
    if (location.state?.message) {
      setError(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      if (isLogin) {
        const { data } = await axios.post(`${API}/users/login`, { email, password });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess('Logged in successfully! Redirecting...');
        
        const destination = location.state?.from?.pathname || 
                           (data.user.role === 'admin' ? '/admin-dashboard' : 
                            data.user.role === 'pharmacy_owner' ? '/pharmacy-dashboard' : '/search');
        
        setTimeout(() => {
          window.location.href = destination;
        }, 800);
      } else {
        if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
        const { data } = await axios.post(`${API}/users/register`, { name, email, password, role });
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setSuccess('Account created! Redirecting...');
        
        const destination = data.user.role === 'admin' ? '/admin-dashboard' : 
                           data.user.role === 'pharmacy_owner' ? '/pharmacy-dashboard' : '/search';
        
        setTimeout(() => {
          window.location.href = destination;
        }, 800);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', padding: '2rem' }}>
      <div className="glass-panel animate-fade-in" style={{ maxWidth: '480px', width: '100%', padding: '2.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position:'absolute', top:'-10%', left:'-10%', width:'150px', height:'150px', background:'var(--primary)', filter:'blur(60px)', opacity:0.2, borderRadius:'50%' }} />

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isLogin ? 'Sign in to access your dashboard.' : 'Join MediSearch to find or manage medicines.'}
          </p>
        </div>

        {!isLogin && (
          <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem', background:'rgba(15,23,42,0.4)', padding:'0.35rem', borderRadius:'var(--radius-lg)' }}>
            {[{id:'customer', label:'Customer', icon:UserIcon},{id:'pharmacy_owner', label:'Pharmacy', icon:Building2},{id:'admin', label:'Admin', icon:Shield}].map(r => (
              <button key={r.id} type="button" onClick={() => setRole(r.id)} style={{
                flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'0.35rem',
                padding:'0.5rem', border:'none', borderRadius:'var(--radius-md)',
                background: role===r.id ? 'var(--surface-hover)' : 'transparent',
                color: role===r.id ? 'white' : 'var(--text-secondary)',
                cursor:'pointer', transition:'all 0.2s', fontSize:'0.85rem', fontWeight:500,
                boxShadow: role===r.id ? 'var(--shadow-sm)' : 'none'
              }}>
                <r.icon size={14}/> {r.label}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div style={{ padding:'0.75rem 1rem', background:'rgba(244,63,94,0.1)', border:'1px solid rgba(244,63,94,0.25)', borderRadius:'var(--radius-md)', color:'var(--accent)', display:'flex', gap:'0.5rem', alignItems:'center', marginBottom:'1.25rem', fontSize:'0.875rem' }}>
            <AlertCircle size={16}/> {error}
          </div>
        )}
        {success && (
          <div style={{ padding:'0.75rem 1rem', background:'rgba(16,185,129,0.1)', border:'1px solid rgba(16,185,129,0.25)', borderRadius:'var(--radius-md)', color:'var(--secondary)', display:'flex', gap:'0.5rem', alignItems:'center', marginBottom:'1.25rem', fontSize:'0.875rem' }}>
            <CheckCircle size={16}/> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {!isLogin && (
            <div>
              <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.5rem' }}>Full Name</label>
              <div style={{ position:'relative' }}>
                <UserIcon size={18} color="var(--text-secondary)" style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)' }}/>
                <input type="text" placeholder="John Doe" value={name} onChange={e=>setName(e.target.value)} style={{ paddingLeft:'3rem' }} required/>
              </div>
            </div>
          )}
          <div>
            <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.5rem' }}>Email Address</label>
            <div style={{ position:'relative' }}>
              <Mail size={18} color="var(--text-secondary)" style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)' }}/>
              <input type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} style={{ paddingLeft:'3rem' }} required/>
            </div>
          </div>
          <div>
            <label style={{ display:'block', fontSize:'0.85rem', color:'var(--text-secondary)', marginBottom:'0.5rem' }}>Password</label>
            <div style={{ position:'relative' }}>
              <Lock size={18} color="var(--text-secondary)" style={{ position:'absolute', left:'1rem', top:'50%', transform:'translateY(-50%)' }}/>
              <input type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} style={{ paddingLeft:'3rem' }} required minLength={6}/>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width:'100%', marginTop:'0.5rem', padding:'1rem' }} disabled={loading}>
            {loading ? 'Please wait...' : (<>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18}/></>)}
          </button>
        </form>

        {isLogin && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(79,70,229,0.06)', borderRadius: 'var(--radius-md)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Demo accounts:</strong><br/>
            Admin: <code>admin@medisearch.com</code> | Owner: <code>apollo@example.com</code> | Password: <code>password123</code>
          </div>
        )}

        <div style={{ textAlign:'center', marginTop:'1.5rem', fontSize:'0.9rem', color:'var(--text-secondary)' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}
            style={{ background:'none', border:'none', color:'var(--primary)', fontWeight:600, cursor:'pointer', padding:0 }}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
