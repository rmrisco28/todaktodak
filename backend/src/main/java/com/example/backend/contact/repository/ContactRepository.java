package com.example.backend.contact.repository;

import com.example.backend.contact.dto.ContactAddForm;
import com.example.backend.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    List<Contact> findAllByOrderBySeqDesc();

    List<Contact> findByDelYnFalse(); // 삭제가 false인 게시물만
    
    Contact findBySeq(Integer seq);


    List<Contact> findByDelYnFalseOrderBySeqDesc();
}