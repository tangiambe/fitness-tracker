package com.cognixia.jump.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;


@Entity
public class Tracker implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",  unique = true)
	private User user;
	
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Nutrition> nutrition ;
		
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Days> days ;
	 
	private double totalDailySteps; 
	private double totalCaloriesConsumed;

	
	public Tracker() {
		
	}

	public Tracker(User user) {
		this.user = user;
	}
	
	public void newDay(Tracker tracker) {
		if (nutrition != null)  {nutrition.clear();}
		totalDailySteps = 0;
		totalCaloriesConsumed = 0;
		enqueueDays(new Days(tracker));
		if (days.size() > 14) {
			dequeueDays();
		}
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
		
	

//	public User getUser() {
//		return user;
//	}

	public void setUser(User user) {
		this.user = user;
	}
	

	public List<Nutrition> getNutritions() {
		return nutrition;
	}

	public void setNutritions(List<Nutrition> nutritions) {
		this.nutrition = nutritions;
	}

	public void setDays(List<Days> days) {
		this.days = days;
	}

//	public List<Days> getDays() {
//		return Days;
//	}
    // Method to enqueue a Days object
    public void enqueueDays(Days day) {
        if (days == null) {
            days = new LinkedList<>(); // Initialize the list if it's null
        }
        days.add(day);
    }
    
    // Method to dequeue the first Days object
    public Days dequeueDays() {
        if (days != null && !days.isEmpty()) {
            return days.remove(0);
        }
        return null; // Return null if the queue is empty
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
	
	
	
}
