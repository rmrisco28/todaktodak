package com.example.backend.sale.service;

import com.example.backend.sale.dto.*;
import com.example.backend.sale.entity.*;
import com.example.backend.sale.repository.SaleImageContentRepository;
import com.example.backend.sale.repository.SaleImageThumbRepository;
import com.example.backend.sale.repository.SaleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional
public class SaleService {

    private final SaleRepository saleRepository;
    private final SaleImageThumbRepository saleImageThumbRepository;
    private final SaleImageContentRepository saleImageContentRepository;

    public void add(SaleAddForm dto) {
        // TODO [@minki] 권한 체크 (관리자)

        // 조합번호 생성 (코드 + 현재일자 + 시퀀스)
        String code = "SA";

        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
        String date = formatter.format(now);

        Integer maxSeq = saleRepository.findMaxSeq();
        int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
        String seqStr = String.format("%07d", latestSeq);

        Sale sale = new Sale();
        sale.setSaleNo(code + date + seqStr);
        sale.setCategory(dto.getCategory());
        sale.setTitle(dto.getTitle());
        sale.setQuantity(dto.getQuantity());
        sale.setPrice(dto.getPrice());
        sale.setDeliveryFee(dto.getDeliveryFee());
        sale.setContent(dto.getContent());

        saleRepository.save(sale);

        saveImages(sale, dto.getThumbnails(), "thumb");
        saveImages(sale, dto.getContentImages(), "content");
    }

    private void saveImages(Sale sale, List<MultipartFile> images, String target) {
        if (images != null && images.size() > 0) {
            String base_path = "D:/01.private_work/Choongang/workspaces/Temp/prj4/";
            for (MultipartFile image : images) {
                if (image != null && image.getSize() > 0) {
                    if (target.equals("thumb")) {
                        SaleImageThumb entity = new SaleImageThumb();
                        SaleImageThumbId id = new SaleImageThumbId();
                        id.setSaleNo(sale.getSaleNo());
                        id.setName(image.getOriginalFilename());
                        entity.setSale(sale);
                        entity.setId(id);

                        saleImageThumbRepository.save(entity);

                        base_path += "saleImageThumb/";
                    } else if (target.equals("content")) {
                        SaleImageContent entity = new SaleImageContent();
                        SaleImageContentId id = new SaleImageContentId();
                        id.setSaleNo(sale.getSaleNo());
                        id.setName(image.getOriginalFilename());
                        entity.setSale(sale);
                        entity.setId(id);

                        saleImageContentRepository.save(entity);

                        base_path += "saleImageContent/";
                    }

                    // TODO [@minki] AWS S3 업로드
                    // AWS s3 파일 업로드
                    //                    String objectKey = "prj4/board/" + product.getSeq() + "/" + image.getOriginalFilename();
                    //                    uploadFile(image, objectKey);

                    // 실제 파일 server(local) disk 저장
                    // 1) ../Temp/prj3/boardFile 에서 '게시물 번호'이름의 폴더 생성
                    File folder = new File(base_path + sale.getSeq());
                    if (!folder.exists()) {
                        folder.mkdirs();
                    }

                    // 2) 폴더에 파일 저장
                    try {
                        BufferedInputStream bi = new BufferedInputStream(image.getInputStream());
                        BufferedOutputStream bo = new BufferedOutputStream(new FileOutputStream(new File(folder, image.getOriginalFilename())));
                        try (bi; bo) {
                            byte[] b = new byte[1024];
                            int len;
                            while ((len = bi.read(b)) != -1) {
                                bo.write(b, 0, len);
                            }
                            bo.flush();
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                        throw new RuntimeException(e);
                    }
                }
            }
        }
    }

    public boolean validateForAdd(SaleAddForm dto) {

        if (dto.getCategory() == null || dto.getCategory().trim().isBlank()) {
            return false;
        }
        if (dto.getTitle() == null || dto.getTitle().trim().isBlank()) {
            return false;
        }
        if (dto.getQuantity() == null || dto.getQuantity() < 0) {
            return false;
        }
        if (dto.getPrice() == null || dto.getPrice() < 0) {
            return false;
        }
        if (dto.getDeliveryFee() == null || dto.getDeliveryFee() < 0) {
            return false;
        }
        if (dto.getContent() == null || dto.getContent().trim().isBlank()) {
            return false;
        }

        return true;
    }

    public Map<String, Object> list(String keyword, Integer pageNumber) {
        Page<SaleListDto> saleListDtoPage = saleRepository.searchSaleList(keyword, PageRequest.of(pageNumber - 1, 10));
        int totalPages = saleListDtoPage.getTotalPages();
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);
        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        saleListDtoPage.getContent()
                .stream()
                .forEach(e -> e.setThumbnailPath("http://localhost:8081/saleImageThumb/" + e.getSeq() + "/" + e.getThumbnail()));

        return Map.of("pageInfo", pageInfo, "saleList", saleListDtoPage.getContent());
    }

