
package com.example.demo.dao;
/*
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import com.example.demo.model.Circle;
import com.example.demo.model.Rectangle;
import com.example.demo.model.Shape;
import com.example.demo.model.Triangle;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Repository;

// this class is supposed to communicate with the databse to retrieve shapes or add shapes

@Repository
public class ShapesDaoImplementation implements ShapesDao{
    public static List<Shape> shapesList = new ArrayList();
    public ShapesDao shapes;

    static {
        shapesList.add(new Circle(1, 5, 5));
        shapesList.add(new Rectangle(2, 28, 70, 7));
        shapesList.add(new Triangle(3, 6, 9, 7, 10));
    } 

    @Override
    public List<Shape> findAll() {
        return shapesList;
    }

    @Override
    public Shape findById(int id) {
        for(Shape shape: shapesList){
            if(shape.getId() == id){
                return shape;
            }
        }
        return null;
    }

    @Override
    public Shape save(Shape shape) {
        shapesList.add(shape);
        return shape;
    }

    @Override
    public Shape deleteById(int id) {
        for(Shape shape: shapesList){
            if(shape.getId() == id){
                shapesList.remove(shape);
                return shape;
            }
        }
        return null;
    }



    @Override
    public List<Shape> findAllById(Iterable<Integer> ids) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <S extends Shape> List<S> saveAll(Iterable<S> entities) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void flush() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public <S extends Shape> S saveAndFlush(S entity) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <S extends Shape> List<S> saveAllAndFlush(Iterable<S> entities) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void deleteAllInBatch(Iterable<Shape> entities) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteAllByIdInBatch(Iterable<Integer> ids) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteAllInBatch() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Shape getOne(Integer id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Shape getById(Integer id) {
        // TODO Auto-generated method stub
        return null;
    }

   

  



    @Override
    public boolean existsById(Integer id) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public long count() {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public void deleteById(Integer id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void delete(Shape entity) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteAllById(Iterable<? extends Integer> ids) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteAll(Iterable<? extends Shape> entities) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public void deleteAll() {
        // TODO Auto-generated method stub
        
    }

    @Override
    public <S extends Shape> Optional<S> findOne(Example<S> example) {
        // TODO Auto-generated method stub
        return null;
    }

   

    @Override
    public <S extends Shape> long count(Example<S> example) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public <S extends Shape> boolean exists(Example<S> example) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public <S extends Shape, R> R findBy(Example<S> example, Function<FetchableFluentQuery<S>, R> queryFunction) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Shape> findAll(Sort sort) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <S extends Shape> List<S> findAll(Example<S> example) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <S extends Shape> List<S> findAll(Example<S> example, Sort sort) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Page<Shape> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<Shape> findById(Integer id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public <S extends Shape> Page<S> findAll(Example<S> example, Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    

   
}
*/