package com.Asset_manager.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String category;
    @Column(nullable = false)
    private String type;
    @Column(nullable = false)
    private String model;
    @Column(nullable = false)
    private String status;
    @Column(nullable = false)
    private String assignedTo;

    public Asset() {}

    public Asset(Long id, String category, String type, String model, String status, String assignedTo) {
        this.id = id; this.category = category; this.type = type;
        this.model = model; this.status = status; this.assignedTo = assignedTo;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getAssignedTo() { return assignedTo; }
    public void setAssignedTo(String assignedTo) { this.assignedTo = assignedTo; }
}