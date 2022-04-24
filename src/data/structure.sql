
---------------Table Products-------------------
------------------------------------------------
CREATE TABLE `products` (
 `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
 `price` int(6) DEFAULT NULL,
 `description` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
 `create_at` timestamp NULL DEFAULT NULL,
 `update_at` timestamp NULL DEFAULT NULL,
 `stock` smallint(6) unsigned DEFAULT NULL,
 `category_id` smallint(6) unsigned DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

---------------Table Categories-----------------
------------------------------------------------
CREATE TABLE `categories` (
 `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

---------------Table Orders-------------------
------------------------------------------------
CREATE TABLE `orders` (
 `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
 `amount` int(10) unsigned DEFAULT NULL,
 `shipping_address` varchar(50) DEFAULT NULL,
 `order_date` date NOT NULL,
 `order_status` varchar(10) DEFAULT NULL,
 `user_id` smallint(6) unsigned NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

---------------Table Products_Orders--------------------
------------------------------------------------
CREATE TABLE `products_orders` (
 `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
 `order_id` smallint(6) unsigned DEFAULT NULL,
 `product_id` smallint(6) unsigned DEFAULT NULL,
 `price` int(10) unsigned DEFAULT NULL,
 `sku` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
 `quantity` smallint(6) unsigned DEFAULT NULL,
 `size` varchar(5) CHARACTER SET utf8 DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

---------------Table Users--------------------
------------------------------------------------
CREATE TABLE `users` (
 `id` smallint(6) unsigned NOT NULL AUTO_INCREMENT,
 `first_name` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
 `last_name` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
 `email` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
 `password` varchar(30) CHARACTER SET utf16 DEFAULT NULL,
 `adress` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
 `phone` int(10) unsigned DEFAULT NULL,
 `role_id` smallint(4) unsigned DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

---------------Table rol-----------------------
------------------------------------------------
CREATE TABLE `role` (
 `id` smallint(4) unsigned NOT NULL AUTO_INCREMENT,
 `name` varchar(15) CHARACTER SET utf8 DEFAULT NULL,
 PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
