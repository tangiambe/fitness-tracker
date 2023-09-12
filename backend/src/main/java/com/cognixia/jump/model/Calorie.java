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
public class Calorie implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	@NotBlank
	private String foodName;
	
	private int foodCalories;	

    @ManyToOne
    @JoinColumn(name = "goal_id", referencedColumnName = "id")
    private Tracker tracker;
	
	public Calorie() {}
	
	public Calorie(Integer id, @NotBlank String foodName, int foodCalories, Tracker tracker) {
		super();
		this.id = id;
		this.foodName = foodName;
		this.foodCalories = foodCalories;
		this.tracker = tracker;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFoodName() {
		return foodName;
	}

	public void setFoodName(String foodName) {
		this.foodName = foodName;
	}

	public int getFoodCalories() {
		return foodCalories;
	}

	public void setFoodCalories(int foodCalories) {
		this.foodCalories = foodCalories;
	}

	public Tracker getTracker() {
		return tracker;
	}

	public void setTracker(Tracker tracker) {
		this.tracker = tracker;
	}

	@Override
	public String toString() {
		return "Calorie [id=" + id + ", foodName=" + foodName + ", foodCalories=" + foodCalories + ", tracker="
				+ tracker + "]";
	}

}
