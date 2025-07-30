package com.example.backend.contact.service;

import com.example.backend.contact.dto.*;
import com.example.backend.contact.entity.Contact;
import com.example.backend.contact.repository.ContactRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Transactional
public class ContactService {

    private final ContactRepository contactRepository;


    // 게시물 생성
    public void add(@RequestBody ContactAddForm caf) {
        String code = "CO";

        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
        String date = formatter.format(now);

        Integer maxSeq = contactRepository.findMaxSeq();
        int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
        String seqStr = String.format("%07d", latestSeq);


        Contact contact = new Contact();
        contact.setContactNo(code + date + seqStr);

        contact.setTitle(caf.getTitle());
        contact.setContent(caf.getContent());
        contact.setName(caf.getName());

        contactRepository.save(contact);
    }

//    // 삭제 안된 게시물 조회
//    public List<Contact> list() {
//        return contactRepository.findByDelYnFalseOrderBySeqDesc();
//    }


    // 관리자/이용자 통합 게시판 목록
    public Map<String, Object> list(String keyword, Integer pageNumber, Boolean isAdmin) {
        Page<ContactDto> contactListDtoPage;

        if (isAdmin) {
            contactListDtoPage = contactRepository.findAllByAdmin(keyword, PageRequest.of(pageNumber - 1, 10));
        } else {
            contactListDtoPage = contactRepository.findAllBy(keyword, PageRequest.of(pageNumber - 1, 10));
        }

        int totalPages = contactListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        var pageInfo = Map.of(
                "totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo,
                "contactList", contactListDtoPage.getContent());
    }


    // 게시물 상세화면 불러오기 서비스
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

    // 답글 저장
    public void reply(ReplyDto rd) {
        Contact contact = contactRepository.findBySeq(rd.getSeq());

        contact.setReply(rd.getReply());
        contact.setReplyDttm(rd.getReplyDttm());

        contactRepository.save(contact);
    }

    // 삭제된 게시판 목록 관리자
    public Map<String, Object> deletedList(String keyword, Integer pageNumber) {

        Page<ContactDeletedDto> contactDeletedListDtoPage = contactRepository.findAllByDeleted(keyword, PageRequest.of(pageNumber - 1, 10));

        int totalPages = contactDeletedListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        var pageInfo = Map.of(
                "totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "contactDeletedList", contactDeletedListDtoPage.getContent());
    }

    // 삭제된 게시판 상세화면 관리자
    public ContactAddForm deletedDetail(Integer seq) {
        Contact contact = contactRepository.findById(seq)
                .filter(c -> c.getDelYn())
                .orElseThrow(() -> new RuntimeException("삭제된 게시글이 존재하지 않습니다."));

        ContactAddForm caf = new ContactAddForm();

        caf.setTitle(contact.getTitle());
        caf.setContent(contact.getContent());
        caf.setName(contact.getName());
        caf.setReply(contact.getReply());

        return caf;
    }

    public void restore(Integer seq) {
        Contact contact = contactRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        contact.setDelYn(false); //
    }
}
