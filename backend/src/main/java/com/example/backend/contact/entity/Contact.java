package com.example.backend.contact.entity;

import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Entity
@Table(name = "contact", schema = "prj4")
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "seq", nullable = false)
    private Integer seq;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @ColumnDefault("0")
    @Column(name = "view")
    private Integer view = 0;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime insertDttm;

    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime updateDttm;

    @Column(name = "reply", nullable = false, length = 1000)
    private String reply = "아직 답변이 없습니다. (readonly로 수정 못하게 할 예정)\n\n아래 답변 저장 버튼을 관리자만 볼 수 있게 해서,\n\n관리자만 수정 할 수 있게 할 예정";

    @ColumnDefault("current_timestamp()")
    @Column(name = "reply_dttm", nullable = false, insertable = false, updatable = false)
    private LocalDateTime replyDttm;

    @ColumnDefault("1")
    @Column(name = "use_yn", nullable = true)
    private Boolean useYn = true;

    @ColumnDefault("0")
    @Column(name = "del_yn", nullable = false)
    private Boolean delYn = false;


//    @Column(name = "contact_no", nullable = false, length = 20)
//    private String contactNo;
//
//    @ManyToOne(optional = false)
//    @JoinColumn(name = "member_no", nullable = false, referencedColumnName = "member_no")
//    private Member memberNo;

}