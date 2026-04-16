package com.example.authapi.repository;

import com.example.authapi.model.UserAccount;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    boolean existsByEmailIgnoreCase(String email);

    boolean existsByUsernameIgnoreCase(String username);

    Optional<UserAccount> findByEmailIgnoreCase(String email);

    Optional<UserAccount> findByUsernameIgnoreCase(String username);

    Optional<UserAccount> findByUsernameIgnoreCaseOrEmailIgnoreCase(String username, String email);
}
