package com.example.backend.banner.service;

import com.example.backend.banner.dto.*;
import com.example.backend.banner.entity.Banner;
import com.example.backend.banner.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.ObjectCannedACL;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class BannerService {

    private final S3Client s3Client;

    @Value("${image.prefix}")
    private String imagePrefix;
    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    private final BannerRepository bannerRepository;

    public boolean validateForAdd(BannerAddForm dto) {
        if (dto.getTitle() == null || dto.getTitle().trim().isBlank()) {
            return false;
        }
        if (dto.getLink() == null || dto.getLink().trim().isBlank()) {
            return false;
        }
        if (dto.getImage() == null || dto.getImage().isEmpty()) {
            return false;
        }

        return true;
    }

    public void add(BannerAddForm dto) {
        // TODO [@minki] 권한 체크 (관리자)

        Banner banner = new Banner();
        banner.setTitle(dto.getTitle());
        banner.setLink(dto.getLink());

        MultipartFile image = dto.getImage();
        banner.setName(image.getOriginalFilename());

        // AWS s3 파일 업로드
        String objectKey = "prj4/bannerImage/" + image.getOriginalFilename();
        uploadFile(image, objectKey);

        bannerRepository.save(banner);
    }

    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<BannerListDto> bannerListDtoPage = bannerRepository.searchBannerList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = bannerListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "bannerList", bannerListDtoPage.getContent());
    }

    public void updateDelYn(Integer seq) {
        Banner dbData = bannerRepository.findById(seq).get();
        // del_yn = true
        dbData.setDelYn(true);
        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        bannerRepository.save(dbData);
    }

    public boolean validateForUpdate(BannerUpdateForm dto) {
        if (dto.getTitle() == null || dto.getTitle().trim().isBlank()) {
            return false;
        }
        if (dto.getLink() == null || dto.getLink().trim().isBlank()) {
            return false;
        }

        return true;
    }

    public void update(BannerUpdateForm dto) {
        Banner dbData = bannerRepository.findById(dto.getSeq()).get();

        dbData.setTitle(dto.getTitle());
        dbData.setLink(dto.getLink());
        dbData.setUseYn(dto.getUseYn());

        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        // upload image
        if (dto.getImage() != null && dto.getImage().getSize() > 0) {
            // 이미지 파일을 등록했으면, 기존의 이미지 파일 삭제
            String deleteObjectKey = "prj4/bannerImage/" + dbData.getName();
            deleteFile(deleteObjectKey);

            // 이미지 파일 s3 저장(업로드)
            String objectKey = "prj4/bannerImage/" + dto.getImage().getOriginalFilename();
            uploadFile(dto.getImage(), objectKey);
            dbData.setName(dto.getImage().getOriginalFilename());
        }

        bannerRepository.save(dbData);
    }

    public void uploadFile(MultipartFile file, String objectKey) {
        try {
            PutObjectRequest putObjectRequest = PutObjectRequest
                    .builder().bucket(bucketName).key(objectKey).acl(ObjectCannedACL.PUBLIC_READ)
                    .build();
            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("파일 전송이 실패하였습니다.");
        }
    }

    private void deleteFile(String objectKey) {
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest
                .builder().bucket(bucketName).key(objectKey)
                .build();

        s3Client.deleteObject(deleteObjectRequest);
    }

    public BannerDto getBannerBySeq(Integer seq) {
        BannerDto dto = bannerRepository.findBannerBySeq(seq);
        dto.setPath(imagePrefix + "prj4/bannerImage/" + dto.getName());
        return dto;
    }

    public List<BannerSlideDto> slideBannerList() {
        List<BannerSlideDto> list = bannerRepository.findBanners();
        list.forEach(dto -> dto.setPath(imagePrefix + "prj4/bannerImage/" + dto.getName()));
        return list;
    }
}
