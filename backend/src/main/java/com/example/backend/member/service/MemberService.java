package com.example.backend.member.service;

import com.example.backend.member.dto.*;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;


    // 회원 가입
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

            // 고객번호 조합
            String code = "ME";
            Date now = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
            String date = formatter.format(now);
            Integer maxSeq = memberRepository.findMaxSeq();
            int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
            String seqStr = String.format("%07d", latestSeq);
            member.setMemberNo(code + date + seqStr);

            // 저장
            memberRepository.save(member);
        }
    }

    // 유효성(중복) 검사
    public boolean validate(MemberSignupForm memberSignupForm) {
        // memberId 중복 여부
        Optional<Member> dbData = memberRepository.findByMemberId(memberSignupForm.getMemberId());
        if (dbData.isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }
        return true;
    }

    // 회원 목록(관리자)
    public Map<String, Object> list(Integer pageNumber) {
        Page<MemberListInfo> memberListInfoPage
                = memberRepository.findAllBy(PageRequest.of(pageNumber - 1, 10));

        int totalPages = memberListInfoPage.getTotalPages(); // 마지막 페이지
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo,
                "memberList", memberListInfoPage.getContent());

    }

    // 회원 상세보기(관리자)
    public MemberDetailForm getMember(Integer seq) {
        Member db = memberRepository.findById(seq).get();

        MemberDetailForm dto = new MemberDetailForm();
        dto.setMemberNo(db.getMemberNo());
        dto.setAuth(db.getAuth());
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
        dto.setUseYn(db.getUseYn());
        dto.setDelYn(db.getDelYn());

        return dto;
    }

    // 회원 삭제 시 delYn 변경(삭제 데이터 보관)
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

    // 회원 정보 수정(관리자)
    public void update(Integer seq, MemberModifyDto dto) {
        Member dbData = memberRepository.findById(seq).get();
        dbData.setMemberNo(dto.getMemberNo());
        dbData.setAuth(dto.getAuth());
        dbData.setMemberId(dto.getMemberId());
        dbData.setName(dto.getName());
        dbData.setEmail(dto.getEmail());
        dbData.setPhone(dto.getPhone());
        dbData.setPostCode(dto.getPostCode());
        dbData.setAddr(dto.getAddr());
        dbData.setAddrDetail(dto.getAddrDetail());
        dbData.setUpdateDttm(LocalDateTime.now());
        dbData.setState(dto.getState());
        dbData.setUseYn(dto.isUseYn());
        dbData.setDelYn(dto.isDelYn());

        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        // 새 비밀번호 입력시에만 적용
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            dbData.setPassword(dto.getPassword());
        }

        if (dto.getBirthDate() != null && !dto.getBirthDate().isBlank()) {
            dbData.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        }
        memberRepository.save(dbData);
    }

    // 회원 등록(관리자)
    public void add(MemberAddForm memberAddForm) {

        if (this.validate2(memberAddForm)) {
            Member member2 = new Member();
            member2.setAuth(memberAddForm.getAuth());
            member2.setMemberId(memberAddForm.getMemberId());
            member2.setPassword(memberAddForm.getPassword());
            member2.setName(memberAddForm.getName());
            member2.setPhone(memberAddForm.getPhone());
            member2.setBirthDate(LocalDate.parse(memberAddForm.getBirthDate()));
            member2.setEmail(memberAddForm.getEmail());
            member2.setAddr(memberAddForm.getAddr());
            member2.setAddrDetail(memberAddForm.getAddrDetail());
            member2.setPostCode(memberAddForm.getPostCode());

            // 고객번호 조합
            String code = "ME";
            Date now = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
            String date = formatter.format(now);
            Integer maxSeq = memberRepository.findMaxSeq();
            int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
            String seqStr = String.format("%07d", latestSeq);
            member2.setMemberNo(code + date + seqStr);

            // 저장
            memberRepository.save(member2);
        }
    }

    // 유효성(중복) 검사
    public boolean validate2(MemberAddForm memberAddForm) {
        // memberId 중복 여부
        Optional<Member> dbData = memberRepository.findByMemberId(memberAddForm.getMemberId());
        if (dbData.isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }
        return true;
    }
}
