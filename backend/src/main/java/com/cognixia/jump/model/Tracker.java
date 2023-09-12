package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;


@Entity
public class Tracker implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
		
	private int steps;
	
	private float totalCalories;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",  unique = true)
	private User user;
	
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Nutrition> nutrition ;
		
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Days> Days ;

	private int goalId;
	
	public Tracker() {}

	public Tracker(Integer id, int steps, float totalCalories, User user, List<Nutrition> nutrition, int goalId) {
		super();
		this.id = id;
		this.steps = steps;
		this.totalCalories = totalCalories;
		this.user = user;
		this.nutrition = nutrition;
		this.goalId = goalId;
	}
	public Tracker(int steps, float totalCalories, int goalId, User user, List<Nutrition> nutrition) {
		super();
		this.steps = steps;
		this.totalCalories = totalCalories;
		this.user = user;
		this.goalId = goalId;
		this.nutrition = nutrition;
	}
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public int getSteps() {
		return steps;
	}

	public void setSteps(int steps) {
		this.steps = steps;
	}

//	public User getUser() {
//		return user;
//	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getGoalId() {
		return goalId;
	}
	
	public void setGoalId(int goalId) {
		this.goalId = goalId;
		
	}
	
	public List<Nutrition> getNutritions() {
		return nutrition;
	}

	public void setNutritions(List<Nutrition> nutritions) {
		this.nutrition = nutritions;
	}

	public void setTotalCalories(float totalCalories) {
		this.totalCalories = totalCalories;
	}

	public float getTotalCalories() {
		return totalCalories;
	}
	
	public void resetTotalCalories() {
		totalCalories = 0;
	}
}
