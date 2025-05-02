package com.practical_evoluation.back_end.service.serviceIMPL;

import com.practical_evoluation.back_end.dto.UrlCreateRequest;
import com.practical_evoluation.back_end.entity.UrlMapping;
import com.practical_evoluation.back_end.repository.UrlMappingRepository;
import com.practical_evoluation.back_end.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.aventrix.jnanoid.jnanoid.NanoIdUtils;

import java.net.URI;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class UrlServiceIMPL implements UrlService {
    @Autowired
    private UrlMappingRepository repo;

    // Default expiry days value (from application.properties)
    @Value("${shortener.default-expiry-days:30}")
    private int defaultDays;

    // Create and save a new short URL
    @Transactional
    public UrlMapping create(UrlCreateRequest req) {
        URI.create(req.originalUrl()); // Check if the URL is valid

        UrlMapping m = new UrlMapping();
        m.setOriginalUrl(req.originalUrl()); // Save the original URL

        // Generate a short code (first 7 characters of a nanoid)
        m.setShortCode( NanoIdUtils.randomNanoId().substring(0, 7) );

        // Save current time as created time
        m.setCreatedAt(Instant.now());

        // Use given expiry days or fallback to default
        int days = req.expiresInDays() != null   //
                ? req.expiresInDays()
                : defaultDays;
        m.setExpiresAt(Instant.now().plus(days, ChronoUnit.DAYS));

        return repo.save(m);
    }

    // Delete expired URLs from the database
    @Transactional
    public int purgeExpired() {
        return repo.deleteByExpiresAtBefore(Instant.now());
    }

    public List<UrlMapping> list() {
        return repo.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Transactional
    public UrlMapping resolve(String code) {
        return repo.findByShortCodeAndExpiresAtAfter(code, Instant.now())
                .map(u -> { u.setClicks(u.getClicks() + 1); return u; })
                .orElse(null);
    }


}
