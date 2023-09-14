package com.cognixia.jump;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.cognixia.jump.model.Goal;
import com.cognixia.jump.model.User;
import com.cognixia.jump.model.User.Role;
import com.cognixia.jump.model.User.TrackType;
import com.cognixia.jump.repository.GoalRepository;
import com.cognixia.jump.service.ControllerService;


//@Component
public class DataInitializer implements CommandLineRunner {

    private final GoalRepository goalRepository;

    @Autowired
    public DataInitializer(GoalRepository goalRepository) {
        this.goalRepository = goalRepository;
    }
    
    @Autowired
    ControllerService controllerService;
    

    @Override
    public void run(String... args) {
        // Create and save the sample goals
        createDummyUser();
    }

    public void createDummyUser() {
    	User user = new User();
        user.setFirstName("First");
        user.setLastName("Last");
        user.setPassword("password123");
        user.setRole(Role.ROLE_USER);
        user.setTrackType(TrackType.WEIGHT_LOSS);
        user.setUserName("user3");
        
        controllerService.insertNewUser(user.getFirstName(), user.getLastName(), user.getEmail(),
				 user.getUserName(),user.getPassword(), user.getSex(), user.getAge(), user.getTrackType(),
				user.getHeight(), user.getWeight(), user.getActivityType(), user.getTimeZone());
    }
    
    
}