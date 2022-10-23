package com.example.demo.model;

import java.text.NumberFormat;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Circle extends Shape{
 
    public String type = "cylinder";

    public Circle() {}

    public Circle(int id, float radius, float depth, int x, int y){
        if(radius > 0 && depth >0){
            this.id = id;
            super.base = radius; 
            super.depth = depth;
            super.x = x;
            super.y = y;
        } else {
            System.out.println("length of radius incorrect");
        }
    }

    public float getPerimeter(){
        return (float) (2*3.14*super.getBase());
    }

    public float getArea(){
        return (float) (3.14*super.getBase()*super.getBase());
    }

    public float getVolume(){
        return getArea()*getDepth();
    }

    public String toString(){       
        return "Circle radius: " + super.getBase() + ",  perimeter: " + getPerimeter() + ",  area: " + getArea();  
    } 
}