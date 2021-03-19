package com.bitcamp.web.repositories;

import com.bitcamp.web.entities.MemberFavorites;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * MemberFavoritesRepository
 */
@Repository
public interface MemberFavoritesRepository extends CrudRepository<MemberFavorites,Long>{

    
}