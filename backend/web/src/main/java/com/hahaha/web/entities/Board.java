package com.bitcamp.web.entities;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.FetchType;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.ToString;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;
/**
 * Board
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString(exclude="replies")
@Table(name = "board")
public class Board implements Serializable{
    
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")            private Long   id;
    @Column(name = "country")       private String country;
    @Column(name = "category")      private String category;
    @Column(name = "email", nullable=false)   private String email;
    @Column(name = "title", nullable=false)   private String title;
    @Column(name = "content")       private String content;
    @Temporal(TemporalType.DATE)    private Date regDate;
    @Temporal(TemporalType.DATE)    private Date startDate;
    @Temporal(TemporalType.DATE)    private Date endDate;
    @Column(name = "protect"  )       private String protect;
    @Column(name = "fileUrl")       private String fileUrl;
    // @CreationTimestamp
    // @Column(name = "signup_date", nullable = false)
    // private Timestamp signupDate;
    @JsonIgnore
    @OneToMany(mappedBy = "board", fetch=FetchType.LAZY, orphanRemoval = true)
    private List<BoardReply> replies;

    @Override
    public String toString(){
        return  "Board :[id:"
        // +id
        +",country:" +country+", category:"+category+", email:"+email+", title:"+title+
                ", content:"+content+", regDate:"+regDate+", startDate:"+startDate+", endDate:"+endDate+
                ", protect:"+protect+"]";
    }

    @Builder
    private Board(  String country,     String category,
                    String email, String title,     String content,
                    Date regDate,     Date startDate, Date endDate,
                    String protect, String fileUrl){
        this.country        = country;
        this.category       = category;
        this.email          = email;
        this.title          = title;
        this.content        = content;
        this.regDate        = regDate;
        this.startDate      = startDate;
        this.endDate        = endDate;
        this.protect        = protect;
        this.fileUrl        = fileUrl;
    }
}