package com.cognixia.jump.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognixia.jump.model.Goal;
import com.cognixia.jump.model.User.TrackType;

import java.util.Optional;

public interface GoalRepository extends JpaRepository<Goal, Integer> {
    Optional<Goal> findByTrackType(TrackType trackType);

}