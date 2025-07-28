package com.example.backend.contact.repository;

import com.example.backend.contact.dto.ContactDeletedDto;
import com.example.backend.contact.dto.ContactDto;
import com.example.backend.contact.entity.Contact;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

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

    @Query(value = """
            SELECT new com.example.backend.contact.dto.ContactDeletedDto(
                        c.seq,
                        c.title,
                        c.name ,
                        c.view,
                        c.updateDttm)
                        FROM Contact c
                                    WHERE (c.delYn=true) AND (:keyword = '' OR c.name Like %:keyword% OR c.title LIKE %:keyword%)
            ORDER By c.updateDttm DESC 
            """)
    Page<ContactDeletedDto> findAllByDeleted(String keyword, PageRequest of);

//    @Query("SELECT MAX(c.seq)FROM Contact c")
//    Integer findMaxSeq();
}