/*
 Navicat Premium Data Transfer

 Source Server         : TenTicker
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : facebook

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 05/02/2023 03:58:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for block
-- ----------------------------
DROP TABLE IF EXISTS `block`;
CREATE TABLE `block`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NULL DEFAULT NULL,
  `id_user_blocked` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of block
-- ----------------------------
INSERT INTO `block` VALUES (5, 46, 47);
INSERT INTO `block` VALUES (6, 48, 47);
INSERT INTO `block` VALUES (10, 52, 46);
INSERT INTO `block` VALUES (11, 46, 48);

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_post` int NOT NULL,
  `id_user_comment` int NOT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `state` int NULL DEFAULT NULL,
  `created` datetime(0) NULL DEFAULT NULL,
  `modified` datetime(0) NULL DEFAULT NULL,
  `is_blocked` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES (22, 49, 42, 'ahihi', NULL, NULL, '2023-01-29 13:48:48', '2023-01-29 13:48:48', NULL);
INSERT INTO `comment` VALUES (23, 54, 46, 'ahihi', NULL, NULL, '2023-01-29 19:31:23', '2023-01-29 19:31:23', NULL);
INSERT INTO `comment` VALUES (24, 54, 46, 'ahihi111', NULL, NULL, '2023-01-29 19:31:31', '2023-01-29 19:31:31', NULL);
INSERT INTO `comment` VALUES (25, 54, 47, 'ahihi111', NULL, NULL, '2023-01-29 19:41:41', '2023-01-29 19:41:41', NULL);

-- ----------------------------
-- Table structure for conversation
-- ----------------------------
DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user_1` int NULL DEFAULT NULL,
  `id_user_2` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of conversation
-- ----------------------------
INSERT INTO `conversation` VALUES (1, 51, 47);

-- ----------------------------
-- Table structure for devtoken
-- ----------------------------
DROP TABLE IF EXISTS `devtoken`;
CREATE TABLE `devtoken`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NULL DEFAULT NULL,
  `devtype` int NULL DEFAULT NULL,
  `devtoken` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of devtoken
-- ----------------------------
INSERT INTO `devtoken` VALUES (1, 51, 0, 'AB235G');
INSERT INTO `devtoken` VALUES (2, 51, 0, 'AB235G');
INSERT INTO `devtoken` VALUES (3, 47, 0, 'AB235G');
INSERT INTO `devtoken` VALUES (4, 47, 1, 'AB235G');

-- ----------------------------
-- Table structure for friend
-- ----------------------------
DROP TABLE IF EXISTS `friend`;
CREATE TABLE `friend`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id_friend` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friend
-- ----------------------------
INSERT INTO `friend` VALUES (19, '48', '47', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (20, '47', '48', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (25, '48', '46', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (26, '46', '48', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (29, '48', '49', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (30, '49', '48', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (31, '52', '48', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (32, '48', '52', '2023-02-02 00:00:00');
INSERT INTO `friend` VALUES (33, '47', '52', '2023-02-05 01:51:55');
INSERT INTO `friend` VALUES (34, '47', '51', '2023-02-05 01:52:41');
INSERT INTO `friend` VALUES (35, '47', '49', '2023-02-05 01:55:28');
INSERT INTO `friend` VALUES (36, '49', '47', '2023-02-05 01:55:28');
INSERT INTO `friend` VALUES (37, '55', '49', '2023-02-05 02:27:54');
INSERT INTO `friend` VALUES (38, '49', '55', '2023-02-05 02:28:01');
INSERT INTO `friend` VALUES (39, '54', '49', '2023-02-05 02:50:10');
INSERT INTO `friend` VALUES (40, '49', '54', '2023-02-05 02:50:29');

-- ----------------------------
-- Table structure for friend_request
-- ----------------------------
DROP TABLE IF EXISTS `friend_request`;
CREATE TABLE `friend_request`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id_user_request` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of friend_request
-- ----------------------------
INSERT INTO `friend_request` VALUES (15, '47', '48', '2023-02-05 01:27:34');
INSERT INTO `friend_request` VALUES (17, '47', '50', '2023-02-05 01:28:20');
INSERT INTO `friend_request` VALUES (18, '50', '51', '2023-02-05 01:28:29');
INSERT INTO `friend_request` VALUES (20, '48', '50', '2023-02-05 01:38:53');
INSERT INTO `friend_request` VALUES (21, '47', '55', '2023-02-05 02:48:02');
INSERT INTO `friend_request` VALUES (22, '53', '47', '2023-02-05 02:55:59');
INSERT INTO `friend_request` VALUES (27, '54', '47', '2023-02-05 03:04:38');

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `id_post` int NULL DEFAULT NULL,
  `link_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id_image`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 400 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of image
-- ----------------------------
INSERT INTO `image` VALUES (356, 51, 'https://haha.png');
INSERT INTO `image` VALUES (357, 51, 'https://haha.png');
INSERT INTO `image` VALUES (358, 51, 'https://haha.png');
INSERT INTO `image` VALUES (391, 54, 'https://haha.png');
INSERT INTO `image` VALUES (392, 54, 'https://haha.png');
INSERT INTO `image` VALUES (393, 54, 'https://haha.png');
INSERT INTO `image` VALUES (394, 55, 'https://haha.png');
INSERT INTO `image` VALUES (395, 55, 'https://haha.png');
INSERT INTO `image` VALUES (396, 55, 'https://haha.png');
INSERT INTO `image` VALUES (397, 56, 'https://haha.png');
INSERT INTO `image` VALUES (398, 56, 'https://haha.png');
INSERT INTO `image` VALUES (399, 56, 'https://haha.png');

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_conversation` int NULL DEFAULT NULL,
  `sender_id` int NULL DEFAULT NULL,
  `created` date NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `unread_user_1` int NULL DEFAULT NULL,
  `unread_user_2` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of message
-- ----------------------------

-- ----------------------------
-- Table structure for notification
-- ----------------------------
DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `object_id` int NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `group` int NULL DEFAULT NULL,
  `read_noti` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of notification
-- ----------------------------
INSERT INTO `notification` VALUES (1, 48, 'post', 2, 'Tin hot', '2023-02-04 14:35:02', 'hehe.png', 1, 0);
INSERT INTO `notification` VALUES (2, 48, 'video', 3, 'video hot', '2023-02-04 18:56:19', 'hihi.png', 1, 1);
INSERT INTO `notification` VALUES (3, 47, 'post', 2, 'Tin hottt', '2023-02-05 03:42:53', 'haha.png', 1, 1);

-- ----------------------------
-- Table structure for post
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `described` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `state` int NULL DEFAULT NULL,
  `created` datetime(0) NULL DEFAULT NULL,
  `modified` datetime(0) NULL DEFAULT NULL,
  `video` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `thumb` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `post_like` int NULL DEFAULT NULL,
  `post_comment` int NULL DEFAULT NULL,
  `banned` int NULL DEFAULT NULL,
  `can_comment` int NULL DEFAULT NULL,
  `can_edit` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of post
-- ----------------------------
INSERT INTO `post` VALUES (51, 47, 'hehehe', 1, '2023-01-29 18:23:33', '2023-01-29 18:23:33', NULL, NULL, 'haha', 0, 0, 0, 1, NULL);
INSERT INTO `post` VALUES (52, 46, 'Sửa chữa linh', 1, '2023-01-29 18:25:07', '2023-01-29 18:25:07', 'hehe', NULL, 'haha', 0, 0, 0, 1, NULL);
INSERT INTO `post` VALUES (54, 46, 'Sửa chữa nhà gỗ', 1, '2023-01-29 19:23:48', '2023-01-29 19:23:48', NULL, NULL, 'haha', 0, 0, 0, 1, NULL);
INSERT INTO `post` VALUES (55, 47, 'sữa chua', 1, '2023-02-01 20:07:04', '2023-02-01 20:07:04', 'hi', NULL, 'haha', 0, 0, 0, 1, 1);
INSERT INTO `post` VALUES (56, 47, 'nhà sửa chữa', 1, '2023-02-01 20:08:09', '2023-02-01 20:08:09', NULL, NULL, 'haha', 0, 0, 0, 1, 1);
INSERT INTO `post` VALUES (57, 48, 'Nhà sửa chữa', 1, '2023-02-02 21:11:23', '2023-02-02 21:11:23', 'hehe', 'hihi', 'haha', 0, 0, 0, 1, 1);

-- ----------------------------
-- Table structure for post_like
-- ----------------------------
DROP TABLE IF EXISTS `post_like`;
CREATE TABLE `post_like`  (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_post` int NOT NULL,
  `id_user` int NOT NULL,
  `date_like` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 36 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of post_like
-- ----------------------------

-- ----------------------------
-- Table structure for report_post
-- ----------------------------
DROP TABLE IF EXISTS `report_post`;
CREATE TABLE `report_post`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_post` int NOT NULL,
  `subject` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `id_user_report` int NOT NULL,
  `date_report` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of report_post
-- ----------------------------
INSERT INTO `report_post` VALUES (1, 1, 'subject report 1', 'abc', 1, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (2, 1, 'subject report 2', 'i hate you', 2, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (3, 2, 'subject report 3', 'a', 4, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (4, 2, 'subject report 4', 'a', 1, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (5, 2, 'subject report 5', 'a', 6, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (6, 2, 'subject report 6', 'a', 11, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (7, 4, 'subject report 7', 'abc', 10, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (8, 17, 'subject report 8', 'I hate this post', 29, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (9, 17, 'subject report 9', 'I hate this post', 29, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (12, 17, 'subject report 10', 'I hate this post', 29, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (13, 2, 'subject report 11', 'test report', 29, '2022-11-16 00:04:42');
INSERT INTO `report_post` VALUES (14, 2, 'subject report 12', 'test report', 29, '2022-11-27 07:47:59');
INSERT INTO `report_post` VALUES (15, 2, 'subject report 13', 'test report', 29, '2022-11-27 07:48:35');
INSERT INTO `report_post` VALUES (18, 31, 'subject report 13', 'test report', 29, '2022-11-27 08:53:18');
INSERT INTO `report_post` VALUES (19, 50, 'hình ảnh không hợp lệ', 'ăn thịt chó', 42, '2023-01-28 17:03:19');
INSERT INTO `report_post` VALUES (20, 54, 'hình ảnh không hợp lệ', 'ăn thịt chó', 46, '2023-01-29 19:23:59');
INSERT INTO `report_post` VALUES (21, 54, 'hình ảnh không hợp lệ', 'ăn thịt chó', 46, '2023-01-29 19:24:58');
INSERT INTO `report_post` VALUES (22, 54, 'hình ảnh không hợp lệ', 'ăn thịt chó', 47, '2023-01-29 19:32:13');

-- ----------------------------
-- Table structure for search
-- ----------------------------
DROP TABLE IF EXISTS `search`;
CREATE TABLE `search`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NULL DEFAULT NULL,
  `keyword` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of search
-- ----------------------------

-- ----------------------------
-- Table structure for setting
-- ----------------------------
DROP TABLE IF EXISTS `setting`;
CREATE TABLE `setting`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NULL DEFAULT NULL,
  `like_comment` int NULL DEFAULT NULL,
  `from_friends` int NULL DEFAULT NULL,
  `requested_friend` int NULL DEFAULT NULL,
  `suggested_friend` int NULL DEFAULT NULL,
  `birthday` int NULL DEFAULT NULL,
  `video` int NULL DEFAULT NULL,
  `report` int NULL DEFAULT NULL,
  `sound_on` int NULL DEFAULT NULL,
  `notification_on` int NULL DEFAULT NULL,
  `vibrant_on` int NULL DEFAULT NULL,
  `led_on` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of setting
-- ----------------------------
INSERT INTO `setting` VALUES (1, 48, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1);
INSERT INTO `setting` VALUES (2, 51, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO `setting` VALUES (3, 52, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO `setting` VALUES (4, 48, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO `setting` VALUES (5, 51, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO `setting` VALUES (6, 47, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO `setting` VALUES (7, 47, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);
INSERT INTO `setting` VALUES (8, 47, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

-- ----------------------------
-- Table structure for token
-- ----------------------------
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token`  (
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of token
-- ----------------------------
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOm51bGwsIlNEVCI6IjA4MTk4NDExMzgiLCJpYXQiOjE2NzQ0OTAyMDMsImV4cCI6MTY3NDU3NjYwM30.yu9zqo2OMpzrkJdn3a9YN7iGr6DBY-MV4MzsLK49EVc');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOm51bGwsIlNEVCI6IjA4MTk4NDExMzgiLCJpYXQiOjE2NzQ0OTAyNDMsImV4cCI6MTY3NDU3NjY0M30.t6qXeBA_AWe2NxAZC5N2HwPWWQfqz8EQ4sBNkHsl2gA');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6bnVsbCwiZW1haWwiOm51bGwsIlNEVCI6IjA4MTk4NDExMzgiLCJkZXZpY2VJRCI6ImFiY3h5eiIsImlhdCI6MTY3NDQ5MjQwMiwiZXhwIjoxNjc0NTc4ODAyfQ.ePdg516xBOvKBjXLb6ovArfwwmsgLwhCbWYFjihrlmI');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkyNDQxLCJleHAiOjE2NzQ1Nzg4NDF9.0tZQXAi2h7jcfsS8hwBsMrkI2OWD-u4WaohPSA994VA');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkyNDU0LCJleHAiOjE2NzQ1Nzg4NTR9.Ile-MaGk7NmjfhQbwKktZ98aHySVyt2x3wVg5Z2BQIw');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkyNDU4LCJleHAiOjE2NzQ1Nzg4NTh9.ckFyyxwRCMXRh3V6svQfQeOJnnWTkWiLbpVc9RN_OQ4');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkzMDIzLCJleHAiOjE2NzQ1Nzk0MjN9.3SGwWMbLVxqYu88CB1hSvJyJf1iCVThOY-Xu-kTIQuA');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkzMDM5LCJleHAiOjE2NzQ1Nzk0Mzl9.i0V2FAhpakLRFEjGgwktZaXgmmhXWDJwgE2-y0WJsRI');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkzMTA4LCJleHAiOjE2NzQ1Nzk1MDh9.0YeLOSL-NpXdS2XhnzizcsJnRPgdNff1C25J8JmgkJM');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkzMTE4LCJleHAiOjE2NzQ1Nzk1MTh9.9kk2RoXWmIzszgyQKWYbEl3JG5sTClpRej4NoI1jDkA');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkzMTUxLCJleHAiOjE2NzQ1Nzk1NTF9.mZUpfaxvYzvVuPJ9d46_qusCvHEvE3ec4Z6unUxjPpA');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYWJjeHl6IiwiaWF0IjoxNjc0NDkzMjAwLCJleHAiOjE2NzQ1Nzk2MDB9.wYjzfKOHkNR-0foA3QKdPlJWoG21ltun0rpbbce37ig');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiIiwiaWF0IjoxNjc0NDkzNDM4LCJleHAiOjE2NzQ1Nzk4Mzh9.4d7v1gcZgHdz6XoBxBjXLeDMc3SEiHRk1sOMnsf4LzI');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiIiwiaWF0IjoxNjc0NDkzNDQ5LCJleHAiOjE2NzQ1Nzk4NDl9.PSypvjHXB2ozumoQnU5GzWMVYAitkaYSzlBVwZi66ZM');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ0OTM1MTcsImV4cCI6MTY3NDU3OTkxN30.OAp8EBbng_Bw3AyrSznVK4tYYPZCEjbYB1kRwINRj5g');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ0OTM1MzcsImV4cCI6MTY3NDU3OTkzN30.hKfWvObXJeO2lHFu1e9TUA3OsG5BNJ_tDPdwgj81zs4');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ2MjY3MzksImV4cCI6MTY3NDcxMzEzOX0.dL-uUuyoFMjguU19VsJ8LLDaI29BccM3CUo-xhIx5as');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ3NTY4NTgsImV4cCI6MTY3NDg0MzI1OH0.k4K0cygoyAzkCF-n4qLr5rmKfjR365YT_4zVaYcwTnY');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ4MTk1MjMsImV4cCI6MTY3NDkwNTkyM30.vK_DRdUy194L4hgv-Jmrv2EwNo0LHDnP_-OYJ_Tbt5Y');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ4NDI5NDEsImV4cCI6MTY3NDkyOTM0MX0.kcF8kdUtZVOaVimGQUTLw7NlTLd3jdrJ2z8DCkF6B4g');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDIsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ5NzQ4NzIsImV4cCI6MTY3NTA2MTI3Mn0.h4qwJAQ3R_8dA0d7HSDuTnhgBOUTzOxif3t_DdZ_Qfc');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImRldmljZUlEIjoiYW5kcm9pZDEiLCJpYXQiOjE2NzQ5ODI4MzAsImV4cCI6MTY3NTA2OTIzMH0.NA2vfzRtQWmXJpnqExqxfj7FeOHh8cuqbzKLxdASYcE');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5ODI4OTksImV4cCI6MTY3NTA2OTI5OX0.PLxi-DtC9ASBiotKewVZ_uYq-VNmIiQOrdRbPkS46Vg');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5ODgwNjksImV4cCI6MTY3NTA3NDQ2OX0.GAGUJBTzyzTjg0ZAkbGyxGTs0beU4XncYO9lC80Y_p4');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDUsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5ODgzNDQsImV4cCI6MTY3NTA3NDc0NH0.QUepqr1ka7aPCvLcz6ItY3T6QxcDLfwCCO5nFT30D1w');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5ODg1NTUsImV4cCI6MTY3NTA3NDk1NX0.Ow0Dn_esvJfeCoU57MRvs1gJ5ukxfmPuIbxa6mp1pPY');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5OTUyOTAsImV4cCI6MTY3NTA4MTY5MH0.uGE2dADSZOt48i2Fj2lqnAL3FBwXgaqhAJa1LCZMFZk');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5OTUzMjMsImV4cCI6MTY3NTA4MTcyM30.zzDJZv84H60N6g4DCIJ8K_1cKPxgjmKEpEiO0CJ8jjg');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5OTU1MDEsImV4cCI6MTY3NTA4MTkwMX0.Jg6Vv9fq7RQUrZjfHcYtTL1Z21DdEuKAJ80FLCpMU6E');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUyNDI2MDQsImV4cCI6MTY3NTMyOTAwNH0.pHWBi8uiwlKDrkEy3jqNeJi1SOIUCmOoqyOEJNr2l8o');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzMzc1ODYsImV4cCI6MTY3NTQyMzk4Nn0.pYxjkMfssWr6o9JyYmgitHTAfU4OX8ZzUKmwBfkxGQo');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzNDQzMDYsImV4cCI6MTY3NTQzMDcwNn0.kKRlg3IwhjS1pIWSIScvvg8x_rVkleOF_Q9bamh3oJo');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzNDgxMjgsImV4cCI6MTY3NTQzNDUyOH0.h2A56TVpw39A6T23G6a-sv5i4AKp-Oya_7qBuB_36GY');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzNDgyMzYsImV4cCI6MTY3NTQzNDYzNn0.E5iTChYfnP43cxzEWIa2vsEE_ExKkKbzvY981IrDDjg');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzNDgzMDEsImV4cCI6MTY3NTQzNDcwMX0.vDMuvWTrXERjlE8LRBE3BNS1FPfAn5KSUS86Bfz0rZA');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzNDg0MTAsImV4cCI6MTY3NTQzNDgxMH0.qi3jJSsqat7laKUpNUyJalo9vlCmuiVSXC8vPVBOjMU');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU0MzczMzksImV4cCI6MTY3NTUyMzczOX0.r-RztPOH_a3mOpfjXqBs1FV0iOYvzB3DoczoEFd4LRY');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU0Mzc3NzQsImV4cCI6MTY3NTUyNDE3NH0.umYpWwWMavQN8o_2I42TEkWaaXbSI5ugbqZQpBgfYC8');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MTU2MzgsImV4cCI6MTY3NTYwMjAzOH0.zaNAjGUPzKBKCpXDhgw-6pIoHSkedJppBKKx8FQZdVI');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MTcwMjksImV4cCI6MTY3NTYwMzQyOX0.gb4yT6HMzHRGI2_BUaXsIs_vulN-RGcopCFH7Pe3WKM');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MjU1MTgsImV4cCI6MTY3NTYxMTkxOH0.lTVLiJLPjZRoPfA4ZHHlARQGShGJVMmrcJ6xcnateaI');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MzI1MDksImV4cCI6MTY3NTYxODkwOX0.gXYxNCXnn9b4rlpXx2sjb0uWKuRSLqItsk7pFutGDnM');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MzgwNjEsImV4cCI6MTY3NTYyNDQ2MX0.4d-NoNtCgnQk972NrqUfXx_Kb0XOgD3apQfD8iLQYVA');
INSERT INTO `token` VALUES ('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MzgwODAsImV4cCI6MTY3NTYyNDQ4MH0.GQT0TsB4TxzccO2j-SxpBsvlajshG2t50XedPCMCo4k');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `SDT` varchar(14) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `online` int NULL DEFAULT NULL,
  `uuid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `isVerified` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `cover_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `link` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `country` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created` datetime(0) NULL DEFAULT NULL,
  `active` int NULL DEFAULT NULL,
  PRIMARY KEY (`id_user`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 52 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (46, 'khiem1', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664202', 'https://hehe.com/hihi.png', 1, 'hehe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDYsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzQ5OTUzMjMsImV4cCI6MTY3NTA4MTcyM30.zzDJZv84H60N6g4DCIJ8K_1cKPxgjmKEpEiO0CJ8jjg', '1', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05 00:23:39', 1);
INSERT INTO `user` VALUES (47, 'linhkeoo', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664201', 'hotboy.png', 1, 'hehe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDcsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MzgwODAsImV4cCI6MTY3NTYyNDQ4MH0.GQT0TsB4TxzccO2j-SxpBsvlajshG2t50XedPCMCo4k', '0', 'goodboizz', 'hihi.png', 'https://www.tiktok.com/@morgan23l', '173 Linh Nam, Ha Noi', 'Ha Noi', 'Lào', '2023-02-05 00:23:36', 1);
INSERT INTO `user` VALUES (48, 'trienkeo', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664203', 'hotboy.png', 1, 'hehe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MTcwMjksImV4cCI6MTY3NTYwMzQyOX0.gb4yT6HMzHRGI2_BUaXsIs_vulN-RGcopCFH7Pe3WKM', '1', 'trap boy', 'hihi.png', 'hacker.vn', '23 Linh Nam, Ha Noi', 'Ha Noi', 'Viet Nam', '2023-02-05 00:23:33', 1);
INSERT INTO `user` VALUES (49, 'tungua', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664204', 'https://hehe.com/hihi.png', 1, 'hehe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDksImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzNDgxMjgsImV4cCI6MTY3NTQzNDUyOH0.h2A56TVpw39A6T23G6a-sv5i4AKp-Oya_7qBuB_36GY', '1', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05 00:23:31', 1);
INSERT INTO `user` VALUES (50, 'minhthanh', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664205', 'https://hehe.com/hihi.png', 1, 'hehe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzUzNDgzMDEsImV4cCI6MTY3NTQzNDcwMX0.vDMuvWTrXERjlE8LRBE3BNS1FPfAn5KSUS86Bfz0rZA', '1', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05 00:23:28', 1);
INSERT INTO `user` VALUES (51, 'linhken', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664206', NULL, 1, 'hehe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MjU1MTgsImV4cCI6MTY3NTYxMTkxOH0.lTVLiJLPjZRoPfA4ZHHlARQGShGJVMmrcJ6xcnateaI', '1', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05 00:23:25', 1);
INSERT INTO `user` VALUES (52, 'trienchieu', NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664207', 'https://hehe.com/hihi.png', 1, 'hehe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTIsImRldmljZUlEIjoiYW5kcm9pZDIiLCJpYXQiOjE2NzU1MTU2MzgsImV4cCI6MTY3NTYwMjAzOH0.zaNAjGUPzKBKCpXDhgw-6pIoHSkedJppBKKx8FQZdVI', '0', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05 00:23:21', 1);
INSERT INTO `user` VALUES (53, NULL, NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664208', NULL, 0, 'hehe', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-04 20:12:18', 1);
INSERT INTO `user` VALUES (54, NULL, NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664209', NULL, 0, 'hehe', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05 00:23:02', 1);
INSERT INTO `user` VALUES (55, NULL, NULL, 'e10adc3949ba59abbe56e057f20f883e', NULL, '0936664210', NULL, 0, 'hehe', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL, '2023-02-05 02:21:12', 1);

-- ----------------------------
-- Table structure for verify
-- ----------------------------
DROP TABLE IF EXISTS `verify`;
CREATE TABLE `verify`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `time_get_code` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of verify
-- ----------------------------
INSERT INTO `verify` VALUES (30, '0942188750', 'GYR4W4', '2023-01-27 01:13:19');
INSERT INTO `verify` VALUES (34, '0936664202', 'a1e49A', '2023-01-29 17:45:44');
INSERT INTO `verify` VALUES (35, '0936664201', 'FA3317', NULL);
INSERT INTO `verify` VALUES (36, '0936664203', '194c36', '2023-02-02 20:25:29');
INSERT INTO `verify` VALUES (37, '0936664204', 'Fe65ba', '2023-02-02 21:28:29');
INSERT INTO `verify` VALUES (38, '0936664205', 'bcC19F', '2023-02-02 21:31:59');
INSERT INTO `verify` VALUES (39, '0936664206', '148384', '2023-02-04 20:00:53');
INSERT INTO `verify` VALUES (40, '0936664207', 'fF3eF2', NULL);
INSERT INTO `verify` VALUES (41, '0936664208', 'A047CF', NULL);
INSERT INTO `verify` VALUES (42, '0936664209', '983394', NULL);
INSERT INTO `verify` VALUES (43, '0936664210', '35182E', NULL);

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `version` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of version
-- ----------------------------
INSERT INTO `version` VALUES (1, '1.1.3');

SET FOREIGN_KEY_CHECKS = 1;
