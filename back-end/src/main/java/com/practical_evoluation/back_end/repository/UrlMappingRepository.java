package com.practical_evoluation.back_end.repository;

import com.practical_evoluation.back_end.entity.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;
import java.time.Instant;

public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {

    Optional<UrlMapping> findByShortCodeAndExpiresAtAfter(String shortCode, Instant now);

    @Modifying
    int deleteByExpiresAtBefore(Instant cutoff);

    List<UrlMapping> findAllByOrderByCreatedAtDesc();
}
