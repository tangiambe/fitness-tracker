package com.cognixia.jump.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;

@Entity
public class Nutrition implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotBlank
	private String name;
	private float foodCalories;
	private float serving_size_g;
	private float fat_total_g;
	private float fat_saturated_g;
	private float protein_g;
	private float sodium_mg;
	private float potassium_mg;
	private float cholesterol_mg;
	private float carbohydrates_total_g;
	private float fiber_g;
	private float sugar_g;
	private int quantity;
	private float totalServingSize;
	private float totalCalories;
	
    @ManyToOne
    @JoinColumn(name = "goal_id", referencedColumnName = "id")
    private Tracker tracker;
	
	public Nutrition() {}
	
	public Nutrition(@NotBlank String name, float foodCalories, float serving_size_g, float fat_total_g,
			float fat_saturated_g, float protein_g, float sodium_mg, float potassium_mg, float cholesterol_mg,
			float carbohydrates_total_g, float fiber_g, float sugar_g) {
		super();
		this.name = name;
		this.foodCalories = foodCalories;
		this.serving_size_g = serving_size_g;
		this.fat_total_g = fat_total_g;
		this.fat_saturated_g = fat_saturated_g;
		this.protein_g = protein_g;
		this.sodium_mg = sodium_mg;
		this.potassium_mg = potassium_mg;
		this.cholesterol_mg = cholesterol_mg;
		this.carbohydrates_total_g = carbohydrates_total_g;
		this.fiber_g = fiber_g;
		this.sugar_g = sugar_g;
	}




	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	

	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public float getFoodCalories() {
		return foodCalories;
	}



	public void setFoodCalories(float foodCalories) {
		this.foodCalories = foodCalories;
	}



	public float getServing_size_g() {
		return serving_size_g;
	}



	public void setServing_size_g(float serving_size_g) {
		this.serving_size_g = serving_size_g;
	}



	public float getFat_total_g() {
		return fat_total_g;
	}



	public void setFat_total_g(float fat_total_g) {
		this.fat_total_g = fat_total_g;
	}



	public float getFat_saturated_g() {
		return fat_saturated_g;
	}



	public void setFat_saturated_g(float fat_saturated_g) {
		this.fat_saturated_g = fat_saturated_g;
	}



	public float getProtein_g() {
		return protein_g;
	}



	public void setProtein_g(float protein_g) {
		this.protein_g = protein_g;
	}



	public float getSodium_mg() {
		return sodium_mg;
	}



	public void setSodium_mg(float sodium_mg) {
		this.sodium_mg = sodium_mg;
	}



	public float getPotassium_mg() {
		return potassium_mg;
	}



	public void setPotassium_mg(float potassium_mg) {
		this.potassium_mg = potassium_mg;
	}



	public float getCholesterol_mg() {
		return cholesterol_mg;
	}



	public void setCholesterol_mg(float cholesterol_mg) {
		this.cholesterol_mg = cholesterol_mg;
	}



	public float getCarbohydrates_total_g() {
		return carbohydrates_total_g;
	}



	public void setCarbohydrates_total_g(float carbohydrates_total_g) {
		this.carbohydrates_total_g = carbohydrates_total_g;
	}



	public float getFiber_g() {
		return fiber_g;
	}



	public void setFiber_g(float fiber_g) {
		this.fiber_g = fiber_g;
	}



	public float getSugar_g() {
		return sugar_g;
	}



	public void setSugar_g(float sugar_g) {
		this.sugar_g = sugar_g;
	}



//	public Tracker getTracker() {
//		return tracker;
//	}

	public void setTracker(Tracker tracker) {
		this.tracker = tracker;
	}
	
	

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getTotalServingSize() {
		return totalServingSize;
	}

	public void setTotalServingSize(float totalServingSize) {
		this.totalServingSize = totalServingSize;
	}

	public float getTotalCalories() {
		return totalCalories;
	}

	public void setTotalCalories(float totalCalories) {
		this.totalCalories = totalCalories;
	}
	
	public void resetTotals() {
		this.quantity = 0;
		this.totalServingSize = 0;
		this.totalCalories = 0;
	}
	

	@Override
	public String toString() {
		return "Nutrition [id=" + id + ", name=" + name + ", foodCalories=" + foodCalories + ", serving_size_g="
				+ serving_size_g + ", fat_total_g=" + fat_total_g + ", fat_saturated_g=" + fat_saturated_g
				+ ", protein_g=" + protein_g + ", sodium_mg=" + sodium_mg + ", potassium_mg=" + potassium_mg
				+ ", cholesterol_mg=" + cholesterol_mg + ", carbohydrates_total_g=" + carbohydrates_total_g
				+ ", fiber_g=" + fiber_g + ", sugar_g=" + sugar_g + ", tracker=" + tracker + "]";
	}


}
