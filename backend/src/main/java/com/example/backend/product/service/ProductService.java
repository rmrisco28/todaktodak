package com.example.backend.product.service;

import com.example.backend.product.dto.ProductAddForm;
import com.example.backend.product.entity.Product;
import com.example.backend.product.entity.ProductImage;
import com.example.backend.product.repository.ProductImageRepository;
import com.example.backend.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;


    public void add(ProductAddForm dto) {
        // TODO 권한 체크 (관리자)

        // 조합번호 생성 (코드 + 현재일자 + 시퀀스)
        String code = "PR";

        Date now = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
        String date = formatter.format(now);

        Integer maxSeq = productRepository.findMaxSeq();
        int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
        String seqStr = String.format("%07d", latestSeq);

        Product product = new Product();
        product.setProductNo(code + date + seqStr);
        product.setCategory(dto.getCategory());
        product.setBrand(dto.getBrand());
        product.setName(dto.getName());
        product.setStandard(dto.getStandard());
        product.setStock(dto.getStock());
        product.setPrice(dto.getPrice());
        product.setNote(dto.getNote());
        product.setState(null);

        productRepository.save(product);

        saveImages(product, dto.getImages());

    }

    private void saveImages(Product product, List<MultipartFile> images) {
        System.out.println("ProductService.saveImages");
        if (images != null && images.size() > 0) {
            for (MultipartFile image : images) {
                if (image != null && image.getSize() > 0) {
                    ProductImage entity = new ProductImage();
                    entity.setProductNo(product);
                    entity.setName(image.getOriginalFilename());

                    productImageRepository.save(entity);

                    // TODO AWS S3 업로드
                    // 실제 파일 server(local) disk 저장
                    // 1) ../Temp/prj3/boardFile 에서 '게시물 번호'이름의 폴더 생성
                    File folder = new File("D:/01.private_work/Choongang/workspaces/Temp/prj4/productImage/" + product.getSeq());
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

    public boolean validateForAdd(ProductAddForm dto) {
        System.out.println("ProductService.validateForAdd");
        if (dto.getCategory() == null || dto.getCategory().trim().isBlank()) {
            return false;
        }
        if (dto.getBrand() == null || dto.getBrand().trim().isBlank()) {
            return false;
        }
        if (dto.getName() == null || dto.getName().trim().isBlank()) {
            return false;
        }
        if (dto.getStandard() == null || dto.getStandard().trim().isBlank()) {
            return false;
        }
        if (dto.getStock() == null || dto.getStock() < 0) {
            return false;
        }
        if (dto.getPrice() == null || dto.getPrice() < 0) {
            return false;
        }
        if (dto.getNote() == null || dto.getNote().trim().isBlank()) {
            return false;
        }

        return true;
    }
}
