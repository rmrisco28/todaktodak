package com.example.backend.member.repository;

import com.example.backend.member.entity.EmailAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailAuthRepository extends JpaRepository<EmailAuth, Long> {

    // 이메일별로 최신 생성된 인증 정보 가져오기
    Optional<EmailAuth> findTopByEmailAndPurposeOrderByCreatedAtDesc(String email, String purpose);
}