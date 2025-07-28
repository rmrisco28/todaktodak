package com.example.backend.member.repository;

import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    List<MemberListInfo> findAllBy();

    Optional<Member> findByMemberId(String memberId);

    @Query("SELECT MAX(m.seq) FROM Member m")
    Integer findMaxSeq();
}