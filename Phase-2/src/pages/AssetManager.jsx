import React, { useState, useEffect } from 'react';
import './AssetManager.css';

const AssetManager = ({ title, category, assetTypes }) => {
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({ type: '', model: '', status: '', assignedTo: '' });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchId, setSearchId] = useState('');

  const API_URL = 'http://localhost:8080/api/assets';

  const fetchAssets = async () => {
    try {
      const response = await fetch(`${API_URL}?category=${category}&page=${page}&size=5`);
      if (response.ok) {
        const data = await response.json();
        setAssets(data.content || []);
        setTotalPages(data.totalPages || 0);
      }
    } catch (error) {
      console.error("Fetch error", error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [category, page]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchId) return fetchAssets();
    try {
      const response = await fetch(`${API_URL}/${searchId}`);
      if (response.ok) {
        const data = await response.json();
        setAssets([data]);
        setTotalPages(1);
      } else {
        setAssets([]);
      }
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ type: '', model: '', status: '', assignedTo: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, category };
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      fetchAssets();
      closeModal();
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  return (
    <div className="asset-container">
      <h2 className="page-title">{title}</h2>
      
      <div className="toolbar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="number" 
            placeholder="Search by ID..." 
            value={searchId} 
            onChange={(e) => setSearchId(e.target.value)} 
            className="form-input" 
            style={{ minWidth: '150px' }}
          />
          <button type="submit" className="btn btn-secondary">Search</button>
        </form>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add New Asset
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingId ? 'Edit Asset' : 'Add New Asset'}</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <select className="form-input" name="type" value={formData.type} onChange={handleInputChange} required>
                <option value="" disabled>Select Asset Type...</option>
                {assetTypes.map((typeOption, index) => (
                  <option key={index} value={typeOption}>{typeOption}</option>
                ))}
              </select>
              <input className="form-input" name="model" placeholder="Model" value={formData.model} onChange={handleInputChange} required />
              <input className="form-input" name="status" placeholder="Status" value={formData.status} onChange={handleInputChange} required />
              <input className="form-input" name="assignedTo" placeholder="Assigned To" value={formData.assignedTo} onChange={handleInputChange} required />
              
              <div className="modal-actions">
                <button className="btn btn-secondary" type="button" onClick={closeModal}>Cancel</button>
                <button className="btn btn-primary" type="submit">
                  {editingId ? 'Update Asset' : 'Save Asset'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-wrapper">
        <table className="asset-table">
          <thead>
            <tr><th>ID</th><th>Type</th><th>Model</th><th>Status</th><th>Assigned To</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {assets.length > 0 ? assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td><td>{asset.type}</td><td>{asset.model}</td>
                <td><span className={`status-badge ${asset.status.toLowerCase()}`}>{asset.status}</span></td>
                <td>{asset.assignedTo}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => {
                    setFormData({ type: asset.type, model: asset.model, status: asset.status, assignedTo: asset.assignedTo });
                    setEditingId(asset.id);
                    setIsModalOpen(true);
                  }}>Edit</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No assets found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {!searchId && totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <button className="btn btn-secondary" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
          <span style={{ display: 'flex', alignItems: 'center' }}>Page {page + 1} of {totalPages}</span>
          <button className="btn btn-secondary" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default AssetManager;