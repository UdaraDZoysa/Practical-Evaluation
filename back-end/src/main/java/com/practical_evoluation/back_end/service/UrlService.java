package com.practical_evoluation.back_end.service;

import com.practical_evoluation.back_end.dto.UrlCreateRequest;
import com.practical_evoluation.back_end.entity.UrlMapping;

import java.util.Collection;
import java.util.List;

public interface UrlService {
    UrlMapping create(UrlCreateRequest req);

    UrlMapping resolve(String code);

    int purgeExpired();

    List<UrlMapping> list();

    void delete(Long id);
}
