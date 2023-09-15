package com.cognixia.jump.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.Tracker;

@Repository
public interface TrackerRepository extends JpaRepository<Tracker, Integer>  {
    List<Tracker> findByDaysEntryDate(LocalDate entryDate);

}
