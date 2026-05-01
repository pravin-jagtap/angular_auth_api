package com.example.authapi.repository;

import com.example.authapi.entity.MerchantDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MerchantRepo extends JpaRepository<MerchantDetails, Long> {

}
