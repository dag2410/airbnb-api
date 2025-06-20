-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: airbnb_dev
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) DEFAULT NULL,
  `icon` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (2,'can ho gia re ','aaa','gia re','2025-10-09 17:00:00',NULL),(3,'can ho dat','jajaj','dat ','2025-05-20 12:13:31',NULL),(4,'can ho cho thue','aaaa','aaa','2025-05-24 12:18:11',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) unsigned DEFAULT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `content` varchar(191) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id_fk` (`post_id`),
  CONSTRAINT `post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'111111111','2025-05-24 12:10:13',NULL),(8,1,2,'noi dung22222222222222',NULL,NULL),(9,1,2,'noi dung22222222222222',NULL,NULL),(10,1,1,'111111111','2025-05-24 05:10:13',NULL),(11,1,1,'111111111','2025-05-24 05:10:13',NULL),(12,1,1,'111111111','2025-05-24 05:10:13',NULL),(13,1,1,'111111111','2025-05-24 05:10:13',NULL),(14,1,1,'111111111','2025-05-24 05:10:13',NULL),(15,1,1,'111111111','2025-05-24 05:10:13',NULL);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `content` text NOT NULL,
  `published_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug_unique` (`slug`) USING BTREE,
  KEY `user_id_fk` (`user_id`),
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo','post-1','post-1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','post-1','2025-05-24 02:07:33',NULL,NULL),(207,1,'hai dang doooo','post-2','post-1bbbbbbbbbbbbbbbbbbbb','post-1','2025-05-24 02:07:41',NULL,NULL),(208,1,'duy daooooo','post-3','post-1cccccccccccccccccccccccccccccccccc','post-1','2025-05-24 02:07:44',NULL,NULL),(209,1,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo','post-4','post-1ddddddddddddddddddddddddddddddddddd','post-1','2025-05-24 02:07:46',NULL,NULL),(210,NULL,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo',NULL,NULL,'','2025-05-24 02:07:48',NULL,NULL),(211,NULL,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo',NULL,NULL,'','2025-05-24 02:07:50',NULL,NULL),(212,NULL,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo',NULL,NULL,'','2025-05-24 02:07:56',NULL,NULL),(213,NULL,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo',NULL,NULL,'','2025-05-24 02:07:58',NULL,NULL),(214,NULL,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo',NULL,NULL,'','2025-05-24 02:08:01',NULL,NULL),(215,1,'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo','post-11234567','post-1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa','post-1','2025-05-23 19:07:33',NULL,NULL);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `queues`
--

DROP TABLE IF EXISTS `queues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `queues` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `type` varchar(255) DEFAULT NULL,
  `payload` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp(),
  `max_retries` int(11) DEFAULT 5,
  `retries_count` int(11) DEFAULT 0,
  `retry_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=336 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queues`
--

LOCK TABLES `queues` WRITE;
/*!40000 ALTER TABLE `queues` DISABLE KEYS */;
INSERT INTO `queues` VALUES (231,'completed','sendVerifyEmailJob','{\"userId\":172}','2025-06-16 09:16:32','2025-06-16 09:16:32',NULL,NULL,NULL),(232,'completed','sendVerifyEmailJob','{\"userId\":173}','2025-06-16 09:26:23','2025-06-16 09:26:23',NULL,NULL,NULL),(233,'completed','sendVerifyEmailJob','{\"userId\":175}','2025-06-16 10:20:03','2025-06-16 10:20:03',5,0,NULL),(237,'failed','sendVerifyEmailJob','{\"userId\":200}','2025-06-16 10:35:52','2025-06-16 10:35:52',5,5,'2025-06-16 10:36:18'),(238,'completed','sendVerifyEmailJob','{\"userId\":180}','2025-06-16 10:37:26','2025-06-16 10:37:26',5,0,NULL),(239,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-16 10:38:13','2025-06-16 10:38:13',5,0,NULL),(272,'processing','sendVerifyEmailJob','{\"userId\":181}','2025-06-16 23:41:49','2025-06-16 23:41:49',5,0,NULL),(273,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-16 23:43:09','2025-06-16 23:43:09',5,0,NULL),(274,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-16 23:43:56','2025-06-16 23:43:56',5,0,NULL),(275,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 00:13:20','2025-06-17 00:13:20',5,0,NULL),(276,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 00:16:18','2025-06-17 00:16:18',5,0,NULL),(277,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 00:18:44','2025-06-17 00:18:44',5,0,NULL),(278,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 00:19:00','2025-06-17 00:19:00',5,0,NULL),(279,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 00:19:40','2025-06-17 00:19:40',5,0,NULL),(280,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 00:20:37','2025-06-17 00:20:37',5,0,NULL),(281,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 00:21:40','2025-06-17 00:21:40',5,0,NULL),(282,'completed','sendVerifyEmailJob','{\"userId\":1}','2025-06-17 00:24:02','2025-06-17 00:24:02',5,0,NULL),(283,'completed','sendVerifyEmailJob','{\"userId\":1}','2025-06-17 00:24:25','2025-06-17 00:24:25',5,0,NULL),(284,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 09:29:14','2025-06-17 09:29:14',5,0,NULL),(285,'completed','sendVerifyEmailJob','{\"userId\":181}','2025-06-17 09:29:56','2025-06-17 09:29:56',5,0,NULL),(286,'completed','sendVerifyEmailJob','{\"userId\":181,\"type\":\"forgot-password\"}','2025-06-17 11:55:43','2025-06-17 11:55:43',5,0,NULL),(287,'completed','sendVerifyEmailJob','{\"userId\":181,\"type\":\"forgot-password\"}','2025-06-17 11:57:01','2025-06-17 11:57:01',5,0,NULL),(288,'completed','sendVerifyEmailJob','{\"userId\":181,\"type\":\"forgot-password\"}','2025-06-17 11:58:11','2025-06-17 11:58:11',5,0,NULL),(289,'completed','sendVerifyEmailJob','{\"userId\":181,\"type\":\"forgot-password\"}','2025-06-17 12:01:47','2025-06-17 12:01:47',5,0,NULL),(290,'completed','sendVerifyEmailJob','{\"userId\":181,\"type\":\"forgot-password\"}','2025-06-17 12:01:59','2025-06-17 12:01:59',5,0,NULL),(291,'completed','sendVerifyEmailJob','{\"userId\":181,\"type\":\"forgot-password\"}','2025-06-17 12:05:23','2025-06-17 12:05:23',5,0,NULL),(292,'completed','sendVerifyEmailJob','{\"userId\":181,\"type\":\"forgot-password\"}','2025-06-17 12:05:35','2025-06-17 12:05:35',5,0,NULL),(327,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 18:27:44','2025-06-17 18:27:44',5,0,NULL),(328,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 18:27:46','2025-06-17 18:27:46',5,0,NULL),(329,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 19:07:24','2025-06-17 19:07:24',5,0,NULL),(330,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 19:07:26','2025-06-17 19:07:26',5,0,NULL),(331,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 19:07:28','2025-06-17 19:07:28',5,0,NULL),(332,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 19:07:30','2025-06-17 19:07:30',5,0,NULL),(333,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 19:07:32','2025-06-17 19:07:32',5,0,NULL),(334,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-17 19:14:00','2025-06-17 19:14:00',5,0,NULL),(335,'completed','sendVerifyEmailJob','{\"userId\":183,\"type\":\"verify-email\"}','2025-06-18 09:44:00','2025-06-18 09:44:00',5,0,NULL);
/*!40000 ALTER TABLE `queues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(191) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `location` varchar(191) DEFAULT NULL,
  `bedrooms` int(11) DEFAULT NULL,
  `amenities` text DEFAULT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `reviews_count` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `image` varchar(191) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id_fk` (`category_id`),
  CONSTRAINT `category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,2,'can ho hcm',1230000.00,'hcm',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-05-20 00:00:00','2025-05-20 00:00:00',NULL),(3,2,'can ho hanoi',1230000.00,'hcm',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-05-20 00:00:00','2025-05-30 00:00:00',NULL),(5,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL),(6,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL),(7,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL),(8,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL),(9,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL),(10,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL),(11,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL),(12,2,'can ho ha noi',1230000.00,'hanoi',4,'dieu hoa, may giat, khong chung chu',3.0,5,'2025-04-19 17:00:00','2025-05-19 17:00:00',NULL);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `sid` char(36) NOT NULL,
  `data` text DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`sid`) USING BTREE,
  KEY `sessions_expires_at_idx` (`expires_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('2c0e92d8-6885-4fcf-b544-6e2966b26d03','{\"userId\":1}','2025-06-07 20:31:26','2025-05-31 20:31:26','2025-06-07 19:11:46'),('8692b36e-8bbe-4f36-b9e6-300cf3bcbc26','{}','2025-06-07 19:33:32','2025-05-31 19:33:32','2025-05-31 20:24:44'),('a0e0c91a-6b40-465b-819b-33903d73a4ff','{\"userId\":1}','2025-06-14 22:31:17','2025-06-07 22:31:17','2025-06-12 00:39:47'),('c8212016-571a-427e-a726-b7e12df73f76','{\"userId\":183}','2025-06-22 09:49:03','2025-06-15 09:49:03','2025-06-17 16:27:57');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) DEFAULT NULL,
  `email` varchar(191) DEFAULT NULL,
  `password` varchar(191) DEFAULT NULL,
  `username` varchar(191) DEFAULT NULL,
  `birthday` varchar(191) DEFAULT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `rel_status` varchar(191) DEFAULT NULL,
  `bio` varchar(191) DEFAULT NULL,
  `address` varchar(191) DEFAULT NULL,
  `blocked_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(191) DEFAULT NULL,
  `status` varchar(191) DEFAULT NULL,
  `verified_at` datetime DEFAULT current_timestamp(),
  `email_sent_at` datetime DEFAULT NULL,
  `email_seen_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`),
  UNIQUE KEY `phone_unique` (`phone`),
  UNIQUE KEY `username_unique` (`username`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'hai dang ','haidang@gmail.com','12345678','haidang','2004-10-24',NULL,'male','0397546472','single',NULL,'Ha Noi',NULL,'2025-05-24 20:11:41','2025-06-17 00:24:29','editor','active','2025-06-07 22:30:47','2025-06-17 00:24:29',NULL),(55,'duong bach','bach@gmail.com','12345678','bachd123',NULL,NULL,NULL,'02345678912',NULL,NULL,'hanoi',NULL,'2025-05-28 08:18:10','2025-06-05 21:42:47','editor','inactive','2025-06-07 22:30:47','2025-06-11 22:36:51',NULL),(119,'Dương Hải Đăng8367','dagge11r2241004abc@gmail.com','12345678','dang8367',NULL,NULL,NULL,'0123454281',NULL,NULL,'Thành Công Ba Đình Hà Nội',NULL,'2025-06-05 01:26:26','2025-06-05 01:26:26','Editor','active','2025-06-07 22:30:47','2025-06-11 22:36:51',NULL),(132,'duong bao tram','tram@gmail.com','12345678','tram123',NULL,NULL,NULL,'0127866789',NULL,NULL,'Thành Công Ba Đình Hà Nội',NULL,'2025-06-05 15:49:47','2025-06-05 21:45:04','editor','pending','2025-06-07 22:30:47','2025-06-11 22:36:51',NULL),(183,'Dương Hải Đăng','dagger241004abc@gmail.com','1234567890',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2025-06-17 16:27:00','2025-06-18 09:44:11',NULL,NULL,'2025-06-17 16:27:00','2025-06-18 09:44:11',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-20 10:13:09
