package com.cognixia.jump.controller;

import java.time.LocalDate;
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

import com.cognixia.jump.dto.DaysWithTrackerDTO;
import com.cognixia.jump.dto.NutritionRequestDTO;
import com.cognixia.jump.model.Days;
import com.cognixia.jump.model.Nutrition;
import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.DaysRepository;
import com.cognixia.jump.repository.TrackerRepository;
import com.cognixia.jump.service.ControllerService;
import com.cognixia.jump.service.NutritionAPIService;

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
		Optional<Nutrition> nutrition = apiService.parseAPI(food);
		Optional<Tracker> tracker = trackerRepo.findById(trackerId);
		if (nutrition.isEmpty()) {
			return ResponseEntity.status(404).body("Food not found");
		} else if (tracker.isEmpty()) {
			return ResponseEntity.status(404).body("TrackerId not found");
		} else {
			Days save = service.addFood(tracker.get(), nutrition.get(), LocalDate.now());
			return ResponseEntity.status(201).body(save);
		}
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

		Optional<Nutrition> nutrition = apiService.parseAPI(food);

		if (nutrition.isEmpty()) {
			return ResponseEntity.status(404).body("Food not found");
		}

		// Add the Nutrition to the Tracker for the specified entryDate
		LocalDate entryDate = nutritionRequestDTO.getEntryDate();
		Days save = service.addFood(tracker, nutrition.get(), entryDate);

		// Return the updated Tracker
		return ResponseEntity.ok(save);
	}

}
