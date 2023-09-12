package com.cognixia.jump;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.cognixia.jump.model.Goal;
import com.cognixia.jump.model.User.TrackType;
import com.cognixia.jump.repository.GoalRepository;


//@Component
public class DataInitializer implements CommandLineRunner {

    private final GoalRepository goalRepository;

    @Autowired
    public DataInitializer(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }

    @Override
    public void run(String... args) {
        // Create and save the sample goals
        Goal weightLossGoal = new Goal();
        weightLossGoal.setTrackType(TrackType.WEIGHT_LOSS);
        weightLossGoal.setCalories(2000);
        weightLossGoal.setSteps(10000);
        goalRepository.save(weightLossGoal);

        Goal weightGainGoal = new Goal();
        weightGainGoal.setTrackType(TrackType.WEIGHT_GAIN);
        weightGainGoal.setCalories(3000);
        weightGainGoal.setSteps(7500);
        goalRepository.save(weightGainGoal);

        Goal weightMaintainGoal = new Goal();
        weightMaintainGoal.setTrackType(TrackType.WEIGHT_MAINTAIN);
        weightMaintainGoal.setCalories(2500);
        weightMaintainGoal.setSteps(7000);
        goalRepository.save(weightMaintainGoal);
        
        
    }
}