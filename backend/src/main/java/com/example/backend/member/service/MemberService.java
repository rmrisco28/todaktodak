package com.example.backend.member.service;

import com.example.backend.member.dto.*;
import com.example.backend.member.entity.Auth;
import com.example.backend.member.entity.EmailAuth;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.AuthRepository;
import com.example.backend.member.repository.EmailAuthRepository;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {

    private final PasswordEncoder passwordEncoder;
    private final AuthRepository authRepository;
    private final MemberRepository memberRepository;
    private final JwtEncoder jwtEncoder;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JavaMailSender mailSender;
    private final EmailAuthRepository emailAuthRepository;


    // 회원 가입
    public void signup(MemberSignupForm memberSignupForm) {

        // 이메일 인증 완료 여부 체크
        EmailAuth latestAuth = emailAuthRepository
                .findTopByEmailAndPurposeOrderByCreatedAtDesc(memberSignupForm.getEmail(), "SIGNUP")
                .orElseThrow(() -> new RuntimeException("이메일 인증이 완료되지 않았습니다."));
        if (!latestAuth.isVerified()) {
            throw new RuntimeException("이메일 인증이 완료되지 않았습니다.");
        }

        if (this.validate(memberSignupForm)) {
            Member member = new Member();
            member.setMemberId(memberSignupForm.getMemberId());
            member.setPassword(passwordEncoder.encode(memberSignupForm.getPassword()));
            member.setName(memberSignupForm.getName());
            member.setPhone(memberSignupForm.getPhone());
            member.setBirthDate(memberSignupForm.getBirthDate());
            member.setEmail(memberSignupForm.getEmail());
            member.setAddr(memberSignupForm.getAddr());
            member.setAddrDetail(memberSignupForm.getAddrDetail());
            member.setPostCode(memberSignupForm.getPostCode());

            // 고객번호 조합
            String code = "ME";
            Date now = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
            String date = formatter.format(now);
            Integer maxSeq = memberRepository.findMaxSeq();
            int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
            String seqStr = String.format("%07d", latestSeq);
            member.setMemberNo(code + date + seqStr);

            // 저장
            memberRepository.save(member);
        }
    }

    // 인증번호 생성 및 이메일 발송(회원가입)
    public void sendEmailAuthCode(String memberId, String email, String purpose) {
        String code = createAuthCode();

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setMemberId(memberId);
        emailAuth.setEmail(email);
        emailAuth.setCode(code);
        emailAuth.setCreatedAt(LocalDateTime.now());
        emailAuth.setVerified(false);
        emailAuth.setPurpose(purpose);
        emailAuthRepository.save(emailAuth);

        // 이메일 발송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("jihun8138@gmail.com");  // 실제 본인 이메일 설정
        message.setTo(email);
        message.setSubject("[토닥토닥] 회원가입 인증번호");
        message.setText("인증번호는 " + code + " 입니다. 5분 이내로 입력하세요.");
        mailSender.send(message);
    }


    // 인증번호 검증
    public boolean verifyEmailAuthCode(String email, String code) {
        String purpose = "SIGNUP";
        Optional<EmailAuth> optionalAuth = emailAuthRepository
                .findTopByEmailAndPurposeOrderByCreatedAtDesc(email, purpose);

        if (optionalAuth.isEmpty()) {
            return false;
        }

        EmailAuth emailAuth = optionalAuth.get();

        // 5분 유효시간 체크
        LocalDateTime expireTime = emailAuth.getCreatedAt().plusMinutes(5);

        if (!emailAuth.isVerified() && emailAuth.getCode().equals(code) && LocalDateTime.now().isBefore(expireTime)) {
            emailAuth.setVerified(true);
            emailAuthRepository.save(emailAuth);
            return true;
        }
        return false;
    }

    // 비밀번호 찾기 이메일 요청
    public void sendFindPasswordEmailAuthCode(String memberId, String email) {
        String purpose = "FIND_PASSWORD";

        // 회원 존재 및 이메일 일치 여부 체크 (memberId와 email이 DB에서 일치하는지)
        Optional<Member> member = memberRepository.findByMemberId(memberId);
        if (member.isEmpty() || !member.get().getEmail().equals(email)) {
            throw new RuntimeException("회원 정보 불일치");
        }

        // 인증번호 생성 및 저장
        String code = createAuthCode();

        EmailAuth emailAuth = new EmailAuth();
        emailAuth.setMemberId(memberId);
        emailAuth.setEmail(email);
        emailAuth.setCode(code);
        emailAuth.setCreatedAt(LocalDateTime.now());
        emailAuth.setVerified(false);
        emailAuth.setPurpose(purpose);
        emailAuthRepository.save(emailAuth);

        // 이메일 발송
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("jihun8138@gmail.com");  // 실제 본인 이메일 설정
        message.setTo(email);
        message.setSubject("[토닥토닥] 비밀번호찾기 인증번호");
        message.setText("인증번호는 " + code + " 입니다. 5분 이내에 입력하세요.");
        mailSender.send(message);
    }

    // 비밀번호 찾기 인증번호 검증
    public boolean verifyFindPasswordEmailAuthCode(String email, String code) {
        String purpose = "FIND_PASSWORD";

        Optional<EmailAuth> optionalAuth = emailAuthRepository.findTopByEmailAndPurposeOrderByCreatedAtDesc(email, purpose);

        if (optionalAuth.isEmpty()) {
            return false;
        }

        EmailAuth emailAuth = optionalAuth.get();

        LocalDateTime expireTime = emailAuth.getCreatedAt().plusMinutes(5);

        if (!emailAuth.isVerified() && emailAuth.getCode().equals(code) && LocalDateTime.now().isBefore(expireTime)) {
            emailAuth.setVerified(true);
            emailAuthRepository.save(emailAuth);
            return true;
        }
        return false;
    }

    // 인증번호 생성
    private String createAuthCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }

    // 비밀번호 재설정
    public void resetPassword(ResetPasswordDto dto) {
        Member member = memberRepository.findByMemberId(dto.getMemberId())
                .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));

        // 이메일 일치 확인 (인증 완료 여부는 따로 검증했다고 가정)
        if (!member.getEmail().trim().equalsIgnoreCase(dto.getEmail().trim())) {
            throw new RuntimeException("회원 정보가 일치하지 않습니다.");
        }

        // 새 비밀번호 유효성 검사
        String newPassword = dto.getNewPassword();
        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$", newPassword)) {
            throw new RuntimeException("비밀번호 형식이 맞지 않습니다.");
        }


        LocalDateTime now = LocalDateTime.now();
        member.setUpdateDttm(now);

        // 비밀번호 변경 및 저장
        member.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        memberRepository.save(member);
    }

    // 아이디 중복 확인
    public boolean existsByMemberId(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    // 회원가입 유효성 검사
    public boolean validate(MemberSignupForm memberSignupForm) {
        // memberId 중복 여부
        Optional<Member> dbData = memberRepository.findByMemberId(memberSignupForm.getMemberId());
        if (dbData.isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }


        // 아이디 입력 유무
        if (memberSignupForm.getMemberId().trim().isBlank()) {
            throw new RuntimeException("아이디를 입력해야 합니다.");
        }
        // 비밀번호 유효성 검사
        String password = memberSignupForm.getPassword();
        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$", password)) {
            throw new RuntimeException("패스워드 형식에 맞지 않습니다.");
        }
        // 비밀번호 입력 유무
        if (memberSignupForm.getPassword().trim().isBlank()) {
            throw new RuntimeException("비밀번호를 입력해야 합니다.");
        }
        // 이름 입력 유무
        if (memberSignupForm.getName().trim().isBlank()) {
            throw new RuntimeException("이름을 입력해야 합니다.");
        }
        // 이메일 유효성 검사
        String email = memberSignupForm.getEmail();
        if (!Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", email)) {
            throw new RuntimeException("이메일 형싣에 맞지 않습니다.");
        }
        // 이메일 입력 유무
        if (memberSignupForm.getEmail().trim().isBlank()) {
            throw new RuntimeException("이메일을 입력해야 합니다.");
        }

        return true;
    }

    // 회원 목록(관리자)
    public Map<String, Object> list(Integer pageNumber, String keyword) {
        Page<MemberListDto> memberListDtoPage
                = memberRepository.findAllBy(PageRequest.of(pageNumber - 1, 10), keyword);

        int totalPages = memberListDtoPage.getTotalPages(); // 마지막 페이지
        int rightPageNumber = ((pageNumber - 1) / 10 + 1) * 10;
        int leftPageNumber = rightPageNumber - 9;
        rightPageNumber = Math.min(rightPageNumber, totalPages);
        leftPageNumber = Math.max(leftPageNumber, 1);

        var pageInfo = Map.of("totalPages", totalPages,
                "rightPageNumber", rightPageNumber,
                "leftPageNumber", leftPageNumber,
                "currentPageNumber", pageNumber);

        return Map.of("pageInfo", pageInfo,
                "memberList", memberListDtoPage.getContent());
    }

    // 회원 상세보기(관리자)
    public MemberDetailForm getMember(Integer seq) {
        Member db = memberRepository.findById(seq)
                .orElseThrow(() -> new RuntimeException(seq + "번 회원을 찾을 수 없습니다."));

        MemberDetailForm dto = new MemberDetailForm();
        dto.setMemberNo(db.getMemberNo());
        dto.setAuth(db.getAuth());
        dto.setMemberId(db.getMemberId());
        dto.setName(db.getName());
        dto.setEmail(db.getEmail());
        dto.setBirthDate(db.getBirthDate());
        dto.setPhone(db.getPhone());
        dto.setPostCode(db.getPostCode());
        dto.setAddr(db.getAddr());
        dto.setAddrDetail(db.getAddrDetail());
        dto.setInsertDttm(db.getInsertDttm());
        dto.setUpdateDttm(db.getUpdateDttm());
        dto.setState(db.getState());
        dto.setUseYn(db.getUseYn());
        dto.setDelYn(db.getDelYn());

        return dto;
    }

    // 회원 삭제 시 delYn 변경(삭제 데이터 보관)
    public void updateDelYn(Integer seq) {
        Member dbData = memberRepository.findById(seq).get();
        // del_yn = true
        dbData.setDelYn(true);
        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        dbData.setState("DELETE");


        memberRepository.save(dbData);
    }

    // 회원 정보 수정(관리자)
    public void update(Integer seq, MemberModifyDto dto) {
        Member dbData = memberRepository.findById(seq).get();
        dbData.setMemberNo(dto.getMemberNo());
        dbData.setAuth(dto.getAuth());
        dbData.setMemberId(dto.getMemberId());
        dbData.setName(dto.getName());
        dbData.setEmail(dto.getEmail());
        dbData.setPhone(dto.getPhone());
        dbData.setPostCode(dto.getPostCode());
        dbData.setAddr(dto.getAddr());
        dbData.setAddrDetail(dto.getAddrDetail());
        dbData.setUpdateDttm(LocalDateTime.now());
        dbData.setState(dto.getState());
        dbData.setUseYn(dto.isUseYn());
        dbData.setDelYn(dto.isDelYn());

        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);

        // 새 비밀번호 입력시에만 적용
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            dbData.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        if (dto.getBirthDate() != null && !dto.getBirthDate().isBlank()) {
            dbData.setBirthDate(LocalDate.parse(dto.getBirthDate()));
        }
        memberRepository.save(dbData);
    }

    // 회원 등록(관리자)
    public void add(MemberAddForm memberAddForm) {

        if (this.validate2(memberAddForm)) {
            Member member2 = new Member();
            member2.setAuth(memberAddForm.getAuth());
            member2.setMemberId(memberAddForm.getMemberId());
            member2.setPassword(passwordEncoder.encode(memberAddForm.getPassword()));
            member2.setName(memberAddForm.getName());
            member2.setPhone(memberAddForm.getPhone());
            member2.setBirthDate(memberAddForm.getBirthDate());
            member2.setEmail(memberAddForm.getEmail());
            member2.setAddr(memberAddForm.getAddr());
            member2.setAddrDetail(memberAddForm.getAddrDetail());
            member2.setPostCode(memberAddForm.getPostCode());

            // 고객번호 조합
            String code = "ME";
            Date now = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
            String date = formatter.format(now);
            Integer maxSeq = memberRepository.findMaxSeq();
            int latestSeq = (maxSeq != null) ? maxSeq + 1 : 1;
            String seqStr = String.format("%07d", latestSeq);
            member2.setMemberNo(code + date + seqStr);

            // 저장
            memberRepository.save(member2);
        }
    }

    // 회원 등록(관리자) 유효성 검사
    public boolean validate2(MemberAddForm memberAddForm) {
        // memberId 중복 여부
        Optional<Member> dbData = memberRepository.findByMemberId(memberAddForm.getMemberId());
        if (dbData.isPresent()) {
            throw new RuntimeException("이미 존재하는 아이디입니다.");
        }
        return true;
    }


    // 회원 정보 보기(회원)
    public MyInfoDto getMyInfo(String memberId) {
        Member dbData = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다." + memberId));
        MyInfoDto dto = new MyInfoDto();

        dto.setMemberId(dbData.getMemberId());
        dto.setName(dbData.getName());
        dto.setEmail(dbData.getEmail());
        dto.setBirthDate(dbData.getBirthDate());
        dto.setPhone(dbData.getPhone());
        dto.setPostCode(dbData.getPostCode());
        dto.setAddr(dbData.getAddr());
        dto.setAddrDetail(dbData.getAddrDetail());

        return dto;
    }

    // 회원탈퇴(회원)
    public void delete(String memberId) {
        Member dbData = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

        // update_dttm = NOW()
        LocalDateTime now = LocalDateTime.now();
        dbData.setUpdateDttm(now);
        // del_yn = true
        dbData.setDelYn(true);

        dbData.setState("DELETE");

        memberRepository.save(dbData);

    }


    // 회원정보수정(회원)
    public void MyInfoModify(String memberId, MyInfoModifyDto dto) {
        if (this.validate3(dto)) {
            Member dbData = memberRepository.findByMemberId(memberId).get();

            dbData.setMemberId(dto.getMemberId());
            dbData.setName(dto.getName());
            dbData.setEmail(dto.getEmail());
            dbData.setPhone(dto.getPhone());
            dbData.setPostCode(dto.getPostCode());
            dbData.setAddr(dto.getAddr());
            dbData.setAddrDetail(dto.getAddrDetail());

            if (dto.getBirthDate() != null) {
                dbData.setBirthDate(dto.getBirthDate());
            }

            LocalDateTime now = LocalDateTime.now();
            dbData.setUpdateDttm(now);

            memberRepository.save(dbData);

        }
    }

    //회원정보수정(회원) 유효성 검사
    public boolean validate3(MyInfoModifyDto dto) {

        // 이메일 유효성 검사
        String email = dto.getEmail();
        if (!Pattern.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", email)) {
            throw new RuntimeException("이메일 형싣에 맞지 않습니다.");
        }
        // 이메일 입력 유무
        if (dto.getEmail().trim().isBlank()) {
            throw new RuntimeException("이메일을 입력해야 합니다.");
        }

        return true;
    }

    // 비밀번호 변경(회원)
    public void changePassword(ChangePasswordForm dto) {
        Member dbData = memberRepository.findByMemberId(dto.getMemberId()).get();

        // 현재 비밀번호 일치 확인
        if (!passwordEncoder.matches(dto.getCurrentPassword(), dbData.getPassword())) {
            throw new RuntimeException("패스워드가 일치하지 않습니다.");
        }

        // 새 비밀번호가 현재 비밀번호와 같은지 확인
        if (passwordEncoder.matches(dto.getNewPassword(), dbData.getPassword())) {
            throw new RuntimeException("새 비밀번호는 현재 비밀번호와 달라야 합니다.");
        }

        // 새 비밀번호 유효성 검사
        String newPassword = dto.getNewPassword();
        if (!Pattern.matches("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*~]).{8,}$", newPassword)) {
            throw new RuntimeException("비밀번호 형식이 맞지 않습니다.");
        }

        // 변경 및 저장
        dbData.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        memberRepository.save(dbData);
    }

    // 로그인(토큰생성)
    public String getToken(MemberLoginForm dto) {
        // id 조회
        Optional<Member> dbData = memberRepository.findByMemberId(dto.getMemberId());
        if (dbData.isPresent()) {
            // 입력 password 비교
            String inputPassword = dto.getPassword();
            String dbPassword = dbData.get().getPassword();
            if (passwordEncoder.matches(inputPassword, dbPassword)) {
                // 사용자 권한 조회
                List<Auth> authList = authRepository.findByMember(dbData.get());
                String authListStr = authList.stream()
                        .map(auth -> auth.getId().getAuthName())
                        .collect(Collectors.joining(","));
                // 토큰 생성
                JwtClaimsSet claim = JwtClaimsSet.builder()
                        .subject(dto.getMemberId())
                        .issuer("self")
                        .issuedAt(Instant.now())
                        .expiresAt(Instant.now().plusSeconds(60 * 60 * 24 * 365))
                        .claim("scp", authListStr)
                        .build();

                // 생성한 토큰 MemberLogin.jsx로 반환
                return jwtEncoder.encode(JwtEncoderParameters.from(claim)).getTokenValue();
            }
        }

        throw new RuntimeException("아이디 및 패스워드가 일치하지 않습니다.");

    }

    // AuthenticationContextProvider용 경로 요청
    public TokenInfoDto getTokenInfo(String memberId) {
        Member dbData = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));


        return new TokenInfoDto(dbData.getMemberId(), dbData.getName());
    }

}
