-- DropForeignKey
ALTER TABLE `SaleProduct` DROP FOREIGN KEY `SaleProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `SaleProduct` DROP FOREIGN KEY `SaleProduct_saleId_fkey`;

-- DropIndex
DROP INDEX `SaleProduct_productId_fkey` ON `SaleProduct`;

-- DropIndex
DROP INDEX `SaleProduct_saleId_fkey` ON `SaleProduct`;

-- AddForeignKey
ALTER TABLE `SaleProduct` ADD CONSTRAINT `SaleProduct_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleProduct` ADD CONSTRAINT `SaleProduct_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
