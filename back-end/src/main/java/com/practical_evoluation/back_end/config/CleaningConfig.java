package com.practical_evoluation.back_end.config;

import com.practical_evoluation.back_end.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

// This class handles automatic cleanup of expired short URLs
@EnableScheduling
@Component
public class CleaningConfig {
    @Autowired
    private UrlService service;

    //method runs every hour and deletes expired URL records
    @Scheduled(cron = "0 0 * * * *")
    public void purge() {
        // Remove expired URLs from database
        int removed = service.purgeExpired();
        if (removed > 0) System.out.println("Purged " + removed + " expired links");// Log
    }
}
