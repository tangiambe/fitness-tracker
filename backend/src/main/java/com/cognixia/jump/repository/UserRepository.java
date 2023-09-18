package com.cognixia.jump.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.cognixia.jump.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	
    @Query("SELECT u FROM User u WHERE u.id = :userId")
    Optional<User> getByUserId(Integer userId);	
    
    Optional<User> findByUserNameContainingAndPasswordContaining(String userName, String password);

}
