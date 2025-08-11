package com.example.backend.rental.repository;

import com.example.backend.rental.entity.Rental;
import com.example.backend.rental.entity.ReturnOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;


public interface ReturnOrderRepository extends JpaRepository<ReturnOrder, Integer> {
    @Query("SELECT MAX(r.seq) FROM ReturnOrder r")
    Integer findMaxSeq();

    Optional<ReturnOrder> findByRentalNo(Rental rentalNo);

}