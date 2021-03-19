package com.bitcamp.web.domain;
import lombok.Data;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;
/**
 * MemberDTO (회원정보)
 * grade y n 으로 표기(관리자 여부)
 */
@Data @Component @Lazy
public class MemberDTO {
    private String  id 
                    ,name    
                    ,email   
                    ,pwd
                    ,grade        
                    ,introduce
                    ,regDate
                    ,fileUrl
                    ,originFilename
                    ,storedFilename;   
}