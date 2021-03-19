package com.bitcamp.web.repositories;

import java.util.List;

import com.bitcamp.web.entities.Board;
import com.bitcamp.web.entities.BoardReply;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * BoardReplyRepository
 */
@Repository
public interface BoardReplyRepository extends CrudRepository<BoardReply,Long>{
    @Query("SELECT r FROM BoardReply r WHERE r.board = ?1 " +
	       " AND r.id > 0 ORDER BY r.id ASC")
	public List<BoardReply> getRepliesOfBoard(Board board);
    
}