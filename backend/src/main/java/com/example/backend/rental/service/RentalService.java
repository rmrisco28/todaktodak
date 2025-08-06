package com.example.backend.rental.service;

import com.example.backend.rental.dto.RentalDto;
import com.example.backend.rental.dto.RentalListDto;
import com.example.backend.rental.entity.Rental;
import com.example.backend.rental.repository.RentalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Transactional
public class RentalService {

    private final RentalRepository rentalRepository;

    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<RentalListDto> rentalListDtoPage = rentalRepository.searchRentalList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = rentalListDtoPage.getTotalPages();

        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        //        rentalRepository.findAll();
        return Map.of("pageInfo", pageInfo, "rentalList", rentalListDtoPage.getContent());
    }

    public RentalDto detail(Integer seq) {
        return rentalRepository.findRentalBySeq(seq);
    }
}
