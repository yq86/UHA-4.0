CREATE TABLE shape
(
   id           INT PRIMARY KEY AUTO_INCREMENT,
   base         FLOAT NOT NULL,
   depth        FLOAT NOT NULL,
   x            INT NOT NULL,
   Y            INT NOT NULL
);

CREATE TABLE circle 
(
   id           INT PRIMARY KEY,
   type         VARCHAR(255) NOT NULL
);

CREATE TABLE rectangle
(
   id           INT PRIMARY KEY,
   type         VARCHAR(255) NOT NULL,
   height       FLOAT
);

CREATE TABLE triangle
(
   id           INT PRIMARY KEY,
   type         VARCHAR(255) NOT NULL,
   side1        FLOAT,
   side2        FLOAT 
);


CREATE TABLE drawing
(
   id          INT PRIMARY KEY AUTO_INCREMENT,
   name        VARCHAR(255) NOT NULL
);

CREATE TABLE DRAWING_LIST_SHAPE
(
   drawing_id INT,
   list_shape_id INT
)

