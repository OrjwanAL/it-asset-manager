import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import AssetManager from './AssetManager';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('AssetManager Operations', () => {
  const mockData = [
    { id: 1, type: 'Laptop', model: 'Dell Latitude E6440', status: 'Deployed', assignedTo: 'Hamza Usman' }
  ];
  const mockTypes = ['Laptop', 'Desktop PC'];

  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('displays the initial list of assets', () => {
    render(
      <AssetManager 
        title="Test Dashboard" 
        initialData={mockData} 
        assetTypes={mockTypes} 
        storageKey="test_assets" 
      />
    );
    expect(screen.getByText('Dell Latitude E6440')).toBeInTheDocument();
  });

  it('opens the modal and adds a new asset', () => {
    render(
      <AssetManager 
        title="Test Dashboard" 
        initialData={mockData} 
        assetTypes={mockTypes} 
        storageKey="test_assets" 
      />
    );
    
    // Open modal
    fireEvent.click(screen.getByRole('button', { name: /\+ Add New Asset/i }));
    
    // Fill out form
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'Laptop' } });
    fireEvent.change(screen.getByPlaceholderText('Model'), { target: { value: 'MacBook Pro' } });
    fireEvent.change(screen.getByPlaceholderText('Status'), { target: { value: 'Available' } });
    fireEvent.change(screen.getByPlaceholderText('Assigned To'), { target: { value: 'IT Dept' } });
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /Save Asset/i }));
    
    // Assert
    expect(screen.getByText('MacBook Pro')).toBeInTheDocument();
  });
});