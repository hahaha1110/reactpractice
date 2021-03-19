package com.bitcamp.web.controller;

import java.util.HashMap;
import java.util.List;

import javax.transaction.Transactional;

import com.bitcamp.web.common.lambda.ISupplier;
import com.bitcamp.web.entities.Board;
import com.bitcamp.web.entities.BoardReply;
import com.bitcamp.web.repositories.BoardReplyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
/**
 * BoardReplyController
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/boardReply")
public class BoardReplyController {
    @Autowired BoardReplyRepository repo;
    
    //카운트(테스트 : 성공)
    @GetMapping("/count")
    public long count(){
        System.out.println("=========================BoardReplyController.count()");  
        ISupplier fx = ()->{
            return repo.count();            
        };
        return (long)fx.get();
    }
    //댓글작성
    @Transactional
    @PostMapping("/{bno}")
    public HashMap<String,String> save(@PathVariable("bno")Long bno, @RequestBody BoardReply reply){
        System.out.println("=========================BoardReplyController.save()");  
        System.out.println(reply.getReplyText());
        System.out.println(reply.getReplyer());
        System.out.println(bno);
        Board board = new Board();
        board.setId(bno);

        reply.setBoard(board);
        
        HashMap<String,String> map = new HashMap<>();
        try {
            repo.save(reply);
            map.put("result","댓글작성 성공");  
        } catch (Exception e) {
            e.printStackTrace();
            map.put("result","댓글작성 실패");  
        }
        return map;
    }

    //댓글 불러오기
    @Transactional
    @GetMapping("/{bno}")
    public List<BoardReply>	findAll(@PathVariable("bno")Long bno){
        System.out.println("=========================BoardReplyController.findAll()");  
        System.out.println(bno);
        Board board = new Board();
        board.setId(bno);
        
        return repo.getRepliesOfBoard(board);
    }

    //댓글 삭제
    @Transactional
	@DeleteMapping("/{bno}/{rno}")
    public List<BoardReply> remove(
			@PathVariable("bno")Long bno,
			@PathVariable("rno")Long rno){
    System.out.println("=========================BoardReplyController.remove()");                  
    System.out.println(bno);
    System.out.println(rno);
    repo.deleteById(rno);
    
    Board board = new Board();
    board.setId(bno);
    
    return repo.getRepliesOfBoard(board);
    }
    //댓글수정
    @Transactional
    @PutMapping("/{bno}")
    public List<BoardReply> modify(
            @PathVariable("bno")Long bno, 
            @RequestBody BoardReply reply){
        System.out.println("=========================BoardReplyController.modify()");                  
        System.out.println(bno);
        repo.findById(reply.getId()).ifPresent(origin -> {
            origin.setReplyText(reply.getReplyText());
            repo.save(origin);
        });
        Board board = new Board();
        board.setId(bno);
        return repo.getRepliesOfBoard(board);
    }
}