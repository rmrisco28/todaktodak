package com.example.backend.member.controller;

import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.dto.MemberModifyDto;
import com.example.backend.member.dto.MemberSignupForm;
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


    // 회원 가입
    @PostMapping("signup")
    public ResponseEntity<?> signup(@RequestBody MemberSignupForm memberSignupForm) {
        try {
            // 서비스로 일 시키기(회원가입용 dto 사용)
            memberService.signup(memberSignupForm);
        } catch (Exception e) {
            // 콘솔에 예외 발생 정보 출력
            e.printStackTrace();
            // 예외 객체 e에서 오류 메시지 꺼냄
            String message = e.getMessage();
            // 예외 발생 시 상태 코드와 오류 메시지 출력
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "error", "text", message)));
        }
        // 회원가입 완료 시 메시지 출력
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success", "text", "회원가입 되었습니다.")));
    }

    // 회원 목록 보기
    @GetMapping("list")
    public List<MemberListInfo> list() {
        return memberService.list();
    }

    // 회원 정보 상세 보기
    @GetMapping(params = "seq")
    public ResponseEntity<?> getMember(@RequestParam Integer seq) {
        return ResponseEntity.ok().body(memberService.getMember(seq));
    }

    // 회원 삭제(관리자)
    @PutMapping("{seq}/delete")
    public ResponseEntity<?> delete(@PathVariable Integer seq) {
        try {
            memberService.updateDelYn(seq);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error",
                            "text", message)));
        }
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", seq + "회원 정보가 삭제되었습니다.")));
    }

    // 회원 정보 수정(관리자)
    @PutMapping("{seq}/modify")
    public ResponseEntity<?> update(@PathVariable Integer seq,
                                    @RequestBody MemberModifyDto dto) {
        try {
            memberService.update(seq, dto);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error",
                            "text", message)));
        }
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", "회원 정보가 수정되었습니다.")));
    }


}
