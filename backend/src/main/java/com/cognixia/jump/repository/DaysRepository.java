package com.cognixia.jump.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Days;


@Repository
public interface DaysRepository extends JpaRepository<Days, Integer>  {


	@Query("SELECT d FROM Days d WHERE d.user.id = :id")
	List<Days> getAllDaysByUserId(Integer id);

}
