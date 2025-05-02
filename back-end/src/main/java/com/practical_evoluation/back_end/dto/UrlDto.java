package com.practical_evoluation.back_end.dto;

public record UrlDto(String originalUrl,
                     String shortCode,
                     String expiresAt) {
}
