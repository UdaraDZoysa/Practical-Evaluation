package com.practical_evoluation.back_end.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record UrlCreateRequest(
        @NotBlank
        @Pattern(regexp = "https?://.*") String originalUrl,
        Integer expiresInDays
) {
}
