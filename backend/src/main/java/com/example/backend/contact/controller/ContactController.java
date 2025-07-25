package com.example.backend.contact.controller;

import com.example.backend.contact.dto.ContactAddForm;
import com.example.backend.contact.dto.ContactModifyForm;
import com.example.backend.contact.dto.ReplyDto;
import com.example.backend.contact.entity.Contact;
import com.example.backend.contact.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PutMapping("reply/{seq}")
    public ResponseEntity<?> reply(@PathVariable Integer seq, @RequestBody ReplyDto rd) {
        rd.setSeq(seq);
        contactService.reply(rd);
        return ResponseEntity.ok(Map.of("message", "저장되었습니다."));
    }

    @DeleteMapping("/{seq}")
    public ResponseEntity<?> delete(@PathVariable Integer seq) {
        contactService.delete(seq);
        return ResponseEntity.ok(Map.of("message", "삭제되었습니다."));
    }

    // 게시물 조회수
    @GetMapping("/{seq}")
    public ResponseEntity<?> viewCount(@PathVariable Integer seq) {
        Contact contact = contactService.viewCount(seq);
        return ResponseEntity.ok(contact);
    }

    // 게시글 수정
    @PutMapping("modify/{seq}")
    public ResponseEntity<?> modify(@PathVariable Integer seq, @RequestBody ContactModifyForm cmf) {
        cmf.setSeq(seq);
        contactService.modify(cmf);
        return ResponseEntity.ok(Map.of("message", "수정되었습니다."));
    }

    // 게시물 상세 화면
    @GetMapping("detail/{seq}")
    public ResponseEntity<?> detail(@PathVariable Integer seq) {
        ContactAddForm detail = contactService.detail(seq);
        return ResponseEntity.ok(detail);
    }

    // 게시물 추가
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody ContactAddForm caf) {
        contactService.add(caf);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("message", "문의사항이 저장되었습니다.");
        return ResponseEntity.ok(result);
    }

    // 게시물 목록 불러오기
    @GetMapping("list")
    public ResponseEntity<?> list() {
        List<Contact> list = contactService.list();
        return ResponseEntity.ok(list);
    }

}
