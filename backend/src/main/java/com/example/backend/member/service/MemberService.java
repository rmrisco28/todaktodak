package com.example.backend.member.service;

import com.example.backend.member.dto.MemberDto;
import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.entity.Member2;
import com.example.backend.member.repository.Member2Repository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final Member2Repository member2Repository;

    public List<MemberListInfo> list() {
        return member2Repository.findAllBy();
    }

    public void signup(MemberForm memberForm) {
        Member2 member2 = new Member2();
        member2.setMemberId(memberForm.getMemberId());
        member2.setPassword(memberForm.getPassword());
        member2.setName(memberForm.getName());
        member2.setEmail(memberForm.getEmail());
        member2.setPhone(memberForm.getPhone());
        member2.setBirthDt(LocalDate.parse(memberForm.getBirthDate()));
        member2.setAddr(memberForm.getAddr());
        member2.setAddrDetail(memberForm.getAddrDetail());
        member2.setPostCode(memberForm.getPostCode());


        member2Repository.save(member2);

    }

    public MemberDto getMemberByMemberId(String memberId) {
        Member2 member2 = member2Repository.findByMemberId(memberId).get();

        MemberDto memberDto = new MemberDto();
        memberDto.setMemberId(member2.getMemberId());
        memberDto.setName(member2.getName());
        memberDto.setEmail(member2.getEmail());
        memberDto.setBirthDt(member2.getBirthDt());
        memberDto.setPhone(member2.getPhone());
        memberDto.setPostCode(member2.getPostCode());
        memberDto.setAddr(member2.getAddr());
        memberDto.setAddrDetail(member2.getAddrDetail());
        memberDto.setInsertDttm(member2.getInsertDttm());

        return memberDto;
    }
}
