package com.cognixia.jump.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	
	private LocalDate entryDate;
	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",  unique = true)
	private User user;
	
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Nutrition> nutrition ;
		
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Days> Days ;

	 @ManyToOne
	 @JoinColumn(name = "goal_id", referencedColumnName = "id")
	 private Goal goal;
	
	public Tracker() {}

	public Tracker(Integer id, int steps, float totalCalories, User user, List<Nutrition> nutrition, Goal goal) {
		super();
		this.id = id;
		this.steps = steps;
		this.totalCalories = totalCalories;
		this.user = user;
		this.nutrition = nutrition;
		this.goal = goal;
	}
	public Tracker(int steps, float totalCalories, Goal goal, User user, List<Nutrition> nutrition) {
		super();
		this.steps = steps;
		this.totalCalories = totalCalories;
		this.user = user;
		this.goal = goal;
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
	
	@Override
	public String toString() {
		return "Tracker [id=" + id + ", steps=" + steps + ", totalCalories=" + totalCalories + ", user=" + user
				+ ", nutrition=" + nutrition + ", Days=" + Days + ", goal=" + goal + "]";
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

	public Goal getGoal() {
		return goal;
	}

	public void setGoal(Goal goal) {
		this.goal = goal;
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}
	
	
	
	
}
