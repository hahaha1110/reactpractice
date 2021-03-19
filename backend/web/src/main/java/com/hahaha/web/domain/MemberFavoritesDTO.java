package com.bitcamp.web.domain;
import lombok.Data;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
/**
 * MemberFavoritesDTO (즐겨찾기)
 * 글번호, 내 이메일아이디, 즐찾한 날짜
 */
@Data @Component @Lazy
public class MemberFavoritesDTO {
    private String   boardNum
                    ,email
                    ,favDate;
}