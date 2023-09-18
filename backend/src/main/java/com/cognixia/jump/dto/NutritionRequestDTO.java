package com.cognixia.jump.dto;

import java.time.LocalDate;

public class NutritionRequestDTO {
	 private String food;
	 private LocalDate entryDate;
	 
	
	 
	 public NutritionRequestDTO() {
	}
	 
	public String getFood() {
		return food;
	}
	public void setFood(String food) {
		this.food = food;
	}
	public LocalDate getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}
	 

	 

}
