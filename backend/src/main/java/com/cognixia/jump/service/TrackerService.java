package com.cognixia.jump.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognixia.jump.model.Nutrition;
import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.TrackerRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Transactional
@Service
public class TrackerService {
	
    @Autowired
    TrackerRepository trackerRepo;
	
	@PersistenceContext
    private EntityManager entityManager;
    
    public void addTrackerTotals(int trackerId, int nutritionId, int quantityToAdd, float caloriesToAdd,  float servingSizeToAdd) {
        double totalCalories = entityManager.createQuery(
                "SELECT SUM(n.foodCalories * n.quantity) FROM Nutrition n WHERE n.tracker.id = :trackerId",
                Double.class)
                .setParameter("trackerId", trackerId)
                .getSingleResult();
        
        updateTrackerTotalCalories(trackerId, totalCalories);
        updateNutritionProperties(trackerId, nutritionId, quantityToAdd, caloriesToAdd, servingSizeToAdd);
        
    }

        
        public void updateTrackerTotalCalories(int trackerId, double newTotalCalories) {
            entityManager.createQuery(
                "UPDATE Tracker t SET t.totalCaloriesConsumed = :newTotalCalories " +
                "WHERE t.id = :trackerId")
                .setParameter("newTotalCalories", newTotalCalories)
                .setParameter("trackerId", trackerId)
                .executeUpdate();
        }
        public void updateNutritionProperties(int trackerId, int nutritionId, int newQuantity, 
        			float newTotalCalories, float newTotalServingSize) {
            Tracker tracker = entityManager.find(Tracker.class, trackerId);
            if (tracker != null) {
                List<Nutrition> nutritionList = tracker.getNutritions();
                if (nutritionList != null) {
                    for (Nutrition nutrition : nutritionList) {
                        if (nutrition.getId() == nutritionId) {
                            nutrition.setQuantity(nutrition.getQuantity() + newQuantity);
                            nutrition.setTotalCalories(nutrition.getTotalCalories() + newTotalCalories);
                            nutrition.setTotalServingSize(nutrition.getTotalServingSize() + newTotalServingSize);
                            entityManager.merge(tracker); // Save the changes
                            break; // Exit the loop once the Nutrition is updated
                        }
                    }
                }
            }
         }
        public void updateTrackerEntryDate(Integer trackerId, LocalDate newEntryDate) {
            String jpql = "UPDATE Tracker t SET t.entryDate = :newEntryDate WHERE t.id = :trackerId";
            entityManager.createQuery(jpql)
                    .setParameter("newEntryDate", newEntryDate)
                    .setParameter("trackerId", trackerId)
                    .executeUpdate();
        }
        public void enqueueUser(User user) {
            // Create a new Tracker object for the user and enqueue it
            Tracker tracker = new Tracker();
            tracker.setUser(user);
            tracker.setEntryDate(LocalDate.now()); // Set the current date or the date you want
            // Other tracker properties initialization
            
            // Save the tracker object in the database
            trackerRepo.save(tracker);
        }
        
 }
