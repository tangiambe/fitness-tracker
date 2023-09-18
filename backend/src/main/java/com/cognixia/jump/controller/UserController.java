package com.cognixia.jump.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
	
	//http://localhost:8080/api/user/{{userId}}
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
	
	//http://localhost:8080/api/register
	@PostMapping("/register")
	public ResponseEntity<?> createUser( @RequestBody User user ) {
		
		User save = service.insertNewUser(user.getFirstName(), user.getLastName(), user.getEmail(),
				 user.getUserName(),user.getPassword(), user.getSex(), user.getAge(), user.getTrackType(),
				user.getHeight(), user.getWeight(), user.getActivityType(), user.getTimeZone());
		
		User created = repo.save(save);
		return ResponseEntity.status(201).body(created);
	}
	//http://localhost:8080/api/login
	@PostMapping("/login")
	public User loginUser( @RequestBody User user ) {
		System.out.println(user.getUserName() + " " +user.getPassword() );
		return service.checkLogin(user.getUserName(), user.getPassword());
	}
		
		
	
	
    @DeleteMapping("/user/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) {
        try {
            service.deleteUser(id);
            return ResponseEntity.ok("Deleted User");
        } catch (ResponseStatusException e) {
            return ResponseEntity.status(e.getStatusCode()).body(e.getReason());
        }
    }

}
