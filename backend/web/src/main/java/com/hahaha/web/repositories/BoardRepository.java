package com.bitcamp.web.repositories;

import com.bitcamp.web.entities.Board;
import com.bitcamp.web.entities.QBoard;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * BoardRepository
 */
@Repository
public interface BoardRepository extends CrudRepository<Board, Long>,QuerydslPredicateExecutor<Board>{
    public default Predicate makePredicate(String keyword){
        BooleanBuilder builder = new BooleanBuilder();
        QBoard board = QBoard.board;
        //id>0
        builder.and(board.id.gt(0));
        //검색
        if(!(keyword.equals("null"))&&(keyword!=null)){
            builder.and(board.title.like("%"+keyword+"%"));
        }
        return builder;
    }
    
}