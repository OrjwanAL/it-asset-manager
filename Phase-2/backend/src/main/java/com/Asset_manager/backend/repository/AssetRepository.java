package com.Asset_manager.backend.repository;

import com.Asset_manager.backend.model.Asset;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long> {
    Page<Asset> findByCategoryIgnoreCase(String category, Pageable pageable);
}