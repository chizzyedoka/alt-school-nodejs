create database inventory_management_system;
CREATE TABLE `inventory_management_system`.`customers` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NULL,
    `address` VARCHAR(45) NULL,
    `phone_number` VARCHAR(45) NULL,
    PRIMARY KEY (`id`)
);

INSERT INTO `inventory_management_system`.`customers` (`id`, `name`, `email`, `address`, `phone_number`) VALUES ('1', 'chisom', 'chisom@gmail.com', 'university road', '09092384362');
INSERT INTO `inventory_management_system`.`customers` (`id`, `name`, `email`, `address`, `phone_number`) VALUES ('2', 'mide', 'mide@gmail.com', 'akoka road', '0123456578');
INSERT INTO `inventory_management_system`.`customers` (`id`, `name`, `email`, `address`, `phone_number`) VALUES ('3','franklin', 'franklin@gmail.com', 'festac road', '08064176419');

CREATE TABLE `inventory_management_system`.`orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_name` varchar(45) NOT NULL,
  `customer_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`)
);

INSERT INTO `inventory_management_system`.`orders` (`id`,`customer_name`,`customer_id`,`product_id`) VALUES ('1','chisom','1','23');

CREATE TABLE `inventory_management_system`.`sizes` (
`id` INT NOT NULL,
`size` varchar(20),
PRIMARY KEY (`id`)
);

INSERT INTO `inventory_management_system`.`sizes` (`id`,`size`) VALUES ('1','small');
INSERT INTO `inventory_management_system`.`sizes` (`id`,`size`) VALUES ('2','medium');
INSERT INTO `inventory_management_system`.`sizes` (`id`,`size`) VALUES ('3','large');

CREATE TABLE `inventory_management_system`.`categories` (
`id` INT NOT NULL,
`product_type` varchar(45) NOT NULL,
PRIMARY KEY (`id`)
);

INSERT INTO `inventory_management_system`.`categories` (`id`,`product_type`) VALUES ('1','Books');
INSERT INTO `inventory_management_system`.`categories` (`id`,`product_type`) VALUES ('2','Electronics');
INSERT INTO `inventory_management_system`.`categories` (`id`,`product_type`) VALUES ('3','Toys');
INSERT INTO `inventory_management_system`.`categories` (`id`,`product_type`) VALUES ('4','Clothing');
INSERT INTO `inventory_management_system`.`categories` (`id`,`product_type`) VALUES ('5','Home&Kitchen');

CREATE TABLE `inventory_management_system`.`products`(
`id` int AUTO_INCREMENT,
`product_name` varchar(45) NOT NULL,
`price` int NOT NULL,
`size` int NOT NULL,
`category` int NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`size`) REFERENCES `sizes` (`id`),
FOREIGN KEY (`category`) REFERENCES `categories` (`id`)
);

INSERT INTO `inventory_management_system`.`products` (`id`,`product_name`,`price`,`size`,`category`) VALUES ('20','laptop','250000','2','2');
INSERT INTO `inventory_management_system`.`products` (`id`,`product_name`,`price`,`size`,`category`) VALUES ('21','atomic habits','2000','1','1');
INSERT INTO `inventory_management_system`.`products` (`id`,`product_name`,`price`,`size`,`category`) VALUES ('22','blender','20000','2','5');
INSERT INTO `inventory_management_system`.`products` (`id`,`product_name`,`price`,`size`,`category`) VALUES ('23','television','80000','3','2');

SELECT 
    *
FROM
    inventory_management_system.products;

SELECT 
    *
FROM
    inventory_management_system.customers;
    
UPDATE `inventory_management_system`.`customers` SET `name` = 'nonso', `email` = 'nonso@gmail.com' WHERE (`id` = '1');
UPDATE `inventory_management_system`.`categories` SET `product_type` = 'Food' WHERE (`id` = '3');

DELETE FROM `inventory_management_system`.`customers` 
WHERE
    (`id` = '3');
    
DELETE FROM `inventory_management_system`.`categories` 
WHERE
    (`id` = '4');




