package com.cognixia.jump.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.jump.model.Days;
import com.cognixia.jump.model.Goal;
import com.cognixia.jump.model.Nutrition;
import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.model.User;
import com.cognixia.jump.model.User.ActiveType;
import com.cognixia.jump.model.User.Role;
import com.cognixia.jump.model.User.Sex;
import com.cognixia.jump.model.User.TrackType;
import com.cognixia.jump.repository.DaysRepository;
import com.cognixia.jump.repository.GoalRepository;
import com.cognixia.jump.repository.NutritionRepository;
import com.cognixia.jump.repository.TrackerRepository;
import com.cognixia.jump.repository.UserRepository;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Service
public class ControllerService {
	
	@Autowired 
	DaysRepository daysRepo;
	
	@Autowired 
	NutritionRepository nutritionRepo;
	
	@Autowired 
	GoalRepository goalRepo;
	
	@Autowired 
	UserRepository userRepo;
	
	@Autowired 
	TrackerRepository trackerRepo;
	
	@Autowired 
	NutritionAPIService nutritonService;
	
	@Autowired 
	TrackerService trackerService;
	
	@Temporal(TemporalType.DATE) // For using java.util.Date
    public static LocalDate today = LocalDate.now();
	public static LocalDate yesterday = LocalDate.now().minusDays(1);
	
	
	
	public User insertNewUser(String firstName, String lastName, String email, String userName, 
							String password, Sex sex, int age, TrackType trackType,
							int height, int weight, ActiveType activityType, String timeZone) {
		User insert = new User(firstName, lastName, email, userName, password, sex, age,
						trackType, height, weight, activityType, timeZone);
		insert.setRole(Role.ROLE_USER);
		Goal goal = new Goal(insert);
		goalRepo.save(goal);
		insert.setGoal(goal);
		Tracker tracker = new Tracker(insert);
	//	tracker = trackerRepo.save(tracker);
		tracker.setUser(insert);

		tracker = trackerRepo.save(tracker);		
		insert.setTracker(tracker);
		insert = userRepo.save(insert);
		insertNewDay(tracker);
		tracker.setDays(daysRepo.findByTrackerId(tracker.getId()));
		return userRepo.save(insert);		
	}
	public void insertNewDay(Tracker tracker) {
		tracker.newDay(tracker);
		trackerRepo.save(tracker);
	}
	
	public Optional<User> getByUserId(Integer userId) {

		return userRepo.getByUserId(userId);
		
	}
	public List<Days> findByTrackerId(Integer id){
		
		return daysRepo.findByTrackerId(id);
	}
	
	public Tracker addFood(Tracker tracker, Nutrition nutrition) {

		Integer quantity = 1;
		List<Nutrition> nutritionList= tracker.getNutritions();
				
		Optional<Nutrition> saved = nutritionList.stream()
        .filter(n -> n.getName().toLowerCase().contains(nutrition.getName()))
        .findFirst();
	
		if (saved.isEmpty()) {
			nutrition.setTotalCalories(nutrition.getFoodCalories());
			nutrition.setTotalServingSize(nutrition.getServing_size_g());
			nutrition.setQuantity(quantity);
			nutritionList.add(nutrition);
			tracker.setTotalCaloriesConsumed(tracker.getTotalCaloriesConsumed() + 
					nutrition.getFoodCalories());
			tracker.setNutritions(nutritionList);
			tracker = trackerRepo.save(tracker);
			nutrition.setTracker(tracker);
			nutritionRepo.save(nutrition);
		}
		else {
			trackerService.addTrackerTotals(tracker.getId(), saved.get().getId(), quantity, 
					nutrition.getFoodCalories(), nutrition.getServing_size_g());
		}

		return tracker;
	}
}
