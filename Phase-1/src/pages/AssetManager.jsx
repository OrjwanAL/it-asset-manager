import React, { useState, useEffect } from 'react';
import './AssetManager.css';

// Added storageKey to the props
const AssetManager = ({ title, initialData, assetTypes, storageKey }) => {
  // 1. Initialize state by checking localStorage first
  const [assets, setAssets] = useState(() => {
    const savedAssets = localStorage.getItem(storageKey);
    return savedAssets ? JSON.parse(savedAssets) : initialData;
  });
  
  const [formData, setFormData] = useState({ type: '', model: '', status: '', assignedTo: '' });
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. Load the correct data when navigating between tabs
  useEffect(() => {
    const savedAssets = localStorage.getItem(storageKey);
    setAssets(savedAssets ? JSON.parse(savedAssets) : initialData);
  }, [storageKey, initialData]);

  // 3. Save to localStorage every time the assets array changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(assets));
  }, [assets, storageKey]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ type: '', model: '', status: '', assignedTo: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setAssets(assets.map(asset => 
        asset.id === editingId ? { ...asset, ...formData } : asset
      ));
    } else {
      const nextId = assets.length > 0 ? Math.max(...assets.map(a => a.id)) + 1 : 1;
      const newAsset = { ...formData, id: nextId };
      setAssets([...assets, newAsset]);
    }
    closeModal();
  };

  const handleEdit = (asset) => {
    setFormData({ type: asset.type, model: asset.model, status: asset.status, assignedTo: asset.assignedTo });
    setEditingId(asset.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="asset-container">
      <h2 className="page-title">{title}</h2>
      
      <div className="toolbar">
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
                  <option key={index} value={typeOption}>
                    {typeOption}
                  </option>
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
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Model</th>
              <th>Status</th>
              <th>Assigned To</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td>{asset.id}</td>
                <td>{asset.type}</td>
                <td>{asset.model}</td>
                <td>
                  <span className={`status-badge ${asset.status.toLowerCase()}`}>
                    {asset.status}
                  </span>
                </td>
                <td>{asset.assignedTo}</td>
                <td>
                  <button className="btn btn-edit" onClick={() => handleEdit(asset)}>Edit</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(asset.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetManager;