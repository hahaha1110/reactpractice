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
 * BoardImage
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString
@Table(name = "boardImage")
public class BoardImage implements Serializable{

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")             private Long   id; 
    @Column(name = "boardNum")       private String boardNum;
    @Column(name = "photoSize")      private String photoSize;
    @Column(name = "originFilename") private String originFilename;
    @Column(name = "storedFilename") private String storedFilename;
    @Column(name = "fileUrl")        private String fileUrl;

    @Override
    public String toString(){
        return   "BoardImage :[id:"+id+",boardNum:" +boardNum+", photoSize:"+photoSize
                +", originFilename:"+originFilename+", storedFilename:"+storedFilename+"]";
    }

    @Builder
    private BoardImage( String boardNum,       String photoSize,
                        String originFilename, String storedFilename){
        this.boardNum       = boardNum;
        this.photoSize      = photoSize;
        this.originFilename = originFilename;
        this.storedFilename = storedFilename;
    }
}