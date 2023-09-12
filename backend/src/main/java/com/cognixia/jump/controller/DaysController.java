package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Days;
import com.cognixia.jump.repository.DaysRepository;
import com.cognixia.jump.service.ControllerService;

@RestController
@RequestMapping("/api/")
public class DaysController {
	
	@Autowired
	DaysRepository repo;
	
	@Autowired
	ControllerService service;

//	http://localhost:8080/api/days/1
	@GetMapping("/days/{id}")
	public ResponseEntity<?> getAllDaysByUserId(@PathVariable Integer id) {
		
		List<Days> days = service.getAllDaysByUserId(id);
		
		if(days.isEmpty()) {
			return ResponseEntity.status(404).body("User not found");
		}
		else {
			return ResponseEntity.status(200).body(days);
		}
	}

}
