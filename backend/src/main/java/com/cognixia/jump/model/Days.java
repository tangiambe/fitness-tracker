package com.cognixia.jump.model;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Days implements Serializable  {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "tracker_id", referencedColumnName = "id")
    private Tracker tracker;
	
    @Temporal(TemporalType.DATE) // For using java.util.Date
    private LocalDate entryDate; // Date associated with the entry	
    
    public Days() {}


	public Days(User user, Tracker tracker, LocalDate entryDate) {
		this.user = user;
		this.tracker = tracker;
		this.entryDate = entryDate;
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

	public LocalDate getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}


	public Tracker getTracker() {
		return tracker;
	}

	public void setTracker(Tracker tracker) {
		this.tracker = tracker;
	}


	@Override
	public String toString() {
		return "Days [id=" + id + ", user=" + user + ", tracker=" + tracker + ", entryDate=" + entryDate + "]";
	}
	
	
	
}
