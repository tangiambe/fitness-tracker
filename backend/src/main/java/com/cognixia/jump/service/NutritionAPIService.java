package com.cognixia.jump.service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
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

public List<Nutrition> parseAPI(String query) {
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

            // Parse the JSON and create a list of Nutrition objects
            List<Nutrition> nutritionList = parseNutritionListFromJson(root);

            // Return the list of Nutrition objects
            return nutritionList;
        } else {
            System.err.println("HTTP Response Code: " + connection.getResponseCode());
            System.err.println("HTTP Response Message: " + connection.getResponseMessage());
            return Collections.emptyList(); // Return an empty list in case of failure
        }
    } catch (IOException e) {
        // Handle exceptions that may occur during the HTTP request or JSON parsing
        e.printStackTrace(); // You should handle or log the exception properly
        return Collections.emptyList(); // Return an empty list in case of exceptions
    }
}

private List<Nutrition> parseNutritionListFromJson(JsonNode jsonNode) {
    List<Nutrition> nutritionList = new ArrayList<>();
    
    // Iterate through the JSON data and create Nutrition objects for each item
    for (JsonNode item : jsonNode) {
        String name = item.path("name").asText();
        float foodCalories = (float) item.path("calories").floatValue();
        float servingSize = (float) item.path("serving_size_g").floatValue();
        float fatTotal = (float) item.path("fat_total_g").floatValue();
        float fatSaturated = (float) item.path("fat_saturated_g").floatValue();
        float protein = (float) item.path("protein_g").floatValue();
        float sodium = (float) item.path("sodium_mg").floatValue();
        float potassium = (float) item.path("potassium_mg").floatValue();
        float cholesterol = (float) item.path("cholesterol_mg").floatValue();
        float carbohydratesTotal = (float) item.path("carbohydrates_total_g").floatValue();
        float fiber = (float) item.path("fiber_g").floatValue();
        float sugar = (float) item.path("sugar_g").floatValue();
        
        Nutrition nutrition = new Nutrition(name, foodCalories, servingSize, fatTotal,
                fatSaturated, protein, sodium, potassium, cholesterol, carbohydratesTotal,
                fiber, sugar);
        
        nutritionList.add(nutrition);
    }
    
    return nutritionList;
}
}


