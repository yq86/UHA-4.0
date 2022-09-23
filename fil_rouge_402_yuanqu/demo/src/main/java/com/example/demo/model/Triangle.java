package com.example.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;

@Entity
public class Triangle extends Shape{
    
    public String type = "triangular prism";
    private float side1;
    private float side2;
    private int x;
    private int y;

    public Triangle(){}

    public Triangle(int id, float s1, float s2, float s3, float d, int x, int y){
        if((s1+s2)>s3 && (s1+s3)>s2 && (s2+s3)>s1){
            this.id = id;
            this.side1 = s1;
            this.side2 = s2;
            super.base = s3;
            super.depth = d;
            super.x = x;
            super.y = y;
        } else{
            System.out.println("These numbers dont form a triangle");
        }
    }

    public float getPerimeter(){
        float perimeter = getSide1() + getSide2() + super.getBase();
        return perimeter;
    }

    public float getArea(){
        float halfPerimeter = getPerimeter()/2;
        float area = (float) (Math.sqrt(halfPerimeter*(halfPerimeter-side1)*(halfPerimeter-side2)*(halfPerimeter-super.base)));
        return area;
        
    }

    public float getVolume(){
        return  getArea()*getDepth();
    }

    public String toString(){
        return "Triangle side1: " + getSide1() + ",  side2: " + getSide2() + ",  side3: " + super.getBase() + ",  perimeter: " + getPerimeter() + ",  area: " + getArea();  
    }

  
    public void setSide1(float s1){
          this.side1 = s1;
      
    }

    public void setSide2(float s2){
          this.side2 = s2;
       
        }

    public float getSide1(){
        return this.side1;
    }

    public float getSide2(){
        return this.side2;
    }

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
  
}