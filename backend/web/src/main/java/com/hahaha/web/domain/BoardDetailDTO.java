package com.bitcamp.web.domain;
import lombok.Data;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
/**
 * BoardDetailDTO
 * Board의 startDate, endDate에 따라 나온 조각조각들..
 */
@Data @Component @Lazy
public class BoardDetailDTO {
    private String   boardNum
                    ,date
                    ,contents;    
}