package com.cognixia.jump.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.dto.DaysWithTrackerDTO;
import com.cognixia.jump.dto.NutritionRequestDTO;
import com.cognixia.jump.model.Days;
import com.cognixia.jump.model.FoodRequestModel;
import com.cognixia.jump.model.Nutrition;
import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.DaysRepository;
import com.cognixia.jump.repository.TrackerRepository;
import com.cognixia.jump.service.ControllerService;
import com.cognixia.jump.service.NutritionAPIService;

import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/api/")
public class DaysController {

	@Autowired
	DaysRepository daysRepo;
	@Autowired
	TrackerRepository trackerRepo;

	@Autowired
	ControllerService service;

	@Autowired
	NutritionAPIService apiService;

	// http://localhost:8080/api/days/{{userId}}
	@GetMapping("/days/{id}")
	public ResponseEntity<?> getDaysById(@PathVariable Integer id) {

		List<Days> daysList = daysRepo.findAllByTrackerUser_Id(id);
		return ResponseEntity.status(200).body(daysList);

	}

	// http://localhost:8080/api/days/2/hamburger
	@PostMapping("/days/{trackerId}/{food}")
	public ResponseEntity<?> postNutrition(@PathVariable Integer trackerId,
			@PathVariable String food) {
		List<Nutrition> nutrition = apiService.parseAPI(food);
		Optional<Tracker> tracker = trackerRepo.findById(trackerId);
		if (nutrition.isEmpty()) {
			return ResponseEntity.status(404).body("Food not found");
		} else if (tracker.isEmpty()) {
			return ResponseEntity.status(404).body("TrackerId not found");
		} else {
			Days save = service.addFood(tracker.get(), nutrition.get(0), LocalDate.now(), 1);
			return ResponseEntity.status(201).body(save);
		}
	}

		// http://localhost:8080/api/days/request/addfood
	@PostMapping("/request/addfood")
	public ResponseEntity<?> postNutritionForEntryDate( @RequestBody FoodRequestModel request) {

	    List<Nutrition> nutrition = apiService.parseAPI(request.getFood());
	    Optional<Tracker> tracker = trackerRepo.findById(request.getTrackerId());
	    Days save;
	    if (nutrition.isEmpty()) {
	        return ResponseEntity.status(404).body("Food not found");
	    } else if (tracker.isEmpty()) {
	        return ResponseEntity.status(404).body("TrackerId not found");
	    } else {

	            save = service.addFood(tracker.get(), nutrition.get(0), 
												request.getEntryDate(), request.getQuantity());
	        }

	        return ResponseEntity.status(201).body(save.getId());
	    }
	

    @PatchMapping("/request/updateTotalSteps")
    public ResponseEntity<?> updateTotalSteps(
            @PathParam(value = "id") int id,
            @PathParam(value = "steps") Double steps) {

     
            service.updateTotalDailySteps(id, steps);
    		return ResponseEntity.status(200).body( "Successful" );

        }
   
    


	// http://localhost:8080/api/tracker/2/nutritionOnDate

	@PostMapping("/days/{trackerId}/nutritionOnDate")
	public ResponseEntity<?> addNutritionDifferentDate(
			@PathVariable Integer trackerId,
			@RequestBody NutritionRequestDTO nutritionRequestDTO) {

		// Fetch the Tracker by trackerId (You can implement this method in your
		// service)
		Optional<Tracker> tempTracker = trackerRepo.findById(trackerId);

		if (tempTracker == null) {
			return ResponseEntity.notFound().build();
		}
		Tracker tracker = tempTracker.get();

		// Extract the Nutrition and entryDate from the DTO

		String food = nutritionRequestDTO.getFood();

		List<Nutrition> nutrition = apiService.parseAPI(food);

		if (nutrition.isEmpty()) {
			return ResponseEntity.status(404).body("Food not found");
		}

		// Add the Nutrition to the Tracker for the specified entryDate
		LocalDate entryDate = nutritionRequestDTO.getEntryDate();
		Days save = service.addFood(tracker, nutrition.get(0), entryDate, 1);

		// Return the updated Tracker
		return ResponseEntity.ok(save);
	}
	
		//http://localhost:8080/api/days/day/{{daysId}}
	@GetMapping("/days/day/{id}")
	public ResponseEntity<?> getDaysByDaysId(@PathVariable Integer id) {
		
		Optional<Days> day= daysRepo.findById(id);
		
		if(day.isEmpty()) {
			return ResponseEntity.status(404).body("User not found");
		}
		else {
			return ResponseEntity.status(200).body(day.get());
		}
	}
	

}
