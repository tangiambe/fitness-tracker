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
import com.cognixia.jump.model.User.Role;
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
	
    public Optional<Goal> findGoalByTrackType(TrackType trackType) {
    	return goalRepo.findByTrackType(trackType);
    }
	
	public User insertNewUser(String firstName, String lastName, String email,
						String userName, String password, TrackType trackType) {
		User insert = new User(firstName, lastName, email,userName,
								password, trackType);
		insert.setRole(Role.ROLE_USER);
		Goal goal = goalRepo.findByTrackType(trackType).get();
		insert.setGoal(goal);
		insert.setDays(null);
		Tracker tracker = new Tracker(0, 0, goal, null, null);
	//	tracker = trackerRepo.save(tracker);
		tracker.setUser(insert);

		tracker = trackerRepo.save(tracker);		
		insert.setTracker(tracker);
		insert = userRepo.save(insert);
		
		insertNewDay(insert, tracker);
		insert.setDays(daysRepo.getAllDaysByUserId(insert.getId()));
		System.out.println(insert.getDays().toString());
		return userRepo.save(insert);		
	}
	public void insertNewDay(User user, Tracker tracker) {
		
		trackerService.updateTrackerEntryDate(tracker.getId(), today);
		
		Days day = new Days(user, tracker, LocalDate.now());
		day = daysRepo.save(day);
	}
	
	public Optional<User> getByUserId(Integer userId) {

		return userRepo.getByUserId(userId);
		
	}
	public List<Days> getAllDaysByUserId(Integer id){
		
		return daysRepo.getAllDaysByUserId(id);
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
			tracker.setTotalCalories(tracker.getTotalCalories() + 
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
