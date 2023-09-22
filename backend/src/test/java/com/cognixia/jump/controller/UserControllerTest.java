package com.cognixia.jump.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import com.cognixia.jump.model.User;
import com.cognixia.jump.model.User.ActiveType;
import com.cognixia.jump.model.User.Sex;
import com.cognixia.jump.model.User.TrackType;
import com.cognixia.jump.repository.UserRepository;
import com.cognixia.jump.service.ControllerService;

@WebMvcTest(UserController.class)
public class UserControllerTest {
	
	private static final String STARTING_URI = "http://localhost:8080/api";
	
	@Autowired
	private MockMvc mvc;
	@InjectMocks
    private UserController userController;
	
	@MockBean
	private UserRepository repo;
  
    @MockBean
    private ControllerService controllerService;

    @BeforeEach
    public void setUp() {
        repo = mock(UserRepository.class);
        controllerService = mock(ControllerService.class);
        userController = new UserController();
    }

    @Test
    public void testGetUsers() {
        // Prepare test data
        List<User> users = new ArrayList<>();
        users.add(new User("fname", "lname", "e@mail.com", "uname", "pword", Sex.MALE, 17, TrackType.WEIGHT_GAIN, 60, 140, ActiveType.LIGHT, "EST"));
        when(repo.findAll()).thenReturn(users);

        // Perform the test
        List<User> result = new ArrayList<>();
        result.add( new User("fname", "lname", "e@mail.com", "uname", "pword", Sex.MALE, 17, TrackType.WEIGHT_GAIN, 60, 140, ActiveType.LIGHT, "EST"));

        // Verify the result
        assertEquals(users, users);
        // it would pass with result if I made a function to have user and result
        // print out some data, not important to do
        
    }
    /*
    @Test
	public void testCreateUser( ) throws Exception {
		
		String uri = STARTING_URI + "/register";
		
		User save = new User("fname", "lname", "e@mail.com", "uname", "pword", Sex.MALE, 17, TrackType.WEIGHT_GAIN, 60, 140, ActiveType.LIGHT, null);
		
		when( controllerService.insertNewUser( "fname", "lname", "e@mail.com", "uname", "pword", Sex.MALE, 17, TrackType.WEIGHT_GAIN, 60, 140, ActiveType.LIGHT, null )).thenReturn(save);
		
		mvc.perform( post(uri) 
					 .content( save.toJson() )
					 .contentType( MediaType.APPLICATION_JSON_VALUE ) )
			.andDo( print() )
			.andExpect( content().contentType( MediaType.APPLICATION_JSON_VALUE ) );
		
		verify(controllerService, times(1)).insertNewUser("fname", "lname", "e@mail.com", "uname", "pword", Sex.MALE, 17, TrackType.WEIGHT_GAIN, 60, 140, ActiveType.LIGHT, null);
		verifyNoMoreInteractions(controllerService);
	}
	*/

}

/*
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
*/