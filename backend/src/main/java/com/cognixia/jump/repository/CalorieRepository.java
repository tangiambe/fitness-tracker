package com.cognixia.jump.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Calorie;


@Repository
public interface CalorieRepository extends JpaRepository<Calorie, Integer>  {
	
   // List<Calorie> findAllByDays_User_Id(Integer userId);

}
