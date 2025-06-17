/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MariaDB
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : airbnb_dev

 Target Server Type    : MariaDB
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 17/06/2025 16:31:27
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `icon` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name_unique`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (2, 'can ho gia re ', 'aaa', 'gia re', '2025-10-09 17:00:00', NULL);
INSERT INTO `categories` VALUES (3, 'can ho dat', 'jajaj', 'dat ', '2025-05-20 12:13:31', NULL);
INSERT INTO `categories` VALUES (4, 'can ho cho thue', 'aaaa', 'aaa', '2025-05-24 12:18:11', NULL);

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `post_id_fk`(`post_id`) USING BTREE,
  CONSTRAINT `post_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES (1, 1, 1, '111111111', '2025-05-24 12:10:13', NULL);
INSERT INTO `comments` VALUES (8, 1, 2, 'noi dung22222222222222', NULL, NULL);
INSERT INTO `comments` VALUES (9, 1, 2, 'noi dung22222222222222', NULL, NULL);
INSERT INTO `comments` VALUES (10, 1, 1, '111111111', '2025-05-24 05:10:13', NULL);
INSERT INTO `comments` VALUES (11, 1, 1, '111111111', '2025-05-24 05:10:13', NULL);
INSERT INTO `comments` VALUES (12, 1, 1, '111111111', '2025-05-24 05:10:13', NULL);
INSERT INTO `comments` VALUES (13, 1, 1, '111111111', '2025-05-24 05:10:13', NULL);
INSERT INTO `comments` VALUES (14, 1, 1, '111111111', '2025-05-24 05:10:13', NULL);
INSERT INTO `comments` VALUES (15, 1, 1, '111111111', '2025-05-24 05:10:13', NULL);

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `published_at` datetime NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `slug_unique`(`slug`) USING BTREE,
  INDEX `user_id_fk`(`user_id`) USING BTREE,
  CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 216 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, 1, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', 'post-1', 'post-1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'post-1', '2025-05-24 02:07:33', NULL, NULL);
