-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.24-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for selftyshirt
DROP DATABASE IF EXISTS `selftyshirt`;
CREATE DATABASE IF NOT EXISTS `selftyshirt` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `selftyshirt`;

-- Dumping structure for table selftyshirt.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table selftyshirt.categories: ~0 rows (approximately)

-- Dumping structure for table selftyshirt.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `amount` int(10) unsigned DEFAULT NULL,
  `shipping_address` varchar(50) DEFAULT NULL,
  `order_date` date NOT NULL,
  `order_status` varchar(10) DEFAULT NULL,
  `user_id` smallint(6) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table selftyshirt.orders: ~0 rows (approximately)

-- Dumping structure for table selftyshirt.products
DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `price` decimal(6,2) unsigned NOT NULL,
  `description` varchar(100) NOT NULL,
  `stock` bigint(100) unsigned NOT NULL,
  `discount` smallint(3) unsigned NOT NULL,
  `category_id` bigint(10) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table selftyshirt.products: ~0 rows (approximately)

-- Dumping structure for table selftyshirt.products_orders
DROP TABLE IF EXISTS `products_orders`;
CREATE TABLE IF NOT EXISTS `products_orders` (
  `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` smallint(6) unsigned DEFAULT NULL,
  `product_id` smallint(6) unsigned DEFAULT NULL,
  `price` int(10) unsigned DEFAULT NULL,
  `sku` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  `quantity` smallint(6) unsigned DEFAULT NULL,
  `size` varchar(5) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping data for table selftyshirt.products_orders: ~0 rows (approximately)

-- Dumping structure for table selftyshirt.roles
DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table selftyshirt.roles: ~2 rows (approximately)
INSERT IGNORE INTO `roles` (`id`, `name`, `created_at`, `updated_at`) VALUES
	(1, 'user', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(2, 'admin', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
	(3, 'seller', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- Dumping structure for table selftyshirt.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(250) NOT NULL,
  `address` varchar(100) NOT NULL,
  `role_id` int(10) unsigned DEFAULT 1,
  `image` varchar(200) DEFAULT NULL,
  `newsletter` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_role_id_foreign` (`role_id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table selftyshirt.users: ~1 rows (approximately)
INSERT IGNORE INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `address`, `role_id`, `image`, `newsletter`, `created_at`, `updated_at`) VALUES
	(5, 'juan', 'serrano', 'juani@gmail.com', '$2a$10$seVAVLICzUJgAEvZIhTMyucjFGqyIeGCdd3/xCRcqx4cfBztxzP8y', 'Casa falsa 123', 1, 'default-avatar.jpg', 1, '2022-05-01 00:24:05', '2022-05-01 00:24:05');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
