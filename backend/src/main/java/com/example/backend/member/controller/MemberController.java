package com.example.backend.member.controller;

import com.example.backend.member.dto.MemberDto;
import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @GetMapping("list")
    // 회원 목록 보기
    public List<MemberListInfo> list() {
        return memberService.list();
    }

    @PostMapping("signup")
    public ResponseEntity<?> add(@RequestBody MemberForm memberForm) {
        try {
            // 서비스로 일 시키기(회원가입용 dto 사용)
            memberService.signup(memberForm);
        } catch (Exception e) {
            // 콘솔에 예외 발생 정보 출력
            e.printStackTrace();
            // 예외 객체 e에서 오류 메시지 꺼냄
            String message = e.getMessage();
            // 예외 발생 시 상태 코드와 오류 메시지 반환
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "error", "text", message)));
        }
        // 회원가입 완료
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success", "text", "회원가입 되었습니다.")));
    }


    @GetMapping(params = "memberId")
    public MemberDto getMemberDetail(@RequestParam String memberId) {
        return memberService.getMemberByMemberId(memberId);
    }

}
