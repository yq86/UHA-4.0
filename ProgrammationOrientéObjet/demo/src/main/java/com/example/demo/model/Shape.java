package com.example.demo.model;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Shape {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    protected int id;
    protected float base;
    protected float depth;
    protected int x;
    protected int y;  

    public int getX() {
        return  x;
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

    public Shape(){}

    public void setId(int id){
        this.id = id;
    }

    public int getId(){
        return id;
    }

    public float getBase(){
        return this.base;
    }

    public void setBase(float b){
        this.base = b;
    }

    public float getDepth(){
        return this.depth;
    }

    public void setDepth(float d){
        this.depth = d;
    }

    public String toString(){
        return null;
    }

    public abstract float getPerimeter();
    public abstract float getArea();
    public abstract float getVolume();

}
