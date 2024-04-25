DROP DATABASE IF EXISTS defaultdb;
CREATE DATABASE defaultdb;

USE defaultdb;



CREATE TABLE users(
	username varchar(50) primary key not null unique,
    hashedPassword varchar(50) not null,
    totalReviewsGiven int DEFAULT 0,
    profilePictureFileName varchar(100),
    location varchar(100)
) ;

CREATE TABLE dishes(
	dishName varchar(50) primary key not null unique,
    allergens varchar(250),
    isVegan BOOLEAN,
    isVegetarian BOOLEAN,
    diningHall varchar(50),
    averageStarRating float DEFAULT 0,
    totalReviews int DEFAULT 0,
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

INSERT INTO users(username, hashedPassword, profilePictureFileName) VALUES ('username','password', 'filename');

SELECT * FROM users;