package com.cognixia.jump;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.cognixia.jump.model.Nutrition;
import com.cognixia.jump.model.Tracker;
import com.cognixia.jump.model.User;
import com.cognixia.jump.service.ControllerService;


//@Component
public class DataInitializer implements CommandLineRunner{
	

	@Autowired
	ControllerService controllerService;
	
	@Autowired
	public DataInitializer() {
	}

	
	@Override
	public void run(String... args) throws Exception {
        RandomFoodGenerator foodGenerator = new RandomFoodGenerator(controllerService);

        // Create and add User 1
        User user1 = controllerService.insertNewUser(
            "User", "1", "user1@example.com", "user1", "Password123!", User.Sex.MALE,
            30, User.TrackType.WEIGHT_LOSS, 170, 75, User.ActiveType.MODERATE, "UTC"
        );

        // Create and add User 2
        User user2 = controllerService.insertNewUser(
            "User", "2", "user2@example.com", "user2", "Password123!", User.Sex.FEMALE,
            28, User.TrackType.WEIGHT_MAINTAIN, 160, 65, User.ActiveType.LIGHT, "UTC"
        );

        LocalDate startDate = LocalDate.now(); // Start date for adding 14 days of random foods

        // Add 14 days of random foods for User 1
        for (int i = 0; i < 14; i++) {
            foodGenerator.addRandomFoodsToTracker(user1.getTracker(), startDate.plusDays(i));
        }

        // Add 14 days of random foods for User 2
        for (int i = 0; i < 14; i++) {
            foodGenerator.addRandomFoodsToTracker(user2.getTracker(), startDate.plusDays(i));
        }
    }		
	}

class RandomFoodGenerator {
    private final Random random;
    private final ControllerService controllerService;


    public RandomFoodGenerator(ControllerService controllerService) {
        this.controllerService = controllerService;
        this.random = new Random();
    }

    // Method to add random foods to a user's tracker for a single day
    public void addRandomFoodsToTracker(Tracker tracker, LocalDate entryDate) {
        List<Nutrition> randomFoods = generateRandomFoods(); // Generate random food items

        for (Nutrition nutrition : randomFoods) {
            int quantity = random.nextInt(4) + 1; // Random quantity (1 to 4 servings)
            float servingSize = 100.0f; // Fixed serving size for simplicity

            // Add the food to the tracker for the specified day
            controllerService.addFood(tracker, nutrition, entryDate);        }
    }

    // Method to generate random food items (for demonstration purposes)
    private List<Nutrition> generateRandomFoods() {
        // You can create a list of Nutrition objects with random properties here
        // For demonstration, I'll use the food items you provided earlier
        return List.of(
            createApple(),
            createEgg(),
            createPizza(),
            createHamburger(),
            createChicken(),
            createSteak(),
            createDonut()
        );
    }
    private Nutrition createApple() {
        Nutrition nutrition = new Nutrition();
        nutrition.setName("Apple");
        nutrition.setFoodCalories((float) 53.0);
        nutrition.setServing_size_g((float) 100.0);
        // Set other nutritional values as needed
        return nutrition;
    }

    private Nutrition createEgg() {
        Nutrition nutrition = new Nutrition();
        nutrition.setName("Egg");
        nutrition.setFoodCalories((float) 147.0);
        nutrition.setServing_size_g((float) 100.0);
        // Set other nutritional values as needed
        return nutrition;
    }

    private Nutrition createPizza() {
        Nutrition nutrition = new Nutrition();
        nutrition.setName("Pizza");
        nutrition.setFoodCalories((float) 262.9);
        nutrition.setServing_size_g((float) 100.0);
        // Set other nutritional values as needed
        return nutrition;
    }

    private Nutrition createHamburger() {
        Nutrition nutrition = new Nutrition();
        nutrition.setName("Hamburger");
        nutrition.setFoodCalories((float) 242.5);
        nutrition.setServing_size_g((float) 100.0);
        // Set other nutritional values as needed
        return nutrition;
    }

    private Nutrition createChicken() {
        Nutrition nutrition = new Nutrition();
        nutrition.setName("Chicken");
        nutrition.setFoodCalories((float) 222.6);
        nutrition.setServing_size_g((float) 100.0);
        // Set other nutritional values as needed
        return nutrition;
    }

    private Nutrition createSteak() {
        Nutrition nutrition = new Nutrition();
        nutrition.setName("Steak");
        nutrition.setFoodCalories((float) 273.4);
        nutrition.setServing_size_g((float) 100.0);
        // Set other nutritional values as needed
        return nutrition;
    }

    private Nutrition createDonut() {
        Nutrition nutrition = new Nutrition();
        nutrition.setName("Donut");
        nutrition.setFoodCalories((float) 415.9);
        nutrition.setServing_size_g((float) 100.0);
        // Set other nutritional values as needed
        return nutrition;
    }
}

