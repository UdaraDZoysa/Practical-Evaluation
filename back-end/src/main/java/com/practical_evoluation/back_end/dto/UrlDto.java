package com.practical_evoluation.back_end.dto;

public class UrlDto {
    private Long id;
    private String shortCode;
    private String originalUrl;
    private int clicks;
    private String createdAt;   // ISO‑8601 string
    private String expiresAt;

    public UrlDto(Long id, String shortCode, String originalUrl,
                  int clicks, String createdAt, String expiresAt) {
        this.id = id;
        this.shortCode = shortCode;
        this.originalUrl = originalUrl;
        this.clicks = clicks;
        this.createdAt = createdAt;
        this.expiresAt = expiresAt;
    }
    public Long   getId()          { return id; }
    public String getShortCode()   { return shortCode; }
    public String getOriginalUrl() { return originalUrl; }
    public int    getClicks()      { return clicks; }
    public String getCreatedAt()   { return createdAt; }
    public String getExpiresAt()   { return expiresAt; }
}
