package com.bitcamp.web.repositories;

import com.bitcamp.web.entities.BoardDetail;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * BoardDetailRepository
 */
@Repository
public interface BoardDetailRepository extends CrudRepository<BoardDetail,Long>{

    
}