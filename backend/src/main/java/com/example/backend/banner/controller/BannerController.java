package com.example.backend.banner.controller;

import com.example.backend.banner.dto.BannerAddForm;
import com.example.backend.banner.dto.BannerDto;
import com.example.backend.banner.dto.BannerUpdateForm;
import com.example.backend.banner.service.BannerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/banner")
public class BannerController {

    private final BannerService bannerService;


    /**
     * @param dto
     * @return
     * @brief Add Banner (permission: Administrator)
     * @author minki-jeon
     */
    @PostMapping("add")
    public ResponseEntity<?> add(BannerAddForm dto) {
        // validate
        boolean result = bannerService.validateForAdd(dto);

        if (result) {
            bannerService.add(dto);

            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "배너가 등록되었습니다.")));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message",
                    Map.of("type", "error", "text", "입력한 내용이 유효하지 않습니다.")));
        }
    }

    /**
     * @param keyword
     * @param pageNumber
     * @return
     * @brief View banner List (permission: Administrator)
     * @author minki-jeon
     */
    @GetMapping("list")
    public Map<String, Object> getAllBanner(
            @RequestParam(value = "q", defaultValue = "") String keyword,
            @RequestParam(value = "p", defaultValue = "1") Integer pageNumber
    ) {
        return bannerService.list(keyword, pageNumber);
    }

    /**
     * @param seq
     * @return
     * @brief Delete Banner (permission: Administrator)
     * @author minki-jeon
     */
    @PutMapping("{seq}")
    public ResponseEntity<?> deleteBanner(@PathVariable Integer seq) {

        try {
            bannerService.updateDelYn(seq);
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "warning", "text", seq + "번 배너가 삭제되었습니다.")));
        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

    /**
     * @param seq
     * @return
     * @brief View Banner Details (permission: Administrator)
     * @author minki-jeon
     */
    @GetMapping("detail/{seq}")
    public BannerDto getDetailBySeq(@PathVariable Integer seq) {
        return bannerService.getBannerBySeq(seq);
    }


    /**
     * @param seq
     * @param dto
     * @return
     * @brief Edit Banner (permission: Administrator)
     * @author minki-jeon
     */
    @PutMapping("modify/{seq}")
    public ResponseEntity<?> updateBanner(@PathVariable Integer seq, BannerUpdateForm dto) {

        boolean result = bannerService.validateForUpdate(dto);

        try {
            if (result) {
                bannerService.update(dto);

                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", seq + " 번 배너가 수정되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "입력한 내용이 유효하지 않습니다.")));
            }

        } catch (Exception e) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "error", "text", e.getMessage())));
        }

    }

}
