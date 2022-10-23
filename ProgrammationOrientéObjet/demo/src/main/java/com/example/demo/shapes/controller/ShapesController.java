package com.example.demo.shapes.controller;
import java.net.URI;
import java.util.List;

// import com.example.demo.dao.DrawingDao;
import com.example.demo.dao.ShapesDao;
import com.example.demo.dto.ShapeDto;
import com.example.demo.exceptions.ShapeNotFoundException;
import com.example.demo.model.Drawing;
// import com.example.demo.dto.ShapeDto;
import com.example.demo.model.Shape;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@RestController
@CrossOrigin
public class ShapesController {

   
    @Autowired
    private ShapesDao shapesDao;
   
   /**
     * 
     * @apiNote to show all the shapes and the total
     * 
     */

    @RequestMapping(value="/shapes/total", method=RequestMethod.GET)
    public Drawing listTotalShapes() {
        Iterable<Shape> shapeList = shapesDao.findAll(); 
        String name = "newDrawing";
        Drawing drawing = new Drawing((List<Shape>) shapeList, name);
        return  drawing;
    } 

    /**
     * 
     * @apiNote to show all the shapes 
     * 
     */
    @RequestMapping(value="/shapes", method=RequestMethod.GET)
    public Iterable<Shape>  listShapes() {
        Iterable<Shape> shapes = shapesDao.findAll();   
       return  shapes;
    }

    /**
     * 
     * @apiNote to show one shape
     * @param id
     */
    @GetMapping(value = "shapes/{id}")
    public Shape showOneShape(@PathVariable int id){
        Shape shape = shapesDao.findById(id);
        if(shape == null) throw new ShapeNotFoundException(" the shape with id " + id + " does not exist.");
        return shape;
    }

    /**
     * 
     * @apiNote to delete one shape
     * @param id shape
     */
    @DeleteMapping (value = "shapes/delete/{id}")
    public String ShapeDeleteOneShape(@PathVariable int id) throws Exception{     
        try {  
            Shape shape = shapesDao.findById(id);
            shapesDao.delete(shape); 
            Iterable<Shape> shapes = shapesDao.findAll();            
            return "shape deleted";
        }
        catch (Exception ex) {
            return "remove this shape from all the pictures!";
        }
    }


    /**
     * 
     * @apiNote to update one shape
     * @param shapeDto
     */
    @PutMapping (value = "/shapes")
    @ResponseBody
    public Shape updateShape(@RequestBody ShapeDto shapeDto){
        Shape shape = shapeDto.shapeDtoAddShape(shapeDto);
        shapesDao.save(shape);
        return shape;     

    }

     /**
     * 
     * @apiNote to add one shape
     * @param shapeDto
     */
    @PostMapping(value = "/shapes/add")
    @ResponseBody
    public Shape addShape(@RequestBody ShapeDto shapeDto) {
        Shape shape = shapeDto.shapeDtoAddShape(shapeDto);
        shapesDao.save(shape);
        return shape;
    }
    /*
    public ShapesController(ShapesDao shapesDao){
        this.shapesDao = shapesDao;
    }
    
    @GetMapping("/shapes")
    public List<ShapeBase> listeShapes(){
        return shapesDao.readAll();
    }

    @GetMapping(value = "/shapes/{id}")
    public ShapeBase showAshape(@PathVariable int id){
        return shapesDao.readById(id);
    }

    
    @PostMapping(value="/shapes/add")
        public void addShape(@RequestBody ShapeDto shapeDto){
         
        ShapeBase shapeBase = ShapeDto.shapeDtoAddShape(shapeDto);
       
        shapesDao.save(shapeBase);
    }

    @PutMapping (value = "/shapes/update")
    public void updateShape(@RequestBody ShapeDto shapeDto){
        shapeDto.shapeDtoUpdateShape(shapeDto);     
    }

    @DeleteMapping (value = "/shapes/delete/{id}")
        public void deleteShape(@PathVariable int id) {
        shapesDao.deleteById(id);
    }
    */
    
}
