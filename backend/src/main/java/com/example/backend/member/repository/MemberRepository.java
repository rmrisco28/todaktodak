package com.example.backend.member.repository;

import com.example.backend.member.dto.MemberListDto;
import com.example.backend.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    @Query(value = """
            SELECT new com.example.backend.member.dto.MemberListDto(
            m.seq,
            m.memberId,
            m.name,
            m.insertDttm,
            m.useYn,
            m.delYn
            )
            FROM Member m
            WHERE (:keyword = '' OR m.memberId LIKE %:keyword% OR m.name LIKE %:keyword%)
            """)
    Page<MemberListDto> findAllBy(PageRequest pageRequest, String keyword);

    Optional<Member> findByMemberId(String memberId);

    @Query("SELECT MAX(m.seq) FROM Member m")
    Integer findMaxSeq();

    boolean existsByMemberId(String memberId);
}