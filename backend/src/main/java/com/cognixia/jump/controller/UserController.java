package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognixia.jump.model.User;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.ControllerService;

@RestController
@RequestMapping("/api/")
public class UserController {
	
	@Autowired
	UserRepository repo;
	
	@Autowired
	ControllerService service;
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return repo.findAll();
	}
	
	
	@GetMapping("/user/{id}")
	public ResponseEntity<?> getUserById(@PathVariable Integer id) {
		
		Optional<User> user = service.getByUserId(id);
		
		if(user.isEmpty()) {
			return ResponseEntity.status(404).body("User not found");
		}
		else {
			return ResponseEntity.status(200).body(user.get());
		}
	}
	
	@PostMapping("/user")
	public ResponseEntity<?> createUser( @RequestBody User user ) {
		
		User save = service.insertNewUser(user.getFirstName(), user.getLastName(), 
				user.getEmail(), user.getUserName(),user.getPassword(), 
				user.getTrackType());
		User created = repo.save(save);
		return ResponseEntity.status(201).body(created);
	}

}