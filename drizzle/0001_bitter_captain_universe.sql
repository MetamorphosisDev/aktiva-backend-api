CREATE TABLE `bookmarks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`post_id` int NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `bookmarks_id` PRIMARY KEY(`id`),
	CONSTRAINT `bookmarks_user_id_post_id_unique` UNIQUE(`user_id`,`post_id`)
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(100) NOT NULL,
	`category_name` varchar(100) NOT NULL,
	`category_description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`post_id` int NOT NULL,
	`comment` text NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `post_tags` (
	`post_id` int NOT NULL,
	`tag_id` int NOT NULL,
	CONSTRAINT `post_tags_post_id_tag_id_pk` PRIMARY KEY(`post_id`,`tag_id`)
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` int NOT NULL,
	`category_id` int NOT NULL,
	`slug` varchar(200) NOT NULL,
	`title` varchar(200) NOT NULL,
	`content` text NOT NULL,
	`summary` text,
	`cover_image` varchar(500),
	`images` text,
	`source` varchar(255),
	`location` varchar(200),
	`status` enum('draft','published') NOT NULL DEFAULT 'draft',
	`view_count` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tag_name` varchar(50) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`tag_description` text,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(150) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `name` varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `phone_number` varchar(20);--> statement-breakpoint
ALTER TABLE `bookmarks` ADD CONSTRAINT `bookmarks_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `bookmarks` ADD CONSTRAINT `bookmarks_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_tags` ADD CONSTRAINT `post_tags_post_id_posts_id_fk` FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `post_tags` ADD CONSTRAINT `post_tags_tag_id_tags_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `posts` ADD CONSTRAINT `posts_category_id_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `username`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `role`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `class_name`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `phone`;