package com.bitcamp.web.repositories;

import com.bitcamp.web.entities.BoardImage;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * BoardImageRepository
 */
@Repository
public interface BoardImageRepository extends CrudRepository<BoardImage, Long>{

    
}