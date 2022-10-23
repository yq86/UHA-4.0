package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Rectangle extends Shape{
   
    public String type = "rectangular prism";
    private float height;

    public Rectangle(){}

    public Rectangle(int id, float b, float h, float d, int x, int y){
        if(b>0 && h>0 && d>0){
            super.id = id;
            super.base = b;
            this.height = h;
            super.depth = d;
            super.x = x;
            super.y = y;
        } else {
            System.out.println("Base or height incorrect");
        }
    }

    public float getPerimeter(){
        return 2*(super.getBase()+getHeight());
    }

    public float getArea(){
        return super.getBase()*getHeight();
    }

    public float getVolume(){
        return getArea()*getDepth();
    }

    public String toString(){       
        return "Rectangle base: " + super.getBase() + ",  width: " + getHeight() + ",  perimeter: " + getPerimeter() + ",  area: " + getArea();  
    }

    public void setHeight(float h){
        if(h>0){
            this.height = h;
        }else{
            System.out.println("length of height incorrect");
        }   
    }

    public float getHeight(){
        return this.height;
    }

}