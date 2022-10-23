package com.example.demo.shapes.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.demo.dao.DrawingDao;
import com.example.demo.dao.ShapesDao;
import com.example.demo.exceptions.ShapeNotFoundException;
import com.example.demo.model.Drawing;
import com.example.demo.model.Shape;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

 @CrossOrigin()
@RestController
public class DrawingController {

    @Autowired
    private DrawingDao drawingDao;
    @Autowired
    private ShapesDao shapesDao;

    /**
     * 
     * @apiNote to show all drawings
     * 
     */
    @RequestMapping(value="/drawings", method=RequestMethod.GET)
    public Iterable<Drawing> listDrawings() {
      
      return drawingDao.findAll();
    }

    /**
     * 
     * @apiNote to show one drawing
     * @param id
     */
    @GetMapping(value = "drawings/{id}")
    public Drawing showOneDrawing(@PathVariable int id){
      Drawing drawing = drawingDao.findById(id);
      if(drawing == null) throw new ShapeNotFoundException(" the drawing with id " + id + " does not exist.");
      return drawing;
    }

    /**
     * 
     * @apiNote to add one shape in one drawing
     * @param id drawing and id shape
     */
    @PostMapping(value = "/drawings/{idDrawing}/add/{idShape}")
    @ResponseBody
    public Shape addOneShapeToOneDrawing(@PathVariable int idDrawing, @PathVariable int idShape){
      Drawing drawing = drawingDao.findById(idDrawing);
      Shape shape = shapesDao.findById(idShape);
      drawing.addShapeToListShape(shape);
      drawingDao.save(drawing);
      return shape;
    }

    /**
     * 
     * @apiNote to create one drawing
     * @param id shapes
     */
    @PostMapping(value = "drawings/add/{drawingName}/{idShape}")
    @ResponseBody
    public Drawing createOneDrawing(@PathVariable String drawingName, @PathVariable int idShape){  
      Shape shape = shapesDao.findById(idShape);

      java.util.ArrayList<Shape> listShapes = new java.util.ArrayList<Shape>();
      listShapes.add(shape);
      Drawing drawing = new Drawing(listShapes, drawingName);
      
      drawingDao.save(drawing);
      return drawing;
    }
    

    /**
     * 
     * @apiNote to delete one shape from a drawing
     * @param id drawing and id shape
     */
    @DeleteMapping(value = "drawings/delete/{idDrawing}/{idShape}")
    @ResponseBody
    public Drawing deleteOneShapeFromDrawing(@PathVariable int idDrawing, @PathVariable int idShape){
      Drawing drawing = drawingDao.findById(idDrawing);
      Shape shape = shapesDao.findById(idShape);
      drawing.removeOneShapeFromListShape(shape);
      drawingDao.save(drawing);
      return drawing;
    }

    /**
     * 
     * @apiNote to delete one drawing
     * @param id drawing
     */
    @DeleteMapping(value = "drawings/delete/{id}")
    @ResponseBody
    public String deleteOneDrawing(@PathVariable int id){
      try{
        Drawing drawing = drawingDao.findById(id);
        drawingDao.delete(drawing);
        return "picture deleted";
      } 
      catch (Exception ex) {
        return "remove all the shapes before deleting the picture!";
      }
    }
   
}

