package com.example.backend.member.repository;

import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Page<MemberListInfo> findAllBy(PageRequest pageRequest);

    Optional<Member> findByMemberId(String memberId);

    @Query("SELECT MAX(m.seq) FROM Member m")
    Integer findMaxSeq();
}