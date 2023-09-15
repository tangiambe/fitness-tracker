package com.cognixia.jump.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Days implements Serializable {

    private static final long serialVersionUID = 1L;


    @Temporal(TemporalType.DATE) // For using java.util.Date
    private LocalDate entryDate; // Date associated with the entry

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private double totalDailySteps;
    private double totalCaloriesConsumed;

    @ManyToOne
    @JoinColumn(name = "tracker_id")
    @JsonBackReference // Use this annotation to prevent serialization loop
    private Tracker tracker;
    
    @OneToMany(mappedBy = "day", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Nutrition> nutritions = new ArrayList<>();

    public Days() {
    }

    public Days(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public Days(Tracker tracker, LocalDate date) {
        this.tracker = tracker;
        entryDate = date;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getTotalCaloriesConsumed() {
        return totalCaloriesConsumed;
    }

    public void setTotalCaloriesConsumed(double totalCaloriesConsumed) {
        this.totalCaloriesConsumed = totalCaloriesConsumed;
    }

    public double getTotalDailySteps() {
        return totalDailySteps;
    }

    public void setTotalDailySteps(double totalDailySteps) {
        this.totalDailySteps = totalDailySteps;
    }

    public Tracker getTracker() {
        return tracker;
    }

    public void setTracker(Tracker tracker) {
        this.tracker = tracker;
    }

    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

	public List<Nutrition> getNutritions() {
		return nutritions;
	}

	public void setNutritions(List<Nutrition> nutritions) {
		this.nutritions = nutritions;
	}
    
    
}
