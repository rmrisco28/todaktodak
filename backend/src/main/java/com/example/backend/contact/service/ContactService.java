package com.example.backend.contact.service;

import com.example.backend.contact.dto.ContactAddForm;
import com.example.backend.contact.dto.ContactModifyForm;
import com.example.backend.contact.dto.ReplyDto;
import com.example.backend.contact.entity.Contact;
import com.example.backend.contact.repository.ContactRepository;
//import com.example.backend.member.entity.Member;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
@RequiredArgsConstructor
@Transactional
public class ContactService {

    private final ContactRepository contactRepository;


    // 게시물 생성
    public void add(@RequestBody ContactAddForm caf) {
        Contact contact = new Contact();

        contact.setTitle(caf.getTitle());
        contact.setContent(caf.getContent());
        contact.setName(caf.getName());

        contactRepository.save(contact);
    }

    // 삭제 안된 게시물 조회
    public List<Contact> list() {
        return contactRepository.findByDelYnFalseOrderBySeqDesc();
    }

    // 게시물 상세화면 불러오기
    public ContactAddForm detail(Integer seq) {
        Contact contact = contactRepository.findById(seq)
                .filter(c -> !c.getDelYn())
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));

        ContactAddForm caf = new ContactAddForm();
        caf.setTitle(contact.getTitle());
        caf.setContent(contact.getContent());
        caf.setName(contact.getName());
        caf.setReply(contact.getReply());

        return caf;
    }

    // 게시물 수정
    public void modify(ContactModifyForm cmf) {
        Contact contact = contactRepository.findById(cmf.getSeq())
                .orElseThrow(() -> new EntityNotFoundException("해당게시물이 존재하지 않습니다."));

        contact.setTitle(cmf.getTitle());
        contact.setContent(cmf.getContent());
        contact.setName(cmf.getName());

        contactRepository.save(contact);
    }


    // 조회수 증가
    public Contact viewCount(Integer seq) {
        Contact contact = contactRepository.findById(seq).orElseThrow(() -> new RuntimeException("해당글이 존재하지 않습니다."));

        contact.setView(contact.getView() + 1);
        return contact;
    }

    // 게시물 삭제
    public void delete(Integer seq) {
        Contact contact = contactRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        contact.setDelYn(true); //
    }

    public void reply(ReplyDto rd) {
        Contact contact = contactRepository.findBySeq(rd.getSeq());

        contact.setReply(rd.getReply());
        contact.setReplyDttm(rd.getReplyDttm());

        contactRepository.save(contact);
    }
}
