package com.practical_evoluation.back_end.service;

import com.practical_evoluation.back_end.dto.UrlCreateRequest;
import com.practical_evoluation.back_end.entity.UrlMapping;

public interface UrlService {
    UrlMapping create(UrlCreateRequest req);

    UrlMapping resolve(String code);

    int purgeExpired();
}
