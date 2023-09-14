package com.cognixia.jump.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import com.cognixia.jump.model.User.Sex;
import com.cognixia.jump.model.User.TrackType;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;


@Entity
public class Goal implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "goal", cascade = CascadeType.ALL)
	private List<User> users;

	//Base Metabolic Rate measured in calories
	private double bmr;
	
	//TDEE is the total number of calories your body needs to maintain 
	//your current weight, 
	//considering your BMR and physical activity level.
	private double tdee;
	
	//Based on TrackType deficit of 500 for Weight loss
	//deficit of -500 for weight gain
	private double caloricDeficit = 0;
	
	//Daily calorie goal displayed to user. 
	//tdee- calorie deficit
	private double dailyCaloricGoal;
	
	// Used to calculate steps goal
	public static double caloriesBurnedPerStep = 0.05;
	
	//Steps goal displayed to user
	//dailyStepsGoal = dailyCaloricGoal / caloriesBurnedPerStep;
	private double dailyStepsGoal;
	


	public Goal() {

	}
	public Goal(User user) {
		setBmr(user);
		setTdee(user);
		setCaloricDeficit(user);
		setDailyCaloricGoal(tdee, caloricDeficit);
		setDailyStepsGoal(dailyCaloricGoal);
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}

//	public List<User> getUsers() {
//		return users;
//	}

	public void setUsers(List<User> users) {
		this.users = users;
	}
	public double getBmr() {
		return bmr;
	}
	
	
	public void setBmr(User user) {
		
		double tempBmr;
		double cmHeight = user.getHeight() * 2.54;
		double kgWeight = user.getWeight() * 0.45359237;
		
		if (user.getSex() == Sex.MALE)
		{
			tempBmr = (10 * kgWeight) + (6.25 * cmHeight) - 
					(5 * user.getAge()) + 5;
		}
		else {
			tempBmr = (10 * kgWeight) + (6.25 * cmHeight) - 
					(5 * user.getAge()) - 161;
		}
		
		bmr = tempBmr;
	}	
public double getTdee() {
		
		return tdee;
	}
	public void setTdee(User user) {
		
        switch (user.getActivityType()) {
        case NONE:
            tdee = bmr * 1.2; // little or no exercise
            break;
        case LIGHT:
            tdee = bmr * 1.375; // light exercise or sports 1-3 days a week
            break;
        case MODERATE:
            tdee = bmr * 1.55; // moderate exercise or sports 3-5 days a week
            break;
        case VERY:
            tdee = bmr * 1.725; // hard exercise or sports 6-7 days a week
            break;
        case SUPER:
            tdee = bmr * 1.9; // very hard exercise, physical job, or training twice a day
            break;
        default:
            throw new IllegalArgumentException("Invalid ActiveType");
        }	
    }

	
	public double getCaloricDeficit() {
		return caloricDeficit;
	}
	public void setCaloricDeficit(User user) {
		if (user.getTrackType() == TrackType.WEIGHT_GAIN) {
			caloricDeficit = -500.0;
		}
		if (user.getTrackType() == TrackType.WEIGHT_LOSS) {
			caloricDeficit = 500.0;
		}
		
	}
	public double getDailyCaloricGoal() {
		return dailyCaloricGoal;
	}


	public void setDailyCaloricGoal(double tdee, double caloricDeficit) {
		this.dailyCaloricGoal = tdee - caloricDeficit;
	}

	public double getDailyStepsGoal() {
		return dailyStepsGoal;
	}

	public void setDailyStepsGoal(double dailyCaloricGoal ) {
		double goal = dailyCaloricGoal/caloriesBurnedPerStep;
		if (goal > 20000) { 
			this.dailyStepsGoal = 20000.0; }
		else {
			this.dailyStepsGoal = goal;}
	}	
	
	

	
	

}
