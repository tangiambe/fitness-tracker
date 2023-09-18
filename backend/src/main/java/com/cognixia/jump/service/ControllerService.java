package com.cognixia.jump.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Queue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.cognixia.jump.dto.DaysWithTrackerDTO;
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

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.transaction.Transactional;

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

	
	@PersistenceContext
    private EntityManager entityManager;
	
	@Temporal(TemporalType.DATE) // For using java.util.Date
    public static LocalDate today = LocalDate.now();
	public static LocalDate yesterday = LocalDate.now().minusDays(1);
	
	@Transactional
	public User insertNewUser(String firstName, String lastName, String email, String userName,
	                        String password, Sex sex, int age, TrackType trackType,
	                        int height, int weight, ActiveType activityType, String timeZone) {
	    // Create a new user
	    User newUser = new User(firstName, lastName, email, userName, password, sex, age,
	            trackType, height, weight, activityType, timeZone);
	    newUser.setRole(Role.ROLE_USER);

	    // Create a new goal for the user
	    Goal goal = new Goal(newUser);
	    goalRepo.save(goal);
	    newUser.setGoal(goal);

	    // Create a new tracker for the user
	    Tracker tracker = new Tracker();
	    tracker.setUser(newUser);
	    tracker = trackerRepo.save(tracker);
	    newUser.setTracker(tracker);

	    // Save the user to the database
	    newUser = userRepo.save(newUser);

	    // Create a new day and associate it with the tracker
	    Days newDay = new Days();
	    newDay.setTracker(tracker);

	    // Call the insertNewDay method to process the new day
	    Days createdDay = insertNewDay(newDay);

	    // Retrieve the days associated with the tracker and set them
	    tracker.setDays(daysRepo.findByTrackerId(tracker.getId()));

	    return userRepo.save(newUser);
	}



	public Optional<User> getByUserId(Integer userId) {

		return userRepo.getByUserId(userId);
		
	}
	public List<Days> findByTrackerId(Integer id){
		
		return daysRepo.findByTrackerId(id);
	}
	
	@Transactional
	public Days addFood(Tracker tracker, Nutrition nutrition, LocalDate entryDate) {
	    Integer quantity = 1;
	    Days day;
	    List<Days> days = tracker.getDays();

	    Optional<Days> tempDay = getDaysFromTrackerByEntryDate(tracker, entryDate);
	    if (tempDay.isEmpty()) {
	        day = new Days(entryDate);
	    } else {
	        day = tempDay.get();
	    }

	    List<Nutrition> nutritionList = day.getNutritions();

	    Optional<Nutrition> saved = nutritionList.stream()
	            .filter(n -> n.getName().toLowerCase().contains(nutrition.getName()))
	            .findFirst();

	    if (saved.isEmpty()) {
	        nutrition.setTotalCalories(nutrition.getFoodCalories());
	        nutrition.setTotalServingSize(nutrition.getServing_size_g());
	        nutrition.setQuantity(quantity);
	        nutritionList.add(nutrition);
	        
	        // Set the tracker association for the day
	        day.setTracker(tracker); // Set the tracker association

	        // Update the total calories consumed for the tracker
	        day.setTotalCaloriesConsumed(day.getTotalCaloriesConsumed() + nutrition.getFoodCalories());
	        
	        // Save the updated nutrition list in the tracker
	        day.setNutritions(nutritionList);

	        // Save the tracker with updated information
	        day = daysRepo.save(day);

	        // Set the tracker association for the nutrition
	        nutrition.setDay(day);

	        // Save the nutrition
	        nutritionRepo.save(nutrition);
	        System.out.println(nutrition.toString());
	    } else {
	        tracker.setId(day.getTracker().getId()); // Set the trackerId to the day's trackerId
	        addNutritionTotals(tracker.getId(), saved.get().getId(),
	                quantity, nutrition.getFoodCalories(), nutrition.getServing_size_g(), entryDate);
	    }
	    
	    return day;
	}

        public void updateTrackerTotalCalories(int trackerId, double newTotalCalories, LocalDate entryDate) {
        	entityManager.createQuery(
        		    "UPDATE Days d SET d.totalCaloriesConsumed = :newTotalCalories " +
        		    "WHERE d.tracker.id = :trackerId AND d.entryDate = :entryDate")
        		    .setParameter("newTotalCalories", newTotalCalories)
        		    .setParameter("trackerId", trackerId)
        		    .setParameter("entryDate", entryDate)
        		    .executeUpdate();
        }
        
        public void updateNutritionProperties(int trackerId, int nutritionId, int quantityToAdd, float caloriesToAdd, float servingSizeToAdd, LocalDate entryDate) {
            Tracker tracker = trackerRepo.findById(trackerId).orElse(null);

            if (tracker != null) {
                Optional<Days> dayOptional = getDaysFromTrackerByEntryDate(tracker, entryDate);

                if (dayOptional.isPresent()) {
                    Days day = dayOptional.get();
                    for (Nutrition nutrition : day.getNutritions()) {
                        // Check if the nutrition ID matches the specified nutritionId
                        if (nutrition.getId() == nutritionId) {
                            // Update the properties of the nutrition
                            int newQuantity = nutrition.getQuantity() + quantityToAdd;
                            float newCalories = nutrition.getTotalCalories() + caloriesToAdd;
                            float newServingSize = nutrition.getTotalServingSize() + servingSizeToAdd;

                            nutrition.setQuantity(newQuantity);
                            nutrition.setTotalCalories(newCalories);
                            nutrition.setTotalServingSize(newServingSize);

                            // Save the updated nutrition
                            nutritionRepo.save(nutrition);
                        }
                    }

                    // Save the updated day
                    daysRepo.save(day);
                }
            }
        }

        public void enqueueUser(User user) {
            // Create a new Tracker object for the user and enqueue it
            Tracker tracker = new Tracker();
            tracker.setUser(user);
            // Other tracker properties initialization
            
            // Save the tracker object in the database
            trackerRepo.save(tracker);
        }
        
        @Transactional
        public Days insertNewDay(Days day) {
            // Assuming you have access to the associated tracker, you can access it via day.getTracker()
            Tracker tracker = day.getTracker();

            // Check if the number of days exceeds 14 and dequeue if necessary
            Queue<Days> daysQueue = tracker.getDaysQueue();
            if (daysQueue.size() >= 14) {
                Days removedDay = daysQueue.poll();

                // Calculate the total daily steps for the tracker by iterating through all days
                double totalDailySteps = 0.0;
                for (Days d : daysQueue) {
                    totalDailySteps += d.getTotalDailySteps();
                }

                // Set the totalDailySteps property of the day
                day.setTotalDailySteps(totalDailySteps);
            }

            // Create a new day and associate it with the tracker
            Days newDay = new Days();
            daysQueue.offer(newDay);

            // Save the updated tracker
            saveTracker(tracker);

            // Save the new day
            return daysRepo.save(newDay);
        }


        private double calculateTotalDailySteps(Queue<Days> daysQueue) {
            double totalDailySteps = 0.0;
            for (Days d : daysQueue) {
                totalDailySteps += d.getTotalDailySteps();
            }
            return totalDailySteps;
        }


        @Scheduled(cron = "0 0 * * *") // This cron expression triggers the method every day at midnight
        public void newDayForAllUsers() {
            List<Days> daysList = daysRepo.findAll(); // Fetch all days from the repository

            for (Days day : daysList) {
                insertNewDay(day); // Call the insertNewDay method for each day
            }
        }

        public void saveTracker(Tracker tracker) {
            entityManager.persist(tracker);
        }
        
        public void saveDays(Days day) {
            entityManager.persist(day);
        }
        
        public List<Tracker> getTrackersByEntryDate(LocalDate entryDate) {
            return trackerRepo.findByDaysEntryDate(entryDate);
        }

	private Optional<Days> getDaysFromTrackerByEntryDate(Tracker tracker, LocalDate entryDate) {
		return daysRepo.findByTrackerAndEntryDate(tracker, entryDate);
	}
	public void addNutritionTotals(int trackerId, int nutritionId, int quantityToAdd, float caloriesToAdd, float servingSizeToAdd, LocalDate entryDate) {
	    // Calculate the total calories for the specified entry date and tracker
	    Double totalCaloriesConsumed = entityManager.createQuery(
	            "SELECT SUM(n.foodCalories * n.quantity) FROM Nutrition n " +
	            "WHERE n.day.tracker.id = :trackerId AND n.day.entryDate = :entryDate",
	            Double.class)
	            .setParameter("trackerId", trackerId)
	            .setParameter("entryDate", entryDate)
	            .getSingleResult();

	    // Calculate the new total calories consumed by adding the caloriesToAdd
	    totalCaloriesConsumed += (caloriesToAdd * quantityToAdd);

	    // Update the tracker's total calories consumed
	    updateTrackerTotalCalories(trackerId, totalCaloriesConsumed, entryDate);

	    // Update nutrition properties
	    updateNutritionProperties(trackerId, nutritionId, quantityToAdd, caloriesToAdd, servingSizeToAdd, entryDate);
	}
    public boolean deleteUser(int id) {
        boolean exists = userRepo.existsById(id);

        if (exists) {
            userRepo.deleteById(id);
            return true;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with ID " + id + " not found");
        }
    }
    public User checkLogin(String userName, String password) { 
    		
    	Optional<User> user = userRepo.findByUserNameContainingAndPasswordContaining(userName, password);
    	
    	if(user.isEmpty()) {
    		User noUser = new User();
    		noUser.setId(-1);
    		return noUser;
    	}
    	user.get().setEnabled(true);
    	
    	return user.get();    }
}


