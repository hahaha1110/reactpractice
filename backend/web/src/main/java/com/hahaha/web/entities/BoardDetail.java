package com.bitcamp.web.entities;

import java.io.Serializable;
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

/**
 * BoardDetail
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString
@Table(name = "boardDetail")
public class BoardDetail implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")       private Long   id;
    @Column(name = "boardNum") private String boardNum;
    @Column(name = "date")     private String date;
    @Column(name = "contents") private String contents;

    @Override
    public String toString(){
        return   "BoardImage :[id:"+id+",boardNum:" +boardNum+", date:"+date+", contents:"+contents+"]";
    }

    @Builder
    private BoardDetail( String boardNum, String date, String contents){
        this.boardNum  = boardNum;
        this.date      = date;
        this.contents  = contents;
    }
}