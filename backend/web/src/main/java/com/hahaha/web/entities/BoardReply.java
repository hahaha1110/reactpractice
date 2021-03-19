package com.bitcamp.web.entities;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.ToString;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AccessLevel;
/**
 * BoardReply
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString(exclude = "member")
@Table(name = "boardReply")
public class BoardReply implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "replyText", nullable=false) private String replyText;
    @Column(name = "replyer", nullable=false) private String replyer;
    @CreationTimestamp private Timestamp regdate;

    @JsonIgnore
    @ManyToOne(fetch=FetchType.LAZY)
    private Board board;
}