package com.cognixia.jump.model;

import java.time.LocalDate;

public class FoodRequestModel {

    private Integer trackerId;
    private LocalDate entryDate;
    private String food;
    private Integer quantity;


    // Default constructor
    public FoodRequestModel() {
    }

    // Parameterized constructor
    public FoodRequestModel(LocalDate entryDate, int trackerId, String food, int quantity) {
        this.trackerId = trackerId;
        this.entryDate = entryDate;
        this.food = food;
        this.quantity = quantity;
    }

    public int getTrackerId()
    {
        return trackerId;
    }

    public void setTrackerId()
    {
        this.trackerId = trackerId;

    }

    // Getters and setters
    public LocalDate getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(LocalDate entryDate) {
        this.entryDate = entryDate;
    }

    public String getFood() {
        return food;
    }

    public void setFood(String food) {
        this.food = food;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }


}
