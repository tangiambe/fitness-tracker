package com.cognixia.jump.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cognixia.jump.model.Goal;


public interface GoalRepository extends JpaRepository<Goal, Integer> {
    Goal findByUsersId(Integer userId);

}