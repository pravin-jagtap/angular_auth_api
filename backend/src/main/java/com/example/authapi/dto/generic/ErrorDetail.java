package com.example.authapi.dto.generic;

public class ErrorDetail {

    private String code;

    public ErrorDetail(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
