package com.example.backend.order.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class KakaoPayReadyResponse {
    private String tid;
    
    @JsonProperty("next_redirect_pc_url")
    private String nextRedirectPcUrl;
}
