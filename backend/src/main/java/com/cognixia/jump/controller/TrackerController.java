package com.cognixia.jump.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.dto.NutritionRequestDTO;
import com.cognixia.jump.model.Days;
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

	//http://localhost:8080/api/tracker/2/nutritionOnDate
	
	
    @PostMapping("/tracker/{trackerId}/nutritionOnDate")
    public ResponseEntity<?> addNutritionToTracker(
            @PathVariable Integer trackerId,
            @RequestBody NutritionRequestDTO nutritionRequestDTO) {

        // Fetch the Tracker by trackerId (You can implement this method in your service)
    	Optional<Tracker> tempTracker = repo.findById(trackerId);

        if (tempTracker == null) {
            return ResponseEntity.notFound().build();
        }
        Tracker tracker = tempTracker.get();
        
        // Extract the Nutrition and entryDate from the DTO
        LocalDate entryDate = nutritionRequestDTO.getEntryDate();
        String food= nutritionRequestDTO.getFood();
        System.out.println("Food: "+ food + " entryDate: " + entryDate);
        
        List<Nutrition> nutrition = apiService.parseAPI(food);
        
		if(nutrition.isEmpty()) {
			return ResponseEntity.status(404).body("Food not found");
		}
        

        // Add the Nutrition to the Tracker for the specified entryDate
       // tracker = controllerService.addFoodToDay(tracker, nutrition.get(), entryDate);

        // Return the updated Tracker
        return ResponseEntity.ok(tracker);
    }
}