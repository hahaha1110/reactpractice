package com.bitcamp.web.entities;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * MemberFavorites(즐찾) id가 pk
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString
@Table(name = "memberFavorites")
public class MemberFavorites implements Serializable{
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "id")        private Long   id;
    // @Column(name = "boardNum")  private String boardNum;
    @Column(name = "email")     private String email;
    @Column(name = "favDate")   private String favDate;
    
    @Override
    public String toString(){
        return "MemberFavorites :[id:"+id+", email:"+email+", favDate:"+favDate+"]";
    }

    @Builder
    private MemberFavorites(String boardNum, String email, String favDate){
        // this.boardNum   = boardNum;
        this.email      = email;
        this.favDate    = favDate;
    }
}