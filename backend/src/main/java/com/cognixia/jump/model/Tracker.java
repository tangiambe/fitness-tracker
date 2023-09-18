package com.cognixia.jump.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;


@Entity
public class Tracker implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public static int maxDays = 14;
	

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    
    @OneToMany(mappedBy = "tracker", cascade = CascadeType.ALL)
    @OrderBy("entryDate ASC")
    @JsonManagedReference // Use this annotation to prevent serialization loop
    private List<Days> days = new ArrayList<>();
	 

	
	public Tracker() {
		
	}

	public Tracker(User user) {
		this.user = user;
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
	

	public void setDays(List<Days> days) {
		this.days = days;
	}

	public List<Days> getDays() {
		return days;
	}
	
	public void addDay(Days day) {
	    if (days == null) {
	        days = new ArrayList<>();
	    }
	    days.add(day);
	}
    
	public void limitDays(int maxDays) {
	    if (days.size() > maxDays) {
	        days.subList(0, days.size() - maxDays).clear();
	    }
	}
    
	public Queue<Days> getDaysQueue() {
	    // Assuming you have a List of Days, you can convert it to a Queue
	    // and return it as a Queue
	    return new LinkedList<>(this.days);
	}
}
