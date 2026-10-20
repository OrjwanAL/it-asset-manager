package com.Asset_manager.backend;

import com.Asset_manager.backend.model.Asset;
import com.Asset_manager.backend.repository.AssetRepository;
import com.Asset_manager.backend.service.AssetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AssetServiceTest {

    @Mock
    private AssetRepository assetRepository;

    @InjectMocks
    private AssetService assetService;

    private Asset sampleAsset;

    @BeforeEach
    void setUp() {
        sampleAsset = new Asset(1L, "computers", "Laptop", "Dell Latitude E6440", "Deployed", "IT Dept");
    }

    @Test
    void testAddAsset() {
        when(assetRepository.save(any(Asset.class))).thenReturn(sampleAsset);
        Asset created = assetService.addAsset(sampleAsset);
        assertEquals("Dell Latitude E6440", created.getModel());
    }

    @Test
    void testGetAssetById() {
        when(assetRepository.findById(1L)).thenReturn(Optional.of(sampleAsset));
        Optional<Asset> result = assetService.getAssetById(1L);
        assertTrue(result.isPresent());
    }

    @Test
    void testGetAllAssets_Paginated() {
        Pageable pageable = PageRequest.of(0, 5, Sort.by("id").ascending());
        Page<Asset> pagedAssets = new PageImpl<>(Collections.singletonList(sampleAsset), pageable, 1);
        when(assetRepository.findByCategoryIgnoreCase(eq("computers"), any(Pageable.class))).thenReturn(pagedAssets);
        
        Page<Asset> response = assetService.getAllAssets("computers", 0, 5);
        assertEquals(1, response.getTotalElements());
    }

    @Test
    void testUpdateAsset() {
        Asset updatedInfo = new Asset(null, "computers", "Workstation", "HP Z4", "Available", "None");
        when(assetRepository.findById(1L)).thenReturn(Optional.of(sampleAsset));
        when(assetRepository.save(any(Asset.class))).thenReturn(sampleAsset);

        Asset result = assetService.updateAsset(1L, updatedInfo);
        assertNotNull(result);
        verify(assetRepository).save(sampleAsset);
    }
}