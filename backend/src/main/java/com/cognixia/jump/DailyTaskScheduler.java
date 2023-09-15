package com.cognixia.jump;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cognixia.jump.model.Days;
import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.DaysRepository;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.ControllerService;

@Component
public class DailyTaskScheduler {
	
	@Autowired
	UserRepository userRepo;
	
	@Autowired
	DaysRepository daysRepo;
	
	@Autowired
	ControllerService controllerService;

    @Scheduled(cron = "0 0 0 * * ?") // This cron expression triggers the method at midnight every day
    public void performDailyTask() {
        List<User> users = userRepo.findAll(); // Replace with your user retrieval logic
        

        for (User user : users) {
            ZoneId userTimeZone = ZoneId.of(user.getTimeZone());
            LocalDateTime now = LocalDateTime.now(userTimeZone);
            LocalDateTime midnight = now.toLocalDate().atStartOfDay();
            Tracker tracker = user.getTracker();


            // Check if the current time is midnight in the user's time zone
            if (now.equals(midnight)) {
                // Insert a new day for this user
        	    Days newDay = new Days();
        	    newDay.setTracker(tracker);
        	    
        	    controllerService.insertNewDay(newDay);

        	    // Retrieve the days associated with the tracker and set them
        	    tracker.setDays(daysRepo.findByTrackerId(tracker.getId()));
            }
        }
    }
}