INSERT INTO `posts` VALUES (207, 1, 'hai dang doooo', 'post-2', 'post-1bbbbbbbbbbbbbbbbbbbb', 'post-1', '2025-05-24 02:07:41', NULL, NULL);
INSERT INTO `posts` VALUES (208, 1, 'duy daooooo', 'post-3', 'post-1cccccccccccccccccccccccccccccccccc', 'post-1', '2025-05-24 02:07:44', NULL, NULL);
INSERT INTO `posts` VALUES (209, 1, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', 'post-4', 'post-1ddddddddddddddddddddddddddddddddddd', 'post-1', '2025-05-24 02:07:46', NULL, NULL);
INSERT INTO `posts` VALUES (210, NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', NULL, NULL, '', '2025-05-24 02:07:48', NULL, NULL);
INSERT INTO `posts` VALUES (211, NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', NULL, NULL, '', '2025-05-24 02:07:50', NULL, NULL);
INSERT INTO `posts` VALUES (212, NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', NULL, NULL, '', '2025-05-24 02:07:56', NULL, NULL);
INSERT INTO `posts` VALUES (213, NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', NULL, NULL, '', '2025-05-24 02:07:58', NULL, NULL);
INSERT INTO `posts` VALUES (214, NULL, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', NULL, NULL, '', '2025-05-24 02:08:01', NULL, NULL);
INSERT INTO `posts` VALUES (215, 1, 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro laudantium voluptates excepturi esse ea sed ex provident ullam, recusandae aliquid temporibus quos, magnam at. Minus, eos commo', 'post-11234567', 'post-1aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'post-1', '2025-05-23 19:07:33', NULL, NULL);

-- ----------------------------
-- Table structure for queues
-- ----------------------------
DROP TABLE IF EXISTS `queues`;
CREATE TABLE `queues`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'pending',
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `payload` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp(),
  `updated_at` datetime NULL DEFAULT current_timestamp(),
  `max_retries` int(11) NULL DEFAULT 5,
  `retries_count` int(11) NULL DEFAULT 0,
  `retry_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 308 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of queues
-- ----------------------------
INSERT INTO `queues` VALUES (231, 'completed', 'sendVerifyEmailJob', '{\"userId\":172}', '2025-06-16 09:16:32', '2025-06-16 09:16:32', NULL, NULL, NULL);
INSERT INTO `queues` VALUES (232, 'completed', 'sendVerifyEmailJob', '{\"userId\":173}', '2025-06-16 09:26:23', '2025-06-16 09:26:23', NULL, NULL, NULL);
INSERT INTO `queues` VALUES (233, 'completed', 'sendVerifyEmailJob', '{\"userId\":175}', '2025-06-16 10:20:03', '2025-06-16 10:20:03', 5, 0, NULL);
INSERT INTO `queues` VALUES (237, 'failed', 'sendVerifyEmailJob', '{\"userId\":200}', '2025-06-16 10:35:52', '2025-06-16 10:35:52', 5, 5, '2025-06-16 10:36:18');
INSERT INTO `queues` VALUES (238, 'completed', 'sendVerifyEmailJob', '{\"userId\":180}', '2025-06-16 10:37:26', '2025-06-16 10:37:26', 5, 0, NULL);
INSERT INTO `queues` VALUES (239, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-16 10:38:13', '2025-06-16 10:38:13', 5, 0, NULL);
INSERT INTO `queues` VALUES (272, 'processing', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-16 23:41:49', '2025-06-16 23:41:49', 5, 0, NULL);
INSERT INTO `queues` VALUES (273, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-16 23:43:09', '2025-06-16 23:43:09', 5, 0, NULL);
INSERT INTO `queues` VALUES (274, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-16 23:43:56', '2025-06-16 23:43:56', 5, 0, NULL);
INSERT INTO `queues` VALUES (275, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 00:13:20', '2025-06-17 00:13:20', 5, 0, NULL);
INSERT INTO `queues` VALUES (276, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 00:16:18', '2025-06-17 00:16:18', 5, 0, NULL);
INSERT INTO `queues` VALUES (277, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 00:18:44', '2025-06-17 00:18:44', 5, 0, NULL);
INSERT INTO `queues` VALUES (278, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 00:19:00', '2025-06-17 00:19:00', 5, 0, NULL);
INSERT INTO `queues` VALUES (279, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 00:19:40', '2025-06-17 00:19:40', 5, 0, NULL);
INSERT INTO `queues` VALUES (280, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 00:20:37', '2025-06-17 00:20:37', 5, 0, NULL);
INSERT INTO `queues` VALUES (281, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 00:21:40', '2025-06-17 00:21:40', 5, 0, NULL);
INSERT INTO `queues` VALUES (282, 'completed', 'sendVerifyEmailJob', '{\"userId\":1}', '2025-06-17 00:24:02', '2025-06-17 00:24:02', 5, 0, NULL);
INSERT INTO `queues` VALUES (283, 'completed', 'sendVerifyEmailJob', '{\"userId\":1}', '2025-06-17 00:24:25', '2025-06-17 00:24:25', 5, 0, NULL);
INSERT INTO `queues` VALUES (284, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 09:29:14', '2025-06-17 09:29:14', 5, 0, NULL);
INSERT INTO `queues` VALUES (285, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 09:29:56', '2025-06-17 09:29:56', 5, 0, NULL);
INSERT INTO `queues` VALUES (286, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 11:55:43', '2025-06-17 11:55:43', 5, 0, NULL);
INSERT INTO `queues` VALUES (287, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 11:57:01', '2025-06-17 11:57:01', 5, 0, NULL);
INSERT INTO `queues` VALUES (288, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 11:58:11', '2025-06-17 11:58:11', 5, 0, NULL);
INSERT INTO `queues` VALUES (289, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 12:01:47', '2025-06-17 12:01:47', 5, 0, NULL);
INSERT INTO `queues` VALUES (290, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 12:01:59', '2025-06-17 12:01:59', 5, 0, NULL);
INSERT INTO `queues` VALUES (291, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 12:05:23', '2025-06-17 12:05:23', 5, 0, NULL);
INSERT INTO `queues` VALUES (292, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 12:05:35', '2025-06-17 12:05:35', 5, 0, NULL);
INSERT INTO `queues` VALUES (293, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"forgot-password\"}', '2025-06-17 12:06:23', '2025-06-17 12:06:23', 5, 0, NULL);
INSERT INTO `queues` VALUES (294, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 12:07:35', '2025-06-17 12:07:35', 5, 0, NULL);
INSERT INTO `queues` VALUES (295, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 12:11:07', '2025-06-17 12:11:07', 5, 0, NULL);
INSERT INTO `queues` VALUES (296, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 12:12:45', '2025-06-17 12:12:45', 5, 0, NULL);
INSERT INTO `queues` VALUES (297, 'completed', 'sendVerifyEmailJob', '{\"userId\":181}', '2025-06-17 13:38:44', '2025-06-17 13:38:44', 5, 0, NULL);
INSERT INTO `queues` VALUES (298, 'completed', 'sendVerifyEmailJob', '{\"userId\":181,\"type\":\"reset-password\"}', '2025-06-17 13:43:19', '2025-06-17 13:43:19', 5, 0, NULL);
INSERT INTO `queues` VALUES (299, 'completed', 'sendVerifyEmailJob', '{\"userId\":182,\"type\":\"verify-email\"}', '2025-06-17 13:49:11', '2025-06-17 13:49:11', 5, 0, NULL);
INSERT INTO `queues` VALUES (300, 'completed', 'sendVerifyEmailJob', '{\"userId\":182,\"type\":\"reset-password\"}', '2025-06-17 13:52:00', '2025-06-17 13:52:00', 5, 0, NULL);
INSERT INTO `queues` VALUES (301, 'completed', 'sendVerifyEmailJob', '{\"userId\":182,\"type\":\"reset-password\"}', '2025-06-17 14:43:15', '2025-06-17 14:43:15', 5, 0, NULL);
INSERT INTO `queues` VALUES (302, 'completed', 'sendVerifyEmailJob', '{\"userId\":182,\"userEmail\":\"dagger241004abc@gmail.com\",\"type\":\"reset-password\"}', '2025-06-17 15:34:23', '2025-06-17 15:34:23', 5, 0, NULL);
INSERT INTO `queues` VALUES (303, 'completed', 'sendVerifyEmailJob', '{\"userId\":182,\"type\":\"reset-password\"}', '2025-06-17 15:55:14', '2025-06-17 15:55:14', 5, 0, NULL);
INSERT INTO `queues` VALUES (304, 'completed', 'sendVerifyEmailJob', '{\"userId\":182,\"type\":\"reset-password\"}', '2025-06-17 16:04:01', '2025-06-17 16:04:01', 5, 0, NULL);
INSERT INTO `queues` VALUES (305, 'completed', 'sendVerifyEmailJob', '{\"userId\":182,\"type\":\"reset-password\"}', '2025-06-17 16:21:05', '2025-06-17 16:21:05', 5, 0, NULL);
INSERT INTO `queues` VALUES (306, 'completed', 'sendVerifyEmailJob', '{\"userId\":183,\"type\":\"verify-email\"}', '2025-06-17 16:27:00', '2025-06-17 16:27:00', 5, 0, NULL);
INSERT INTO `queues` VALUES (307, 'completed', 'sendVerifyEmailJob', '{\"userId\":183,\"type\":\"reset-password\"}', '2025-06-17 16:27:32', '2025-06-17 16:27:32', 5, 0, NULL);

-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint(20) UNSIGNED NULL DEFAULT NULL,
  `title` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT NULL,
  `location` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bedrooms` int(11) NULL DEFAULT NULL,
  `amenities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rating` decimal(2, 1) NULL DEFAULT NULL,
  `reviews_count` int(11) NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` datetime NULL DEFAULT NULL,
  `image` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `category_id_fk`(`category_id`) USING BTREE,
  CONSTRAINT `category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES (1, 2, 'can ho hcm', 1230000.00, 'hcm', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-05-20 00:00:00', '2025-05-20 00:00:00', NULL);
INSERT INTO `rooms` VALUES (3, 2, 'can ho hanoi', 1230000.00, 'hcm', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-05-20 00:00:00', '2025-05-30 00:00:00', NULL);
INSERT INTO `rooms` VALUES (5, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);
INSERT INTO `rooms` VALUES (6, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);
INSERT INTO `rooms` VALUES (7, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);
INSERT INTO `rooms` VALUES (8, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);
INSERT INTO `rooms` VALUES (9, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);
INSERT INTO `rooms` VALUES (10, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);
INSERT INTO `rooms` VALUES (11, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);
INSERT INTO `rooms` VALUES (12, 2, 'can ho ha noi', 1230000.00, 'hanoi', 4, 'dieu hoa, may giat, khong chung chu', 3.0, 5, '2025-04-19 17:00:00', '2025-05-19 17:00:00', NULL);

-- ----------------------------
-- Table structure for sessions
-- ----------------------------
DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions`  (
  `sid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `expires_at` datetime NOT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp(),
  `updated_at` datetime NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sid`) USING BTREE,
  INDEX `sessions_expires_at_idx`(`expires_at`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sessions
-- ----------------------------
INSERT INTO `sessions` VALUES ('2c0e92d8-6885-4fcf-b544-6e2966b26d03', '{\"userId\":1}', '2025-06-07 20:31:26', '2025-05-31 20:31:26', '2025-06-07 19:11:46');
INSERT INTO `sessions` VALUES ('8692b36e-8bbe-4f36-b9e6-300cf3bcbc26', '{}', '2025-06-07 19:33:32', '2025-05-31 19:33:32', '2025-05-31 20:24:44');
INSERT INTO `sessions` VALUES ('a0e0c91a-6b40-465b-819b-33903d73a4ff', '{\"userId\":1}', '2025-06-14 22:31:17', '2025-06-07 22:31:17', '2025-06-12 00:39:47');
INSERT INTO `sessions` VALUES ('c8212016-571a-427e-a726-b7e12df73f76', '{\"userId\":183}', '2025-06-22 09:49:03', '2025-06-15 09:49:03', '2025-06-17 16:27:57');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `birthday` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `avatar` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `gender` enum('male','female','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `phone` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `rel_status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `bio` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `blocked_at` datetime NULL DEFAULT NULL,
  `created_at` datetime NULL DEFAULT current_timestamp(),
  `updated_at` datetime NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  `role` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `verified_at` datetime NULL DEFAULT current_timestamp(),
  `email_sent_at` datetime NULL DEFAULT NULL,
  `email_seen_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email_unique`(`email`) USING BTREE,
  UNIQUE INDEX `phone_unique`(`phone`) USING BTREE,
  UNIQUE INDEX `username_unique`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 184 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'hai dang ', 'haidang@gmail.com', '12345678', 'haidang', '2004-10-24', NULL, 'male', '0397546472', 'single', NULL, 'Ha Noi', NULL, '2025-05-24 20:11:41', '2025-06-17 00:24:29', 'editor', 'active', '2025-06-07 22:30:47', '2025-06-17 00:24:29', NULL);
INSERT INTO `users` VALUES (55, 'duong bach', 'bach@gmail.com', '12345678', 'bachd123', NULL, NULL, NULL, '02345678912', NULL, NULL, 'hanoi', NULL, '2025-05-28 08:18:10', '2025-06-05 21:42:47', 'editor', 'inactive', '2025-06-07 22:30:47', '2025-06-11 22:36:51', NULL);
INSERT INTO `users` VALUES (119, 'Dương Hải Đăng8367', 'dagge11r2241004abc@gmail.com', '12345678', 'dang8367', NULL, NULL, NULL, '0123454281', NULL, NULL, 'Thành Công Ba Đình Hà Nội', NULL, '2025-06-05 01:26:26', '2025-06-05 01:26:26', 'Editor', 'active', '2025-06-07 22:30:47', '2025-06-11 22:36:51', NULL);
INSERT INTO `users` VALUES (132, 'duong bao tram', 'tram@gmail.com', '12345678', 'tram123', NULL, NULL, NULL, '0127866789', NULL, NULL, 'Thành Công Ba Đình Hà Nội', NULL, '2025-06-05 15:49:47', '2025-06-05 21:45:04', 'editor', 'pending', '2025-06-07 22:30:47', '2025-06-11 22:36:51', NULL);
INSERT INTO `users` VALUES (183, 'Dương Hải Đăng', 'dagger241004abc@gmail.com', '1234567890', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-17 16:27:00', '2025-06-17 16:27:54', NULL, NULL, '2025-06-17 16:27:00', '2025-06-17 16:27:36', NULL);

SET FOREIGN_KEY_CHECKS = 1;
