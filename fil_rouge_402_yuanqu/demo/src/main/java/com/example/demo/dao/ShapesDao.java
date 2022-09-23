package com.example.demo.dao;

import java.util.List;

import com.example.demo.model.Shape;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


public interface ShapesDao extends JpaRepository<Shape, Integer>{
     
  //  @Query("DELETE FROM DRAWING_LIST_SHAPE d WHERE d.list_shape_id = :id")
    Shape deleteShapeById(int id); 

    Shape findById(int id);

    List<Shape> findAll();
    Shape save(Shape shape);  
}
