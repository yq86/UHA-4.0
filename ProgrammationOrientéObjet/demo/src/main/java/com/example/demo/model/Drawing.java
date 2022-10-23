package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

import com.example.demo.dao.ShapesDao;


@Entity
public class Drawing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;
    protected String name;

   
    @ManyToMany(targetEntity = Shape.class, fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private final  List<Shape> listShape;
  

    public Drawing(){
        listShape = new ArrayList<Shape>();
        name = "newPicture";
    }

    public Drawing(List<Shape> list, String name){
        this.listShape = list;
        this.name = name;
    }

    public void addShapeToListShape(Shape shape){
        listShape.add(shape);
    }

    public void removeOneShapeFromListShape(Shape shape){
        listShape.remove(shape);
    }

  

    public float getTotalPerimeter(){
        float totalPerimeter = 0;
        for(Shape shape: listShape){          
            totalPerimeter += shape.getPerimeter();
        }
        return totalPerimeter;
    }

    public float getTotalArea(){
        float totalArea = 0;
        for(Shape shape: listShape){          
            totalArea += shape.getArea();
        }
        return totalArea;
    }

    public float getTotalVolume(){
        float totalVolume = 0;
        for(Shape shape: listShape){          
            totalVolume += shape.getVolume();
        }
        return totalVolume;
    }    
  
    public List<Shape> getListShape() {
        return listShape;
    } 

    public int getId(){
        return this.id;
    }

    public Integer getLengthListShape(){
        return getListShape().size();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

} 
