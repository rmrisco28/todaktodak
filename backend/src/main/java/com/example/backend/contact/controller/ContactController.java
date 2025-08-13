package com.example.backend.contact.controller;

import com.example.backend.contact.dto.ContactAddForm;
import com.example.backend.contact.dto.ContactModifyForm;
import com.example.backend.contact.dto.ReplyDto;
import com.example.backend.contact.entity.Contact;
import com.example.backend.contact.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    // 답변 기능
    @PutMapping("reply/{seq}")
    public ResponseEntity<?> reply(@PathVariable Integer seq,
                                   @RequestBody ReplyDto rd,
                                   @RequestParam(value = "isAdmin", defaultValue = "false") Boolean isAdmin) {
        rd.setSeq(seq);
        contactService.reply(rd, isAdmin);
        return ResponseEntity.ok(Map.of("message", "저장되었습니다."));
    }

    // 게시물 삭제
    @DeleteMapping("/{seq}")
    public ResponseEntity<?> delete(@PathVariable Integer seq) {
        contactService.delete(seq);
        return ResponseEntity.ok(Map.of("message", "삭제되었습니다."));
    }

    // 삭제된 게시물 복구
    @DeleteMapping("restore/{seq}")
    public ResponseEntity<?> restore(@PathVariable Integer seq) {
        contactService.restore(seq);
        return ResponseEntity.ok(Map.of("message", "복구되었습니다."));
    }

    // 게시물 조회수
    @GetMapping("/{seq}")
    public ResponseEntity<?> viewCount(@PathVariable Integer seq) {
        Contact contact = contactService.viewCount(seq);
        return ResponseEntity.ok(contact);
    }

    // 게시글 수정
    @PutMapping("modify/{seq}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> modify(@PathVariable Integer seq, @RequestBody ContactModifyForm cmf, Authentication authentication) {
        cmf.setSeq(seq);
        contactService.modify(cmf, authentication);
        return ResponseEntity.ok(Map.of("message", "수정되었습니다."));
    }

    // 게시물 상세 화면
    @GetMapping("detail/{seq}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> detail(@PathVariable Integer seq,
                                    Authentication authentication) {
        try {
            ContactAddForm detail = contactService.detail(seq, authentication);
            return ResponseEntity.ok(detail);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }

    // 게시물 추가 // 작성자 아이디 추가
    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> add(
            @RequestBody ContactAddForm caf,
            Authentication authentication) {
        contactService.add(caf, authentication);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("message", "문의사항이 저장되었습니다.");
        return ResponseEntity.ok(result);
    }

    @GetMapping("list")
    @PreAuthorize("isAuthenticated()")  // 로그인한 사용자만 접근 가능
    public Map<String, Object> list(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber,
            Authentication authentication) {

        // 로그인한 사용자 권한 확인
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("SCOPE_ROLE_ADMIN"));

        return contactService.list(keyword, pageNumber, isAdmin);
    }

    // 삭제된 게시판 목록 불러오기
    @GetMapping("deleted/list")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public Map<String, Object> deletedList(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber,
            Authentication authentication
    ) {

        return contactService.deletedList(keyword, pageNumber, authentication);
    }

    // 삭제된 게시판 상세 페이지
    @GetMapping("deleted/detail/{seq}")
    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    public ResponseEntity<?> deletedDetail(@PathVariable Integer seq,
                                           Authentication authentication) {
        ContactAddForm caf = contactService.deletedDetail(seq, authentication);

        return ResponseEntity.ok(caf);
    }

}
