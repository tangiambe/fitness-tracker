package com.cognixia.jump;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.TrackerService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Component
public class TrackerQueueManager {

    private final UserRepository userRepository;
    private final TrackerService trackerService;

    public TrackerQueueManager(UserRepository userRepository, TrackerService trackerService) {
        this.userRepository = userRepository;
        this.trackerService = trackerService;
    }

    @Scheduled(cron = "0 0 * * * *") // Scheduled to run every midnight
    public void enqueueUsers() {
        List<User> users = userRepository.findAll();

        for (User user : users) {
            // Calculate user's midnight in their time zone
            ZoneId userTimeZone = ZoneId.of(user.getTimeZone());
            ZonedDateTime midnightInUserTimeZone = LocalDate.now(userTimeZone).atStartOfDay(userTimeZone);
            LocalTime midnightLocalTime = midnightInUserTimeZone.toLocalTime();

            // Check if it's midnight in the user's time zone
            if (LocalTime.now(userTimeZone).equals(midnightLocalTime)) {
                trackerService.enqueueUser(user);
            }
        }
    }
}
