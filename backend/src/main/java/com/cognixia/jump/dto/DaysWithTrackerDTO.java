package com.cognixia.jump.dto;

import java.time.LocalDate;
import java.util.List;

import com.cognixia.jump.model.Nutrition;

public class DaysWithTrackerDTO {
    private LocalDate entryDate;
    private double totalDailySteps;
    private double totalCaloriesConsumed;
    private List<Nutrition> nutritions;
    
	public DaysWithTrackerDTO() {
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}

	public double getTotalDailySteps() {
		return totalDailySteps;
	}

	public void setTotalDailySteps(double totalDailySteps) {
		this.totalDailySteps = totalDailySteps;
	}

	public double getTotalCaloriesConsumed() {
		return totalCaloriesConsumed;
	}

	public void setTotalCaloriesConsumed(double totalCaloriesConsumed) {
		this.totalCaloriesConsumed = totalCaloriesConsumed;
	}

	public List<Nutrition> getNutritions() {
		return nutritions;
	}

	public void setNutritions(List<Nutrition> nutritions) {
		this.nutritions = nutritions;
	}
	
	

}
