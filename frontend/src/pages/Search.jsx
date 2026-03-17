import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search as SearchIcon, MapPin, SlidersHorizontal, 
  LayoutGrid, List, Navigation, ChevronDown, Check,
  ArrowUpDown, Loader2, PackageSearch, Filter, ActivitySquare
} from 'lucide-react';
import axios from 'axios';
import MedicineCard from '../components/MedicineCard';

const API = 'http://localhost:5000/api';

const ShimmerCard = () => (
  <div className="glass-panel shimmer" style={{ height: '240px', borderRadius: 'var(--radius-lg)', opacity: 0.4 }} />
);

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchMode, setSearchMode] = useState('name');
  const [suggestions, setSuggestions] = useState([]);
  
  // UI States
  const [sortBy, setSortBy] = useState('distance'); // distance, price_low, price_high
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  // Load departments
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    axios.get(`${API}/search/departments`).then(res => setDepartments(res.data)).catch(() => {});
  }, []);

  const handleSearch = async (e, directQuery = null) => {
    if (e) e.preventDefault();
    const q = directQuery || query;
    if (!q && searchMode !== 'department') return;

    setLoading(true);
    setSuggestions([]);
    try {
      let params = { 
        lat: userLocation?.lat, 
        lng: userLocation?.lng 
      };
      
      if (searchMode === 'name') params.query = q;
      else if (searchMode === 'composition') params.composition = q;
      else if (searchMode === 'department') params.department = q;

      const res = await axios.get(`${API}/search`, { params });
      setResults(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => setLoading(false), 600); // Smooth transition
    }
  };

  const fetchSuggestions = useCallback(async (val) => {
    if (val.length < 2 || searchMode === 'department') {
      setSuggestions([]);
      return;
    }
    try {
      const field = searchMode === 'name' ? 'query' : 'composition';
      const res = await axios.get(`${API}/search`, { params: { [field]: val } });
      const uniqueNames = [...new Set(res.data.map(item => searchMode === 'name' ? item.medicine : item.composition[0]))].slice(0, 5);
      setSuggestions(uniqueNames);
    } catch (err) {}
  }, [searchMode]);

  useEffect(() => {
    const timer = setTimeout(() => fetchSuggestions(query), 300);
    return () => clearTimeout(timer);
  }, [query, fetchSuggestions]);

  const toggleLocation = () => {
    if (!locationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationEnabled(true);
        },
        () => alert("Please enable location permissions in your browser.")
      );
    } else {
      setLocationEnabled(false);
      setUserLocation(null);
    }
  };

  const getSortedResults = () => {
    let sorted = [...results];
    if (sortBy === 'price_low') sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price_high') sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === 'distance') sorted.sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
    return sorted;
  };

  const sortedResults = getSortedResults();

  return (
    <div className="container animate-fade-in" style={{ padding: '6rem 2rem 10rem', minHeight: '100vh' }}>
      
      {/* Header & Modes */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
          Intelligent <span className="text-gradient">Medicine Discovery</span>
        </h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {['name', 'composition', 'department'].map((mode) => (
            <button
              key={mode}
              onClick={() => { setSearchMode(mode); setResults([]); setQuery(''); }}
              className={`filter-chip ${searchMode === mode ? 'active' : ''}`}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* Search Input Group */}
        <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
          <form onSubmit={handleSearch} className="glass-panel" style={{ 
            display: 'flex', alignItems: 'center', padding: '0.6rem 0.6rem 0.6rem 2rem', 
            borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }}>
            <SearchIcon size={22} color="var(--primary)" style={{ opacity: 0.8 }} />
            
            {searchMode === 'department' ? (
              <select 
                value={query}
                onChange={(e) => { setQuery(e.target.value); handleSearch(null, e.target.value); }}
                style={{ 
                  flex: 1, background: 'none', border: 'none', color: 'white', 
                  fontSize: '1.2rem', padding: '0.75rem 1.5rem', outline: 'none', cursor: 'pointer' 
                }}
              >
                <option value="" style={{ background: '#1e293b' }}>Select Department...</option>
                {departments.map(d => (
                  <option key={d} value={d} style={{ background: '#1e293b' }}>{d}</option>
                ))}
              </select>
            ) : (
              <input 
                type="text"
                placeholder={`Search by ${searchMode}... (e.g. ${searchMode === 'name' ? 'Dolo 650' : 'Paracetamol'})`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ 
                  flex: 1, background: 'none', border: 'none', color: 'white', 
                  fontSize: '1.25rem', padding: '0.75rem 1.5rem', outline: 'none' 
                }}
              />
            )}

            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 2.5rem', borderRadius: 'var(--radius-full)' }}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Discover"}
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="glass-panel" style={{ 
              position: 'absolute', top: '110%', left: '2rem', right: '12rem', 
              zIndex: 100, padding: '0.75rem', borderRadius: 'var(--radius-lg)',
              textAlign: 'left'
            }}>
              {suggestions.map((s, i) => (
                <div 
                  key={i} 
                  onClick={() => { setQuery(s); handleSearch(null, s); }}
                  style={{ 
                    padding: '0.8rem 1.25rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.75rem'
                  }}
                  className="pharmacy-row-hover"
                >
                  <ActivitySquare size={16} color="var(--primary)" /> {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Header & Controls */}
      {results.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>{results.length} results found</span>
            {locationEnabled && <span style={{ color: 'var(--secondary)', marginLeft: '1rem', fontSize: '0.9rem', fontWeight: 600 }}>Sorted by distance</span>}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={() => setSortBy('distance')} className={`filter-chip ${sortBy === 'distance' ? 'active' : ''}`} style={{ padding: '0.4rem 1rem' }}>Distance</button>
              <button onClick={() => setSortBy('price_low')} className={`filter-chip ${sortBy === 'price_low' ? 'active' : ''}`} style={{ padding: '0.4rem 1rem' }}>Price ↑</button>
              <button onClick={() => setSortBy('price_high')} className={`filter-chip ${sortBy === 'price_high' ? 'active' : ''}`} style={{ padding: '0.4rem 1rem' }}>Price ↓</button>
            </div>
            
            <button 
              onClick={toggleLocation} 
              className={`filter-chip ${locationEnabled ? 'active' : ''}`}
            >
              <Navigation size={16} /> Near Me
            </button>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {[1,2,3,4,5,6].map(i => <ShimmerCard key={i} />)}
        </div>
      ) : results.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {sortedResults.map((item) => (
            <MedicineCard key={item.inventoryId} data={item} />
          ))}
        </div>
      ) : query && !loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
          <PackageSearch size={64} color="var(--text-muted)" style={{ opacity: 0.3, marginBottom: '1.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>No results found for "{query}"</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try checking alternative brands or a different search mode.</p>
        </div>
      ) : (
         <div style={{ textAlign: 'center', padding: '5rem 0', opacity: 0.5 }}>
           <p>Search for a medicine to see local availability and pricing.</p>
         </div>
      )}
    </div>
  );
};

export default Search;
