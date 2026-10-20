package com.Asset_manager.backend.service;

import com.Asset_manager.backend.model.Asset;
import com.Asset_manager.backend.repository.AssetRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public Asset addAsset(Asset asset) { return assetRepository.save(asset); }
    
    public Optional<Asset> getAssetById(Long id) { return assetRepository.findById(id); }

    public Page<Asset> getAllAssets(String category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
        if (category != null && !category.trim().isEmpty()) {
            return assetRepository.findByCategoryIgnoreCase(category, pageable);
        }
        return assetRepository.findAll(pageable);
    }

    public Asset updateAsset(Long id, Asset updatedAsset) {
        return assetRepository.findById(id).map(existing -> {
            existing.setType(updatedAsset.getType());
            existing.setModel(updatedAsset.getModel());
            existing.setStatus(updatedAsset.getStatus());
            existing.setAssignedTo(updatedAsset.getAssignedTo());
            if (updatedAsset.getCategory() != null) { existing.setCategory(updatedAsset.getCategory()); }
            return assetRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Asset not found"));
    }
}