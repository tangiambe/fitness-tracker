package com.cognixia.jump.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;


@Entity
public class User implements Serializable {

	
	public static enum TrackType {
		WEIGHT_LOSS, WEIGHT_GAIN, WEIGHT_MAINTAIN	
	}
	
	public static enum Role {
		ROLE_USER, ROLE_ADMIN	
	}
	public static enum Sex {
		MALE, FEMALE	
	}
	
	public static enum ActiveType {
		NONE, //little or no exercise
		LIGHT, //light exercise or sports 1-3 days a week
		MODERATE,// moderate exercise or sports 3-5 days a week
		VERY, //hard exercise or sports 6-7 days a week
		SUPER	//very hard exercise, physical job, or training twice a day
	}
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotBlank(message = "First name cannot be left blank")
	private String firstName = "Not Found";
	
	@NotBlank(message = "Last name cannot be left blank")
	private String lastName = "Not Found";
	
	@Column(unique = true, nullable = false)
	@NotBlank(message = "Username cannot be left blank")
	private String userName = "notfound";
	
	@Pattern(regexp = "^.+@.+$", message="Not formatted like an email") // checking there's an @ in the email
	@Column( unique = true, nullable = false )  
	private String email = "test@aol.com";
	
	@Column(nullable = false)
	@NotBlank(message = "Password cannot be left blank")
	private String password = "Password123!";
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)	
	private Sex sex = Sex.MALE;
	
	@Min(value =13, message = "Minimum Age is 13")
	@Column(nullable = false)	
	private int age=30;
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private TrackType trackType=TrackType.WEIGHT_MAINTAIN;	
	
	@Positive(message = "Please enter Positive Height")
	private int height=54;
	
	@Positive(message = "Please enter Positive Weight")
	private int weight=200;
	
	private boolean enabled = false;
	

	//Ativity Level to calculate tdee
	@Enumerated(EnumType.STRING)
	private ActiveType activityType = ActiveType.NONE;
	
	
    @Column(nullable = false)
    private String timeZone = "America/New_York"; // Default time zone
	
	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role = Role.ROLE_USER;
	
    @ManyToOne
    @JoinColumn(name = "goal_id", referencedColumnName = "id")
    private Goal goal;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore // Add this annotation to prevent infinite recursion
    private Tracker tracker;
    

		
	public User() {}


	public User(@NotBlank(message = "First name cannot be left blank") String firstName,
			@NotBlank(message = "Last name cannot be left blank") String lastName,
			@Pattern(regexp = "^.+@.+$", message = "Not formatted like an email") String email,
			@NotBlank(message = "Username cannot be left blank") String userName,
			@NotBlank(message = "Password cannot be left blank") String password,
			@NotBlank(message = "Sex cannot be left blank") Sex sex,
			@Min(value = 13, message = "Minimum Age is 13") int age,
			@NotBlank(message = "Please choose Weight Loss, Weight Gain, or Weight Maintain") TrackType trackType,
			@Positive(message = "Please enter Positive Height") int height,
			@Positive(message = "Please enter Positive Weight") int weight, ActiveType activityType, String timeZone) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
		this.password = password;
		this.sex = sex;
		this.age = age;
		this.trackType = trackType;
		this.height = height;
		this.weight = weight;
		this.activityType = activityType;
		this.timeZone = timeZone;
		this.email = email;
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


	public Tracker getTracker() {
		return tracker;
	}

	public void setTracker(Tracker tracker) {
		this.tracker = tracker;
	}

	public Goal getGoal() {
		return goal;
	}

	public void setGoal(Goal goal) {
		this.goal = goal;
	}

	public String getTimeZone() {
		return timeZone;
	}

	public void setTimeZone(String timeZone) {
		this.timeZone = timeZone;
	}
	
    @PrePersist
    public void setDefaultTimeZone() {
        if (timeZone == null) {
            timeZone = "America/New_York"; // Set the default time zone if not specified
        }
    }

	public Sex getSex() {
		return sex;
	}

	public void setSex(Sex sex) {
		this.sex = sex;
	}
	
	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public int getHeight() {
		return height;
	}

	public void setHeight(int height) {
		this.height = height;
	}

	public int getWeight() {
		return weight;
	}

	public void setWeight(int weight) {
		this.weight = weight;
	}


	public ActiveType getActivityType() {
		return activityType;
	}

	public void setActivityType(ActiveType activityType) {
		this.activityType = activityType;
	}
	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
public  String toJson() {
		
		return "{\"id\" : " + id
				+ ", \"firstName\" : \"" + firstName + "\""
				+ ", \"lastName\" : \"" + lastName + "\""
				+ ", \"email\" : \"" + email + "\"" 
				+ ", \"userName\" : \"" + userName + "\""
				+ ", \"password\" : \"" + password + "\""
				+ ", \"sex\" : \"" + sex
				+ ", \"age\" : \"" + age + "\""
				+ ", \"trackType\" : \"" + trackType + "\""
				+ ", \"height\" : \"" + height +
				", \"weight\" : \"" + weight + "\""
				+ ", \"activeType\" : \"" + activityType + "\""
				+ ", \"timeZone\" : \"" + timeZone +"\"}";
		
	}

}
