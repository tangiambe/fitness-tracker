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
	
	private int totalCalories;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",  unique = true)
	private User user;
	
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Calorie> calories ;
		
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Days> Days ;

	private int goalId;
	
	public Tracker() {}

	public Tracker(Integer id, int steps, int totalCalories, User user, List<Calorie> calories, int goalId) {
		super();
		this.id = id;
		this.steps = steps;
		this.totalCalories = totalCalories;
		this.user = user;
		this.calories = calories;
		this.goalId = goalId;
	}
	public Tracker(int steps, int totalCalories, int goalId, User user, List<Calorie> calories) {
		super();
		this.steps = steps;
		this.totalCalories = totalCalories;
		this.user = user;
		this.goalId = goalId;
		this.calories = calories;
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
	
	public List<Calorie> getCalories() {
		return calories;
	}

	public void setCalories(List<Calorie> calories) {
		this.calories = calories;
	}

	public void setTotalCalories(int totalCalories) {
		this.totalCalories = totalCalories;
	}

	public int getTotalCalories() {
		return totalCalories;
	}
	
	public void resetTotal() {
		totalCalories = 0;
	}
}
