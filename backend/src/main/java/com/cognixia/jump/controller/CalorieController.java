package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Calorie;
import com.cognixia.jump.repository.CalorieRepository;
import com.cognixia.jump.service.ControllerService;

@RestController
@RequestMapping("/api/")public class CalorieController {
	
	@Autowired
	CalorieRepository repo;
	
	@Autowired
	ControllerService service;
	
//	@GetMapping("/calorie/{id}")
//	public List<Calorie> getCalorieByUserId(@PathVariable Integer id) {
//
//		return service.getCalorieByUserId(id);
//	}
	@PostMapping("/calorie")
	public ResponseEntity<?> createUser( @RequestBody Calorie calorie ) {
		
		calorie.setId(null);
		Calorie created = repo.save(calorie);
		return ResponseEntity.status(201).body(created);
	}

}
