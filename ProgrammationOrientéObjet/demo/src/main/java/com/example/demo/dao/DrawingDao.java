
package com.example.demo.dao;

import java.util.List;

import com.example.demo.model.Drawing;
import com.example.demo.model.Shape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface DrawingDao extends JpaRepository<Drawing, Integer>{
    List<Drawing> findAll();

    Drawing findById(int id);
    
    Drawing save(Drawing drawing); 
    
    Drawing deleteById(int id); 
    
}
