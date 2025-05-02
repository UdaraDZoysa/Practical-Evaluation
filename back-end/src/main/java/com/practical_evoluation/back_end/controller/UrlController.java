package com.practical_evoluation.back_end.controller;

import com.practical_evoluation.back_end.dto.UrlCreateRequest;
import com.practical_evoluation.back_end.dto.UrlCreateResponse;
import com.practical_evoluation.back_end.entity.UrlMapping;
import com.practical_evoluation.back_end.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/urls")
public class UrlController {

    @Autowired
    private UrlService service;

    @PostMapping
    public UrlCreateResponse create(@RequestBody UrlCreateRequest req) {
        UrlMapping m = service.create(req);
        return new UrlCreateResponse(m.getShortCode());
    }
}
