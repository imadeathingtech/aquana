CREATE TABLE `aquana`.`plants` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `description` LONGTEXT NULL,
  `image` VARCHAR(45) NULL,
  `last_watered` DATETIME NULL,
  `last_fertilized` DATETIME NULL,
  `days_between_watering` INT NULL,
  `days_between_fertilizing` INT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `aquana`.`subscribers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `endpoint` LONGTEXT NULL,
  `expirationTime` VARCHAR(45) NULL,
  `p256dh` LONGTEXT NULL,
  `auth` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
