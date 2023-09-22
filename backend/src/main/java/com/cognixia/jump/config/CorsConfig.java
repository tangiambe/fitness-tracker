package com.cognixia.jump.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// CORS -> policy or set of rules about which clients can consume APIs from this service

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {
	
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry
            .addMapping("/**")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
    }

}