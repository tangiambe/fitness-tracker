package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.List;


import com.cognixia.jump.model.User.Role;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;


@Entity
public class User implements Serializable {

	
	public static enum TrackType {
		WEIGHT_LOSS, WEIGHT_GAIN, WEIGHT_MAINTAIN	
	}
	
	public static enum Role {
		ROLE_USER, ROLE_ADMIN	
	}
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotBlank(message = "First name cannot be left blank")
	private String firstName;
	
	@NotBlank(message = "Last name cannot be left blank")
	private String lastName;
	
	@Pattern(regexp = "^.+@.+$", message="Not formatted like an email") // checking there's an @ in the email
	@Column( unique = true, nullable = false )  
	private String email;
	
	@Column(unique = true, nullable = false)
	@NotBlank
	private String userName;
	
	@Column(nullable = false)
	@NotBlank
	private String password;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TrackType trackType;
	
	//@JsonProperty(access = Access.WRITE_ONLY)
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Days> days;
	
    @ManyToOne
    @JoinColumn(name = "goal_id", referencedColumnName = "id")
    private Goal goal;
    
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "tracker_id", unique = true)
	private Tracker tracker;
		
	public User() {}

	public User(Integer id, @NotBlank(message = "First name cannot be left blank") String firstName,
			@NotBlank(message = "Last name cannot be left blank") String lastName,
			@Pattern(regexp = "^.+@.+$", message = "Not formatted like an email") String email,
			@NotBlank String userName, @NotBlank String password, Role role, TrackType trackType, List<Days> days,
			Tracker tracker) {
		super();
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.userName = userName;
		this.password = password;
		this.role = role;
		this.trackType = trackType;
		this.days = days;
		this.tracker = tracker;
	}
	
	

	public User(@NotBlank(message = "First name cannot be left blank") String firstName,
			@NotBlank(message = "Last name cannot be left blank") String lastName,
			@Pattern(regexp = "^.+@.+$", message = "Not formatted like an email") String email,
			@NotBlank String userName, @NotBlank String password, TrackType trackType) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.userName = userName;
		this.password = password;
		this.trackType = trackType;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public TrackType getTrackType() {
		return trackType;
	}

	public void setTrackType(TrackType trackType) {
		this.trackType = trackType;
	}



	public List<Days> getDays() {
		return days;
	}

	public void setDays(List<Days> days) {
		this.days = days;
	}

//	public Tracker getTracker() {
//		return tracker;
//	}

	public void setTracker(Tracker tracker) {
		this.tracker = tracker;
	}

	public Goal getGoal() {
		return goal;
	}

	public void setGoal(Goal goal) {
		this.goal = goal;
	}


	
	
}
