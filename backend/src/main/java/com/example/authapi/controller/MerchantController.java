package com.example.authapi.controller;

import com.example.authapi.dto.merchant.MerchantDetailsRequest;
import com.example.authapi.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/merchant")
public class MerchantController {

    @Autowired
    private MerchantService merchantService;

    @PostMapping("/save")
    public ResponseEntity<HttpStatus> saveMerchant(MerchantDetailsRequest model) {
        //merchantService.saveMerchantDetails(model);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
