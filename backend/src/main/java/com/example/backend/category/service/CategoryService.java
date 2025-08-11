package com.example.backend.category.service;

import com.example.backend.category.dto.CategoryAddForm;
import com.example.backend.category.dto.CategoryDto;
import com.example.backend.category.dto.CategoryListDto;
import com.example.backend.category.dto.CategoryUpdateForm;
import com.example.backend.category.entity.Category;
import com.example.backend.category.repository.CategoryRepository;
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
public class CategoryService {

    private final S3Client s3Client;

    @Value("${image.prefix}")
    private String imagePrefix;
    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    private final CategoryRepository categoryRepository;

    public boolean validateForAdd(CategoryAddForm dto) {

        if (dto.getName() == null || dto.getName().trim().isBlank()) {
            return false;
        }
        return true;
    }

    public void add(CategoryAddForm dto) {
        // TODO [@minki] 권한 체크 (관리자)

        Category category = new Category();
        category.setName(dto.getName());

        MultipartFile image = dto.getImage();
        category.setImageName(image.getOriginalFilename());

        // AWS s3 파일 업로드
        String objectKey = "prj4/categoryImage/" + image.getOriginalFilename();
        uploadFile(image, objectKey);

        categoryRepository.save(category);

    }

    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<CategoryListDto> categoryListDtoPage = categoryRepository.searchCategoryList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = categoryListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo, "categoryList", categoryListDtoPage.getContent());
    }

    public void updateDelYn(Integer seq) {
        Category dbData = categoryRepository.findById(seq).get();
        // del_yn = true
        dbData.setDelYn(true);
        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        categoryRepository.save(dbData);
    }

    public CategoryDto getCategoryBySeq(Integer seq) {
        CategoryDto dto = categoryRepository.findCategoryBySeq(seq);
        dto.setPath(imagePrefix + "prj4/categoryImage/" + dto.getImageName());
        return dto;
    }

    public boolean validateForUpdate(CategoryUpdateForm dto) {

        if (dto.getName() == null || dto.getName().trim().isBlank()) {
            return false;
        }
        return true;
    }

    public void update(CategoryUpdateForm dto) {
        Category dbData = categoryRepository.findById(dto.getSeq()).get();

        dbData.setName(dto.getName());

        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        // upload image
        if (dto.getImage() != null && dto.getImage().getSize() > 0) {
            // 이미지 파일을 등록했으면, 기존의 이미지 파일 삭제
            if (dbData.getImageName() != null && !dbData.getImageName().trim().isBlank()) {
                String deleteObjectKey = "prj4/categoryImage/" + dbData.getImageName();
                deleteFile(deleteObjectKey);
            }

            // 이미지 파일 s3 저장(업로드)
            String objectKey = "prj4/categoryImage/" + dto.getImage().getOriginalFilename();
            uploadFile(dto.getImage(), objectKey);
            dbData.setImageName(dto.getImage().getOriginalFilename());
        }

        categoryRepository.save(dbData);
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

    public List<CategoryDto> categoryList() {
        List<CategoryDto> list = categoryRepository.findCategoryAll();
        list.forEach(dto -> dto.setPath(imagePrefix + "prj4/categoryImage/" + dto.getImageName()));
        return list;
    }
}
