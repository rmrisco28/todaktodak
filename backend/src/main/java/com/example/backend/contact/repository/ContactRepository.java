package com.example.backend.contact.repository;

import com.example.backend.contact.dto.ContactAddForm;
import com.example.backend.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Map;

public interface ContactRepository extends JpaRepository<Contact, Integer> {
    List<Contact> findAllByOrderBySeqDesc();

}