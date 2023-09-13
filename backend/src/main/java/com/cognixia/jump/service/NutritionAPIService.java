package com.cognixia.jump.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Optional;

import com.cognixia.jump.model.Nutrition;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


@Service
public class NutritionAPIService {
	
    private final String apiKey = "fwVJKoc49pr10UaaoZMCXA==aowoqOVFspMQIjy9"; // Replace with your actual API key

	 public Optional<Nutrition> parseAPI(String query) {
	        try {
	            String apiUrl = "https://api.api-ninjas.com/v1/nutrition?query=" + query;
	            System.out.println("url: " + apiUrl);
	            URL url = new URL(apiUrl);

	            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
	            connection.setRequestProperty("accept", "application/json");
	            connection.setRequestProperty("X-Api-Key", apiKey);

	            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
	                InputStream responseStream = connection.getInputStream();
	                ObjectMapper mapper = new ObjectMapper();
	                JsonNode root = mapper.readTree(responseStream);

	                // Parse the JSON and create a Nutrition object
	                Nutrition nutrition = parseNutritionFromJson(root);

	                // Return the Nutrition object wrapped in an Optional
	                return Optional.ofNullable(nutrition);
	            } else {
	                System.err.println("HTTP Response Code: " + connection.getResponseCode());
	                System.err.println("HTTP Response Message: " + connection.getResponseMessage());
	                return Optional.empty();
	            }
	        } catch (IOException e) {
	            // Handle exceptions that may occur during the HTTP request or JSON parsing
	            e.printStackTrace(); // You should handle or log the exception properly
	            return Optional.empty();
	        }
	    }

	    private Nutrition parseNutritionFromJson(JsonNode jsonNode) {
	        // Parse the JSON data and create a Nutrition object here
	        // Example:
	        JsonNode firstObject = jsonNode.get(0);
	    	String name = firstObject.path("name").asText();
	        float foodCalories = (float) firstObject.path("calories").floatValue();
	        float servingSize = (float) firstObject.path("serving_size_g").floatValue();
	        float fatTotal = (float) firstObject.path("fat_total_g").floatValue();
	        float fatSaturated = (float) firstObject.path("fat_saturated_g").floatValue();
	        float protein = (float) firstObject.path("protein_g").floatValue();
	        float sodium = (float) firstObject.path("sodium_mg").floatValue();
	        float potassium = (float) firstObject.path("potassium_mg").floatValue();
	        float cholesterol = (float) firstObject.path("cholesterol_mg").floatValue();
	        float carbohydratesTotal = (float) firstObject.path("carbohydrates_total_g").floatValue();
	        float fiber = (float) firstObject.path("fiber_g").floatValue();
	        float sugar = (float) firstObject.path("sugar_g").floatValue();
	        Nutrition nutrition = new Nutrition(name, foodCalories, servingSize, fatTotal,
	        		fatSaturated, protein, sodium, potassium, cholesterol,carbohydratesTotal,
	        		fiber, sugar);
	        System.out.println(nutrition.toString());
	        return nutrition;
	    }
	}


