DROP DATABASE IF EXISTS diningHall;
CREATE DATABASE diningHall;

USE diningHall;



CREATE TABLE users(
	username varchar(50) primary key not null unique,
    hashedPassword varchar(50) not null,
    totalReviewsGiven int DEFAULT 0,
    pfp LONGBLOB,
    location varchar(100),
    isAdmin TINYINT(1) DEFAULT 0
) ;

CREATE TABLE dishes(
	dishName varchar(50) primary key not null unique,
    allergens varchar(250),
    isVegan BOOLEAN,
    isVegetarian BOOLEAN,
    diningHall varchar(50),
    averageStarRating float DEFAULT 0,
    totalReviews int DEFAULT 0,
    img LONGBLOB,
    CONSTRAINT checkDish CHECK (diningHall='McCarthy' OR diningHall='Parkside' OR diningHall='EVK')
);

CREATE TABLE reviews(
	reviewID int primary key auto_increment,
    authorUsername varchar(50) not null,
    dishName varchar(50) not null,
    reviewText varchar(2000) not null,
    pictureFileName varchar(50) not null,
    starRating int not null,
    timePosted timestamp default current_timestamp,
    FOREIGN KEY fk1(authorUsername) REFERENCES users(username) ON DELETE CASCADE,
    FOREIGN KEY fk2(dishName) REFERENCES dishes(dishName) ON DELETE CASCADE
);

INSERT INTO users(username, hashedPassword, isAdmin) VALUES ('admin@usc.edu','123', 1);


CREATE TABLE deletedDishes (
    dishName VARCHAR(255) primary key not null unique,
    reason VARCHAR(2000)
);

CREATE TABLE guestLocation (
    guestID INT UNSIGNED PRIMARY KEY CHECK (guestID BETWEEN 10000000 AND 99999999),
    location VARCHAR(255)
);

