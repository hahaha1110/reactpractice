package com.bitcamp.web.domain;
import lombok.Data;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
/**
 * BoardDTO
 * country:국가
 * category:후기/계획
 * protect:비밀글 여부
 * commentOrigin: 코멘트일경우 부모글번호, 코멘트 아닐경우 0으로세팅
 */
@Data @Component @Lazy
public class BoardDTO {
    private String   id 
                    ,country
                    ,category
                    ,email
                    ,title
                    ,content
                    ,regDate
                    ,startDate
                    ,endDate
                    ,protect
                    ,commentOrigin
                    ,fileUrl;
}