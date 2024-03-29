package com.cognixia.jump.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Days;
import com.cognixia.jump.model.Tracker;

import jakarta.transaction.Transactional;

@Repository
public interface DaysRepository extends JpaRepository<Days, Integer> {

	List<Days> findByTrackerId(Integer trackerId);

	List<Days> findAllByTrackerUser_Id(int userId);

	@Query("SELECT d FROM Days d LEFT JOIN FETCH d.tracker WHERE d.tracker.id = :trackerId")
	List<Days> findDaysWithTrackerByTrackerId(@Param("trackerId") Integer trackerId);

	Optional<Days> findByTrackerAndEntryDate(Tracker tracker, LocalDate entryDate);

	
	@Modifying
	@Transactional
	@Query("UPDATE Days d SET d.totalDailySteps = d.totalDailySteps + :steps WHERE d.id = :id")
	void updateTotalDailySteps(@Param("id") Integer id, @Param("steps") Double steps);
	


}