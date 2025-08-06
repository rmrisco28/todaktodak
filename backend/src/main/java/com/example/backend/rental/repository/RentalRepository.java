package com.example.backend.rental.repository;

import com.example.backend.rental.entity.Rental;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface RentalRepository extends JpaRepository<Rental, Integer> {
    @Query("SELECT MAX(r.seq) FROM Rental r")
    Integer findMaxSeq();

    Rental findBySeq(Integer seq);
}