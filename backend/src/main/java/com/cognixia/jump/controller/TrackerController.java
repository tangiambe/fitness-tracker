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

import com.cognixia.jump.model.Nutrition;
import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.TrackerRepository;
import com.cognixia.jump.service.ControllerService;
import com.cognixia.jump.service.NutritionAPIService;



@RestController
@RequestMapping("/api/")
public class TrackerController {
	
	@Autowired
	TrackerRepository repo;
	
	@Autowired
	ControllerService controllerService;
	
	@Autowired
	NutritionAPIService apiService;
	
	
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
	//
	@PostMapping("/tracker/{trackerId}/{food}")
	public ResponseEntity<?> postNutrition(@PathVariable Integer trackerId,
											@PathVariable String food) {
		Optional<Nutrition> nutrition = apiService.parseAPI(food);
		Optional<Tracker> tracker = repo.findById(trackerId);
		if(nutrition.isEmpty()) {
			return ResponseEntity.status(404).body("Food not found");
		}
		else if (tracker.isEmpty()) {
			return ResponseEntity.status(404).body("TrackerId not found");
		}
		else {
			Tracker save = controllerService.addFood(tracker.get(), nutrition.get());
			return ResponseEntity.status(201).body(save);
		}
	}
}
