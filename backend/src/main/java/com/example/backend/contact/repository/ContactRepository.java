package com.example.backend.contact.repository;

import com.example.backend.contact.dto.ContactAddForm;
import com.example.backend.contact.dto.ContactDto;
import com.example.backend.contact.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    List<Contact> findAllByOrderBySeqDesc();

    List<Contact> findByDelYnFalse(); // 삭제가 false인 게시물만

    Contact findBySeq(Integer seq);


    List<Contact> findByDelYnFalseOrderBySeqDesc();

    Page<Contact> findByDelYnFalseOrderBySeqDesc(Pageable pageable);


    //    리포지토리
    @Query(value = """
            SELECT new com.example.backend.contact.dto.ContactDto(
                        c.seq,
                        c.title,
                        c.name,
                        c.view,
                        c.insertDttm)
            FROM Contact c
            WHERE (c.useYn = true
                   And c.delYn = false)
                   And (:keyword = '' OR c.name LIKE %:keyword% OR c.title LIKE %:keyword%)
            ORDER BY c.seq DESC
            """)
    Page<ContactDto> findAllBy(String keyword, PageRequest pageRequest);


}