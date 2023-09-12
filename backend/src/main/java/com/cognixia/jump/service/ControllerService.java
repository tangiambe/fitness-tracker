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
		Tracker tracker = new Tracker(0, 0, goal.getId(), null, null);
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
		
		List<Nutrition> nutritionList= tracker.getNutritions();
		nutritionList.add(nutrition);
		tracker.setNutritions(nutritionList);
		tracker.setTotalCalories(nutrition.getFoodCalories() + 
								tracker.getTotalCalories());
		
		System.out.println("Total Calories: " + tracker.getTotalCalories()
							+ "\nFood Calories: " + nutrition.getFoodCalories());
		tracker = trackerRepo.save(tracker);
		nutrition.setTracker(tracker);
		nutritionRepo.save(nutrition);
		return tracker;
	}
}
