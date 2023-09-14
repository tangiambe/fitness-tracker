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
	
	public static LocalDate today = LocalDate.now();
	public static LocalDate yesterday = LocalDate.now().minusDays(1);
	public static LocalDate twoDaysAgo = LocalDate.now().minusDays(2);


    @Temporal(TemporalType.DATE) // For using java.util.Date
    private LocalDate entryDate; // Date associated with the entry	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
    
    @ManyToOne
    @JoinColumn(name = "tracker_id", referencedColumnName = "id")
    private Tracker tracker;
	
    
    public Days() {
    	entryDate = today;
    }
    
    

	public Days(Tracker tracker) {
		this.tracker = tracker;
		entryDate = today;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Tracker getTracker() {
		return tracker;
	}

	public void setTracker(Tracker tracker) {
		this.tracker = tracker;
	}



	public LocalDate getEntryDate() {
		return entryDate;
	}



	public void setEntryDate(LocalDate entryDate) {
		this.entryDate = entryDate;
	}
	
	

	
}
