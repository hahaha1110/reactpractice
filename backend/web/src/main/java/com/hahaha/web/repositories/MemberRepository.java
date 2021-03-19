package com.bitcamp.web.repositories;

import com.bitcamp.web.entities.Member;
import com.bitcamp.web.entities.QMember;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;

import java.util.Optional;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
/**
 * MemberRepository
 */
@Repository
public interface MemberRepository extends CrudRepository<Member,Long>,QuerydslPredicateExecutor<Member>{
    
    public default Predicate makePredicate(String keyword){
        BooleanBuilder builder = new BooleanBuilder();
        QMember member = QMember.member;
        //id>0
        builder.and(member.id.gt(0));
        if(!(keyword.equals("null"))&&(keyword!=null)){
            builder.and(member.email.like("%"+keyword+"%"));
        }
        return builder;
    }
      
    public Optional<Member> findByEmailAndPwd(String email, String pwd);
    public Optional<Member> findByEmail(String email);
    
}