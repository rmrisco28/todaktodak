package com.example.backend.banner.repository;

import com.example.backend.banner.dto.BannerDto;
import com.example.backend.banner.dto.BannerListDto;
import com.example.backend.banner.dto.BannerSlideDto;
import com.example.backend.banner.entity.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Integer> {
    @Query("""
                SELECT new com.example.backend.banner.dto.BannerListDto (
                b.seq,
                b.title,
                b.insertDttm,
                b.updateDttm,
                b.useYn
                )
                FROM Banner b
                WHERE b.delYn = false
                  AND b.title LIKE %:keyword%
               ORDER BY b.seq DESC
            """)
    Page<BannerListDto> searchBannerList(@Param("keyword") String keyword, Pageable pageable);

    @Query("""
                SELECT new com.example.backend.banner.dto.BannerDto (
                b.seq,
                b.title,
                b.name,
                b.link,
                b.useYn,
                b.insertDttm,
                b.updateDttm
                )
                FROM Banner b
                WHERE b.seq = :seq
                  AND b.delYn = false
            """)
    BannerDto findBannerBySeq(Integer seq);

    @Query("""
                SELECT new com.example.backend.banner.dto.BannerSlideDto (
                b.seq,
                b.title,
                b.name,
                b.link
                )
                FROM Banner b
                WHERE b.useYn = true
                  AND b.delYn = false
            """)
    List<BannerSlideDto> findBanners();
}