package com.practical_evoluation.back_end.controller;

import com.practical_evoluation.back_end.dto.UrlCreateRequest;
import com.practical_evoluation.back_end.dto.UrlCreateResponse;
import com.practical_evoluation.back_end.dto.UrlDto;
import com.practical_evoluation.back_end.entity.UrlMapping;
import com.practical_evoluation.back_end.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;

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

    @GetMapping
    public List<UrlDto> list() {

        DateTimeFormatter fmt = DateTimeFormatter.ISO_LOCAL_DATE;   // 2025‑05‑03

        ZoneId zone = ZoneId.systemDefault();                       // or ZoneOffset.UTC

        return service.list().stream()
                .map(u -> new UrlDto(
                        u.getId(),
                        u.getShortCode(),
                        u.getOriginalUrl(),
                        u.getClicks(),
                        u.getCreatedAt().atZone(zone)      // Instant → ZonedDateTime
                                .toLocalDate()        // → LocalDate
                                .format(fmt),         // → String
                        u.getExpiresAt().atZone(zone)
                                .toLocalDate()
                                .format(fmt)))
                .toList();
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
