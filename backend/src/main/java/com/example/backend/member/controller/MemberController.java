package com.example.backend.member.controller;

import com.example.backend.member.dto.*;
import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

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

    // 이메일 인증 요청(회원가입)
    @PostMapping("/email/request")
    public ResponseEntity<?> requestEmailAuth(@RequestBody Map<String, String> request) {
        String memberId = request.get("memberId");
        String email = request.get("email");
        String purpose = "SIGNUP";
        try {
            memberService.sendEmailAuthCode(memberId, email, purpose);
            return ResponseEntity.ok(Map.of("message", "인증번호를 이메일로 발송했습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", "이메일 발송 실패"));
        }
    }

    // 이메일 인증번호 확인(회원가입)
    @PostMapping("/email/verify")
    public ResponseEntity<?> verifyEmailAuth(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");
        boolean verified = memberService.verifyEmailAuthCode(email, code);

        if (verified) {
            return ResponseEntity.ok(Map.of("message", "이메일 인증 완료"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "인증번호가 틀렸거나 만료되었습니다."));
        }
    }

    // 아이디 중복 확인(회원가입)
    @GetMapping("/check-id")
    public ResponseEntity<?> checkMemberId(@RequestParam String memberId) {
        boolean exists = memberService.existsByMemberId(memberId);
        return ResponseEntity.ok().body(Map.of("exists", exists));
    }

    // 비밀번호 찾기용 이메일 인증 요청
    @PostMapping("/findPassword/authRequest")
    public ResponseEntity<?> requestFindPasswordEmailAuth(@RequestBody Map<String, String> request) {
        String memberId = request.get("memberId");
        String email = request.get("email");

        try {
            memberService.sendFindPasswordEmailAuthCode(memberId, email);
            return ResponseEntity.ok(Map.of("message", "인증번호를 이메일로 발송했습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("message", "이메일 발송 실패 또는 회원 정보 불일치"));
        }
    }

    // 비밀번호 찾기용 이메일 인증번호 검증
    @PostMapping("/findPassword/verifyAuth")
    public ResponseEntity<?> verifyFindPasswordEmailAuth(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        boolean verified = memberService.verifyFindPasswordEmailAuthCode(email, code);

        if (verified) {
            return ResponseEntity.ok(Map.of("message", "이메일 인증 완료"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "인증번호가 틀렸거나 만료되었습니다."));
        }
    }

    // 비밀번호 재설정
    @PutMapping("/resetPassword")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordDto dto) {
        try {
            memberService.resetPassword(dto);
            return ResponseEntity.ok(Map.of("message", "비밀번호가 변경되었습니다."));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "서버 오류가 발생했습니다."));
        }
    }

    // 회원 목록 보기(관리자)
    @GetMapping("list")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer pageNumber,
                                    @RequestParam(value = "q", defaultValue = "") String keyword
    ) {

        return memberService.list(pageNumber, keyword);
    }

    // 회원 정보 상세 보기(관리자)
    @GetMapping(params = "seq")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> getMember(@RequestParam Integer seq) {
        return ResponseEntity.ok().body(memberService.getMember(seq));
    }

    // 회원 삭제(관리자)
    @PutMapping("{seq}/delete")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> MemberDelete(@PathVariable Integer seq) {
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
                        "text", seq + "번 회원이 삭제되었습니다.")));
    }

    // 회원 정보 수정(관리자)
    @PutMapping("{seq}/modify")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
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
                        "text", seq + "번 회원의 정보가 수정되었습니다.")));
    }

    // 회원 등록(관리자)
    @PostMapping("add")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> add(@RequestBody MemberAddForm memberAddForm) {
        try {
            // 서비스로 일 시키기(회원등록 dto 사용)
            memberService.add(memberAddForm);
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
                        Map.of("type", "success", "text", "회원등록이 완료되었습니다.")));
    }

    // 회원 상세 보기(회원)
    @GetMapping("myinfo")
    @PreAuthorize("isAuthenticated() or hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> getMyInfo(Authentication authentication) {
        String memberId = authentication.getName();

        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("SCOPE_ROLE_ADMIN"));

        if (memberId != null && (memberId.equals(memberId) || isAdmin)) {
            return ResponseEntity.ok().body(memberService.getMyInfo(memberId));
        }
        return ResponseEntity.badRequest().build();
    }

    // 회원 탈퇴(회원)
    @PutMapping("withdraw")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> delete(Authentication authentication) {
        String memberId = authentication.getName();
        try {
            memberService.delete(memberId);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error",
                            "text", message)));
        }
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", "회원탈퇴가 완료되었습니다.")));
    }

    // 회원 정보 수정(회원)
    @PutMapping("/myinfo/modify")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> MyInfoModify(@RequestBody MyInfoModifyDto dto, Authentication authentication) {
        String memberId = authentication.getName();

        // 2차 본인 확인: 요청 데이터의 이메일 또는 memberId와 인증된 사용자 ID 비교
        if (!memberId.equals(dto.getEmail()) && !memberId.equals(dto.getMemberId())) {
            return ResponseEntity.status(403).build();
        }

        try {
            memberService.MyInfoModify(memberId, dto);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error",
                            "text", message)));
        }
        return ResponseEntity.ok().body(Map.of("message",
                Map.of("type", "success",
                        "text", "회원 정보가 변경되었습니다.")));
    }

    // 비밀번호 변경(회원)
    @PutMapping("myinfo/modify/changePassword")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordForm dto) {
        String memberId = dto.getMemberId();

        // 2차 본인 확인: 요청 데이터의 이메일 또는 memberId와 인증된 사용자 ID 비교
        if (!memberId.equals(dto.getMemberId())) {
            return ResponseEntity.status(403).build();
        }

        try {
            memberService.changePassword(dto);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error",
                            "text", "비밀번호가 변경되지 않았습니다.")));
        }

        return ResponseEntity.ok().body(Map.of("type", "success"));
    }

    // 로그인
    @PostMapping("login")
    public ResponseEntity<?> login(@RequestBody MemberLoginForm memberLoginForm) {
        try {
            String token = memberService.getToken(memberLoginForm);
            return ResponseEntity.ok().body(Map.of("token", token, "message",
                    Map.of("type", "success", "text", "로그인을 성공하였습니다.")));
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.status(401).build();
        }
    }

    // AuthenticationContextProvider용 요청
    @GetMapping(params = "memberId")
    public ResponseEntity<?> getTokenInfo(@RequestParam String memberId) {
        return ResponseEntity.ok().body(memberService.getTokenInfo(memberId));
    }
}
