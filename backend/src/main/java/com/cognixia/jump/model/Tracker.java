package com.cognixia.jump.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.cognixia.jump.model.User.Sex;
import com.cognixia.jump.model.User.TrackType;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	
	
    @Temporal(TemporalType.DATE) // For using java.util.Date
    private LocalDate entryDate; // Date associated with the entry	
		

	
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",  unique = true)
	private User user;
	
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Nutrition> nutrition ;
		
	@OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
	private List<Days> Days ;
	 
	private double totalDailySteps; 
	private double totalCaloriesConsumed;

	
	public Tracker() {
		
	}

	public Tracker(User user) {
		this.user = user;
		setEntryDate(LocalDate.now());
	}




	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
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
		Days = days;
	}

//	public List<Days> getDays() {
//		return Days;
//	}




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
