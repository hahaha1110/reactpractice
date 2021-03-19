package com.bitcamp.web.controller;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;

import com.bitcamp.web.common.lambda.ISupplier;
import com.bitcamp.web.domain.MemberDTO;
import com.bitcamp.web.entities.Member;
import com.bitcamp.web.repositories.MemberRepository;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
/**
 * MemberController
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/member")
public class MemberController {
    @Autowired MemberDTO        member;
    @Autowired ModelMapper      modelMapper;
    @Autowired MemberRepository repo;
    
    @Bean
    public ModelMapper ModelMapper(){
        return new ModelMapper();
    }
    //카운트(테스트 : 성공)
    @GetMapping("/count")
    public long count(){
        System.out.println("=========================MemberController.count()");  
        ISupplier fx = ()->{
            return repo.count();            
        };
        return (long)fx.get();
    }
  
    //회원 더미데이터 100개 생성
    @PostMapping("/dummyData")
    public HashMap<String,String>  dummyData(){
        HashMap<String,String> map = new HashMap<>();
        System.out.println("=========================MemberController.dummyData()");  
        IntStream.range(0, 100).forEach(i -> {
            Member entity              = new Member();
            entity.setName("test"+i);
            entity.setEmail(i+"@test");
            entity.setPwd("1234");  
            entity.setGrade("n");
            entity.setRegDate(new Date());

            repo.save(entity);
        });
        map.put("result","더미데이터 생성성공");  
        return map;

    }
    //회원가입
    @PostMapping("")
    public HashMap<String,String> save(@RequestBody MemberDTO dto){
        System.out.println("=========================MemberController.save()");
        // Date today = new Date();
        // SimpleDateFormat data = new SimpleDateFormat("yyyy-MM-dd");
        HashMap<String,String> map = new HashMap<>();
        Member entity              = new Member();
        
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPwd(dto.getPwd());  
        entity.setGrade(dto.getGrade());
        entity.setRegDate(new Date());

        try {
            repo.save(entity);
            map.put("result","회원가입 성공! 로그인해주세요");  
        } catch (Exception e) {
            map.put("result","중복된 아이디 입니다.");  
        }
        return map;   
    }
    
    //이메일로 닉네임 찾기
    @GetMapping("/findName/{email}")
    public String findName(@PathVariable String email){
        System.out.println("=========================MemberController.findName()");
        return repo.findByEmail(email).orElseThrow(EntityNotFoundException::new).getName();
    }

    //로그인
    @PostMapping("/login")
    public MemberDTO login(@RequestBody MemberDTO dto){
        System.out.println("=========================MemberController.login()");
        System.out.println("넘어온 아이디"+dto.getEmail()+"   넘어온 패스워드"+dto.getPwd());
        ISupplier fx = ()->{
            return repo.findByEmailAndPwd(dto.getEmail(), dto.getPwd()).orElseThrow(EntityNotFoundException::new);
        };
        return modelMapper.map(fx.get(),MemberDTO.class);
        // return null;
    }

     //마이페이지 수정 + 비밀번호 수정
     @PostMapping("/updateMypage")
     public HashMap<String,String>	updateMypage(@RequestBody MemberDTO dto){
         System.out.println("=========================MemberController.updateMypage()");
         System.out.println("넘어온 소개"+dto.getIntroduce()+"   넘어온 이메일"+dto.getEmail()+"   넘어온 닉네임"+dto.getName()+"   파일경로"+dto.getFileUrl());
         //dto를 엔티티로 바꿈
         //바뀌기 전 원래거를 찾아오는것
         Member entity = repo.findByEmail(dto.getEmail()).orElseThrow(EntityNotFoundException::new);
         
         //바뀐정보만 재세팅
         entity.setName(dto.getName());
         entity.setPwd(dto.getPwd());
         entity.setIntroduce(dto.getIntroduce());
         entity.setFileUrl(dto.getFileUrl());
         //저장
         repo.save(entity); 
         
         HashMap<String,String> map = new HashMap<>();
         map.put("result","수정성공");
         return map;   
     }
     //프로필 이미지 업로드
     @PostMapping("/uploadProfileImg")
     public HashMap<String,String>	uploadProfileImg(@RequestParam("photo") MultipartFile image) throws Exception{
        System.out.println("=========================MemberController.updateMypage()");
        System.out.println("넘어온이미지 객채"+image);
        System.out.println("넘어온이미지 객채"+image.getOriginalFilename());
        //프로필 이미지 업로드
        String sourceFileName = image.getOriginalFilename(); 
        String sourceFileNameExtension = FilenameUtils.getExtension(sourceFileName).toLowerCase(); 
        File destinationFile; 
        String destinationFileName;
        //상대경로 구하기
        String path = System.getProperty("user.dir").substring(0, System.getProperty("user.dir").length()-7);
        //필요한 경로로 잘라서 만들기
        System.out.println( System.getProperty("user.dir"));
        System.out.println(path);
        String fileUrl = path+"frontend/public/static/images/avatar/";
        System.out.println("저장된 경로 : "+ fileUrl);
        do { 
            destinationFileName = RandomStringUtils.randomAlphanumeric(32) + "." + sourceFileNameExtension; 
            destinationFile = new File(fileUrl + destinationFileName); 
        } while (destinationFile.exists()); 
        
        destinationFile.getParentFile().mkdirs(); 
        image.transferTo(destinationFile); 
        
        HashMap<String,String> map = new HashMap<>();
        //경로를 맵에 집어넣음
        
        map.put("result",destinationFileName);
        return map;   
     }

     //회원탈퇴
    @DeleteMapping("{id}")
    public HashMap<String,Object>	deleteById(@PathVariable String id){
        System.out.println("=========================MemberController.deleteById()");
        
        HashMap<String,Object> map = new HashMap<>();
        //삭제
        repo.deleteById(Long.parseLong(id));
       
        Iterable<Member> entities = repo.findAll();
        List<MemberDTO> list      = new ArrayList<>();
        
        for(Member m : entities){
            MemberDTO mem = modelMapper.map(m, MemberDTO.class);
            list.add(mem);
        }
        
        map.put("result","탈퇴되었습니다.");
        map.put("list",list);
        
        return map;
    }

     //회원관리 페이지(회원리스트)
     @GetMapping("/memberList/{nowPage}/{search}")
     public Page<Member> findAll(@PathVariable String nowPage, @PathVariable String search){
        System.out.println("=========================MemberController.findAll()");
        System.out.println("현재페이지 받아온 값 : "+nowPage);
        System.out.println("검색 받아온 값 : "+search);
        //페이지처리
        // if(nowPage.equals(null))
        //     nowPage = "0";
        Pageable pageable = PageRequest.of(Integer.parseInt(nowPage), 20, Direction.DESC,"id");
        Page<Member> result = repo.findAll(
            repo.makePredicate(search), pageable);
        
        System.out.println("PAGE : "+result.getPageable());
        System.out.println("---------------------------------");
        result.getContent().forEach(member->System.out.println(""+member));

        return result;
     }
}