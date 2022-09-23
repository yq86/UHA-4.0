package com.example.demo.dto;

//import com.example.demo.dao.ShapesDaoImplementation;
import com.example.demo.model.Circle;
import com.example.demo.model.Rectangle;
import com.example.demo.model.Shape;
import com.example.demo.model.Triangle;

public class ShapeDto {
    private int id;
    private ShapeTypeEnum shapeTypeEnum;
    private float base;
    private float height;
    private float side1;
    private float side2;
    private float depth;
    private int x;

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    private int y;

    public static Shape shapeDtoAddShape(ShapeDto shapeDto) {
        Shape shape;
        switch (shapeDto.shapeTypeEnum) {
            case CIRCLE:
                shape = new Circle(shapeDto.getId(), shapeDto.getBase(), shapeDto.getDepth(), shapeDto.getX(), shapeDto.getY());
                break;
            case RECTANGLE:
                shape = new Rectangle(shapeDto.getId(), shapeDto.getBase(), shapeDto.getHeight(), shapeDto.getDepth(), shapeDto.getX(), shapeDto.getY());
                break;
            case TRIANGLE:
                shape = new Triangle(shapeDto.getId(), shapeDto.getSide1(), shapeDto.getSide2(), shapeDto.getBase(), shapeDto.getDepth(), shapeDto.getX(), shapeDto.getY());
                break;
            default:
                shape = new Rectangle(shapeDto.getId(), shapeDto.getBase(), shapeDto.getHeight(), shapeDto.getDepth(), shapeDto.getX(), shapeDto.getY());
                break;
        }
        return shape;
    }
/*
    public void shapeDtoUpdateShape(ShapeDto shapeDto) {
        Shape shape;
        switch (shapeDto.shapeTypeEnum) {
            case CIRCLE:
                Circle circle = (Circle) findById(shapeDto.getId()); 
                circle.setBase(shapeDto.getBase());
                circle.setDepth(shapeDto.getDepth());
                break;
            case RECTANGLE:
                Rectangle rect = (Rectangle) findById(shapeDto.getId());
                rect.setBase(shapeDto.getBase());
                rect.setHeight(shapeDto.getHeight());
                rect.setDepth(shapeDto.getDepth());
                break;
            case TRIANGLE:
                Triangle tri = (Triangle) findById(shapeDto.getId());
                tri.setBase(shapeDto.getBase());
                tri.setSide1(shapeDto.getSide1());
                tri.setSide2(shapeDto.getSide2());
                tri.setDepth(shapeDto.getDepth());
                break;
            default:
                break;
        }
    } */

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public float getBase() {
        return base;
    }

    public void setBase(float Base) {
        this.base = Base;
    }

    public float getHeight() {
        return height;
    }

    public void setHeight(float height) {
        this.height = height;
    }

    public float getSide1() {
        return side1;
    }

    public void setSide1(float side1) {
        this.side1 = side1;
    }

    public float getSide2() {
        return side2;
    }

    public void setSide2(float side2) {
        this.side2 = side2;
    }

    public float getDepth() {
        return depth;
    }

    public void setDepth(float depth3d) {
        this.depth = depth3d;
    }

    public ShapeTypeEnum getShapeTypeEnum() {
        return shapeTypeEnum;
    }

    public void setShapeTypeEnum(ShapeTypeEnum shapeTypeEnum) {
        this.shapeTypeEnum = shapeTypeEnum;
    }

    public String toString(){
        return "DEPTH is : "+ getDepth();
        
    } 
}
