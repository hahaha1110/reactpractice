package com.bitcamp.web.domain;
import lombok.Data;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
/**
 * BoardImageDTO
 */
@Data @Component @Lazy
public class BoardImageDTO {
    private String   boardNum
                    ,photoSize
                    ,originFilename
                    ,storedFilename;
}