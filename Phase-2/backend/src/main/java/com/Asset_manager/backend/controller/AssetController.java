package com.Asset_manager.backend.controller;

import com.Asset_manager.backend.model.Asset;
import com.Asset_manager.backend.service.AssetService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/assets")
public class AssetController {

    private final AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @PostMapping
    public ResponseEntity<Asset> createAsset(@RequestBody Asset asset) {
        return new ResponseEntity<>(assetService.addAsset(asset), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Asset> getAssetById(@PathVariable Long id) {
        return assetService.getAssetById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<Page<Asset>> getAllAssets(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size
    ) {
        return ResponseEntity.ok(assetService.getAllAssets(category, page, size));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Asset> updateAsset(@PathVariable Long id, @RequestBody Asset asset) {
        try {
            return ResponseEntity.ok(assetService.updateAsset(id, asset));
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}