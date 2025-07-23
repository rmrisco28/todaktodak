package com.example.backend.member.dto;

import lombok.Data;

@Data
public class AddressDto {
    private String fullAddress;
    private String detail;
    private String postcode;

    // 주소 문자열 조합
    public String getFormattedAddress() {
        return String.format("%s %s (%s)", fullAddress, detail, postcode);
    }
}
