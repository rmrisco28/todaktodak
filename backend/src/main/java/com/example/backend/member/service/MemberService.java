package com.example.backend.member.service;

import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    public ResponseEntity<?> list() {
        return null;
    }

    public void signup(MemberForm memberForm) {
        Member member = new Member();
        member.setMemberId(memberForm.getMemberId());
        member.setPassword(memberForm.getPassword());
        member.setName(memberForm.getName());
        member.setPhone(memberForm.getPhone());
        member.setEmail(memberForm.getEmail());
        member.setAddr(memberForm.getAddress().getFormattedAddress());

    }
}
