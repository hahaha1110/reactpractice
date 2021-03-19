package com.bitcamp.web.entities;

import java.io.Serializable;
import java.util.Date;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;



/**
 * Member
 * id가 pk
 * grade y n 으로 표기
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString
@Table(name = "member", uniqueConstraints = {@UniqueConstraint(
    name = "EMAIL_UNIQUE",
    columnNames = {"email"}
)})
public class Member implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")             private Long   id;
    @Column(name = "name")           private String name;
    @Column(name = "email", nullable=false, unique = true)          private String email;
    @Column(name = "pwd", nullable=false)            private String pwd;
    @Column(name = "grade", nullable=false)          private String grade;    
    @Column(name = "introduce")      private String introduce;
    @Temporal(TemporalType.DATE)     private Date regDate;
    @Column(name = "fileUrl") private String fileUrl;
    

    // @CreationTimestamp
    // @Column(name = "signup_date", nullable = false)
    // private Timestamp signupDate;

    @Override
    public String toString(){
        return  "Member :[id:"+id+",name:" +name+", email:"+email+", password:"+pwd+", grade:"+grade+
                ", introduce:"+introduce+", regDate:"+regDate+", fileUrl:"+fileUrl+"]";
    }

    @Builder
    private Member( String name,        String email,
                    String pwd,         String grade,     String introduce,
                    Date regDate,     String fileUrl){
        this.name           = name;
        this.email          = email;
        this.pwd            = pwd;
        this.grade          = grade;
        this.introduce      = introduce;
        this.regDate        = regDate;
        this.fileUrl        = fileUrl;
        
    }
}