package com.example.authapi.service;

import com.example.authapi.dto.merchant.MerchantDetailsRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MerchantService {
    private final Logger logger = LoggerFactory.getLogger(MerchantService.class);


    public void saveMerchantDetails(MerchantDetailsRequest model) throws Exception {
        try {

        } catch (Exception e) {
            logger.error("Exception occured while saving merchant details: ", e);
        }
    }
}
