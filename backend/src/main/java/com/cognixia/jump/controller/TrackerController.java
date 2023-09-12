package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.repository.TrackerRepository;



@RestController
@RequestMapping("/api/")
public class TrackerController {
	
	@Autowired
	TrackerRepository repo;
	
	@GetMapping("/tracker/{id}")
	public ResponseEntity<?> getTrackerByUserId(@PathVariable int id) {
		
		Optional<Tracker> user = repo.findById(id);
		
		if(user.isEmpty()) {
			return ResponseEntity.status(404).body("User not found");
		}
		else {
			return ResponseEntity.status(200).body(user.get());
		}
	}
}