    public SaleDto getSaleBySeq(Integer seq) {
        SaleDto dto = saleRepository.findSaleBySeq(seq);
        Sale sale = new Sale();
        sale.setSaleNo(dto.getSaleNo());

        List<SaleImageThumb> thumbList = saleImageThumbRepository.findBySale(sale);
        List<SaleImageThumbDto> thumbs = new ArrayList<>();
        for (SaleImageThumb thumb : thumbList) {
            SaleImageThumbDto thumbDto = new SaleImageThumbDto();
            thumbDto.setName(thumb.getId().getName());
            thumbDto.setPath("http://localhost:8081/saleImageThumb/" + seq + "/" + thumb.getId().getName());
            // TODO call aws s3
//            imageDto.setPath(imagePrefix + "prj4/dto/" + seq + "/" + image.getProductNo().getName());
            thumbs.add(thumbDto);
        }
        dto.setThumbnails(thumbs);

        List<SaleImageContent> contentImgList = saleImageContentRepository.findBySale(sale);
        List<SaleImageContentDto> contentImgs = new ArrayList<>();
        for (SaleImageContent contentImg : contentImgList) {
            SaleImageContentDto contentDto = new SaleImageContentDto();
            contentDto.setName(contentImg.getId().getName());
            contentDto.setPath("http://localhost:8081/saleImageContent/" + seq + "/" + contentImg.getId().getName());
            // TODO call aws s3
//            imageDto.setPath(imagePrefix + "prj4/dto/" + seq + "/" + image.getProductNo().getName());
            contentImgs.add(contentDto);
        }
        dto.setContentImages(contentImgs);

        return dto;
    }

    public void updateDelYn(Integer seq) {
        Sale dbData = saleRepository.findById(seq).get();
        dbData.setDelYn(true);
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        saleRepository.save(dbData);
    }

    public boolean validateForUpdate(SaleUpdateForm dto) {

        if (dto.getCategory() == null || dto.getCategory().trim().isBlank()) {
            return false;
        }
        if (dto.getTitle() == null || dto.getTitle().trim().isBlank()) {
            return false;
        }
        if (dto.getQuantity() == null || dto.getQuantity() < 0) {
            return false;
        }
        if (dto.getPrice() == null || dto.getPrice() < 0) {
            return false;
        }
        if (dto.getDeliveryFee() == null || dto.getDeliveryFee() < 0) {
            return false;
        }
        if (dto.getContent() == null || dto.getContent().trim().isBlank()) {
            return false;
        }

        return true;
    }

    public void update(SaleUpdateForm dto) {
        Sale dbData = saleRepository.findById(dto.getSeq()).get();

        dbData.setCategory(dto.getCategory());
        dbData.setTitle(dto.getTitle());
        dbData.setQuantity(dto.getQuantity());
        dbData.setPrice(dto.getPrice());
        dbData.setDeliveryFee(dto.getDeliveryFee());
        dbData.setContent(dto.getContent());

        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        deleteImages(dbData, dto.getDeleteThumbnails(), "thumb");
        saveImages(dbData, dto.getThumbnails(), "thumb");
        deleteImages(dbData, dto.getDeleteImages(), "content");
        saveImages(dbData, dto.getContentImages(), "content");

        saleRepository.save(dbData);
    }

    private void deleteImages(Sale dbData, String[] deleteImages, String target) {
        if (deleteImages != null && deleteImages.length > 0) {
            String base_path = "D:/01.private_work/Choongang/workspaces/Temp/prj4/";
            for (String image : deleteImages) {
                if (target.equals("thumb")) {
                    // table 의 record 지우고
                    SaleImageThumbId id = new SaleImageThumbId();
                    id.setSaleNo(dbData.getSaleNo());
                    id.setName(image);
                    saleImageThumbRepository.deleteById(id);

                    base_path += "saleImageThumb/";
                } else if (target.equals("content")) {
                    // table 의 record 지우고
                    SaleImageContentId id = new SaleImageContentId();
                    id.setSaleNo(dbData.getSaleNo());
                    id.setName(image);
                    saleImageContentRepository.deleteById(id);

                    base_path += "saleImageContent/";
                }

                File targetFile
                        = new File(base_path + dbData.getSeq() + "/" + image);
                if (targetFile.exists()) {
                    targetFile.delete();
                }

                // s3의 파일 지우기
//                String objectKey = "prj4/product/" + dbData.getId() + "/" + file;
//                deleteFile(objectKey);
            }
        }
    }
}
