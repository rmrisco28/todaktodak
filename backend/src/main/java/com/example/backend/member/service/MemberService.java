package com.example.backend.member.service;

import com.example.backend.member.dto.MemberDetailDto;
import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.dto.MemberSignupForm;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import com.example.backend.product.entity.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;


    public void signup(MemberSignupForm memberSignupForm) {

        if (this.validate(memberSignupForm)) {
            Member member = new Member();
            member.setMemberId(memberSignupForm.getMemberId());
            member.setPassword(memberSignupForm.getPassword());
            member.setName(memberSignupForm.getName());
            member.setPhone(memberSignupForm.getPhone());
            member.setBirthDate(LocalDate.parse(memberSignupForm.getBirthDate()));
            member.setEmail(memberSignupForm.getEmail());
            member.setAddr(memberSignupForm.getAddr());
            member.setAddrDetail(memberSignupForm.getAddrDetail());
            member.setPostCode(memberSignupForm.getPostCode());

            String code = "ME";
            Date now = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
            String date = formatter.format(now);
            Integer maxSeq = memberRepository.findMaxSeq();
            int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
            String seqStr = String.format("%07d", latestSeq);
            member.setMemberNo(code + date + seqStr);

            memberRepository.save(member);
        }
    }

    public boolean validate(MemberSignupForm memberSignupForm) {
        // memberId 중복 여부
        Optional<Member> dbData = memberRepository.findByMemberId(memberSignupForm.getMemberId());
        if (dbData.isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }
        return true;
    }

    public List<MemberListInfo> list() {
        return memberRepository.findAllBy();
    }

    public MemberDetailDto getMember(Integer seq) {
        Member db = memberRepository.findById(seq).get();

        MemberDetailDto dto = new MemberDetailDto();
        dto.setMemberNo(db.getMemberNo());
        dto.setMemberId(db.getMemberId());
        dto.setName(db.getName());
        dto.setEmail(db.getEmail());
        dto.setBirthDate(db.getBirthDate());
        dto.setPhone(db.getPhone());
        dto.setPostCode(db.getPostCode());
        dto.setAddr(db.getAddr());
        dto.setAddrDetail(db.getAddrDetail());
        dto.setInsertDttm(db.getInsertDttm());
        dto.setUpdateDttm(db.getUpdateDttm());
        dto.setState(db.getState());

        return dto;
    }

    public void updateDelYn(Integer seq) {
        Member dbData = memberRepository.findById(seq).get();
        // del_yn = true
        dbData.setDelYn(true);
        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        dbData.setState("DELETE");

        memberRepository.save(dbData);
    }
}
