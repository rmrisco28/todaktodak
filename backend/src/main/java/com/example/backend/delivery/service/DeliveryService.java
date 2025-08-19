package com.example.backend.delivery.service;

import com.example.backend.delivery.dto.DeliveryAddForm;
import com.example.backend.delivery.dto.DeliveryDto;
import com.example.backend.delivery.dto.DeliveryListDto;
import com.example.backend.delivery.dto.DeliveryUpdateForm;
import com.example.backend.delivery.entity.Delivery;
import com.example.backend.delivery.repository.DeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public boolean validateForAdd(DeliveryAddForm dto) {
        if (dto.getCode() == null || dto.getCode().trim().isBlank()) {
            return false;
        }
        if (dto.getName() == null || dto.getName().trim().isBlank()) {
            return false;
        }
        if (dto.getCallNo() == null || dto.getCallNo().trim().isBlank()) {
            return false;
        }
        return true;
    }

    public void add(DeliveryAddForm dto) {
        Delivery delivery = new Delivery();
        delivery.setCode(dto.getCode());
        delivery.setName(dto.getName());
        delivery.setCallNo(dto.getCallNo());
        deliveryRepository.save(delivery);
    }

    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<DeliveryListDto> deliveryListDtoPage = deliveryRepository.searchDeliveryList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = deliveryListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "deliveryList", deliveryListDtoPage.getContent());
    }

    public void updateDelYn(Integer seq) {
        Delivery delivery = deliveryRepository.findById(seq).get();
        delivery.setDelYn(true);
        delivery.setUpdateDttm(LocalDateTime.now());
        deliveryRepository.save(delivery);
    }


    public DeliveryDto getDeliveryBySeq(Integer seq) {
        return deliveryRepository.findDeliveryBySeq(seq);
    }

    public boolean validateForUpdate(DeliveryUpdateForm dto) {
        if (dto.getCode() == null || dto.getCode().trim().isBlank()) {
            return false;
        }
        if (dto.getName() == null || dto.getName().trim().isBlank()) {
            return false;
        }
        if (dto.getCallNo() == null || dto.getCallNo().trim().isBlank()) {
            return false;
        }
        return true;
    }

    public void update(DeliveryUpdateForm dto) {
        Delivery delivery = deliveryRepository.findById(dto.getSeq()).get();
        delivery.setCode(dto.getCode());
        delivery.setName(dto.getName());
        delivery.setCallNo(dto.getCallNo());
        delivery.setUpdateDttm(LocalDateTime.now());
        deliveryRepository.save(delivery);
    }

    public List<DeliveryDto> deliveryList() {
        return deliveryRepository.findDeliveryAll();
    }
}
