package com.practical_evoluation.back_end.controller;

import com.practical_evoluation.back_end.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RedirectController {
    @Autowired
    private UrlService service;

    @GetMapping("/{code}")
    public ResponseEntity<?> redirect(@PathVariable String code) {
        var m = service.resolve(code); // Try to find the matching original URL
        return m == null
                ? ResponseEntity.notFound().build() // Return 404 if not found
                : ResponseEntity.status(302)   // Redirect if found
                .header("Location", m.getOriginalUrl())
                .build();
    }
}
