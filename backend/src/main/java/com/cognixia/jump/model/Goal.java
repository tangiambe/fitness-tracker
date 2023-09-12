package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.List;

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
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TrackType trackType;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "goal", cascade = CascadeType.ALL)
	private List<User> users;
	
	
	private int calories;
	private int steps;
	
	public Goal() {}

	public Goal(Integer id, TrackType trackType, int calories, int steps) {
		this.id = id;
		this.trackType = trackType;
		this.calories = calories;
		this.steps = steps;
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public TrackType getTrackType() {
		return trackType;
	}

	public void setTrackType(TrackType trackType) {
		this.trackType = trackType;
	}

	public int getCalories() {
		return calories;
	}

	public void setCalories(int calories) {
		this.calories = calories;
	}

	public int getSteps() {
		return steps;
	}

	public void setSteps(int steps) {
		this.steps = steps;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

//	public List<User> getUsers() {
//		return users;
//	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	@Override
	public String toString() {
		return "Goal [id=" + id + ", trackType=" + trackType + ", calories=" + calories + ", steps=" + steps + "]";
	}



	
}
