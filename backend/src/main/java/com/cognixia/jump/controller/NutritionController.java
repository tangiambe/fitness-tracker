package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.Nutrition;
import com.cognixia.jump.repository.NutritionRepository;
import com.cognixia.jump.service.NutritionAPIService;

@RestController
@RequestMapping("/api/")
public class NutritionController {
	
	@Autowired
	NutritionRepository repo;
	
	@Autowired
	NutritionAPIService service;
	
	//http://localhost:8080/api/nutrition/apple	
	@GetMapping("/nutrition/{query}")
	public ResponseEntity<?> getNutritionByUserId(@PathVariable String query) {

		List<Nutrition> nutrition = service.parseAPI(query);
		if(nutrition.isEmpty()) {
			return ResponseEntity.status(404).body("Food not found");
		}
		else {
			return ResponseEntity.status(200).body(nutrition.get(0));
		}
	}
}
