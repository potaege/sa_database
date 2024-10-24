/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spare_parts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spare_parts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "company_name" TEXT,
    "credit_limit" DOUBLE PRECISION NOT NULL,
    "address" TEXT NOT NULL,
    "tax_id" TEXT,
    "tel" TEXT NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Works" (
    "id" TEXT NOT NULL,
    "mail_date" TIMESTAMP(3) NOT NULL,
    "service_Date" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "customerID" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inWarranty" BOOLEAN NOT NULL,

    CONSTRAINT "Works_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quotation" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "contact_person" TEXT NOT NULL,
    "delivery_to" TEXT NOT NULL,
    "delivery_on" TIMESTAMP(3),
    "payment_term" TEXT NOT NULL,
    "workID" TEXT NOT NULL,
    "addDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoices" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "customerID" INTEGER NOT NULL,
    "workID" TEXT NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" INTEGER NOT NULL,
    "outstandingBalance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PO" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "workID" TEXT NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requests" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "sn" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "rated" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "warranty" BOOLEAN NOT NULL,
    "workID" TEXT NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Spare_parts_requests" (
    "id" SERIAL NOT NULL,
    "spare_parts_qty" INTEGER NOT NULL,
    "sparePartID" INTEGER NOT NULL,
    "requestID" INTEGER NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Spare_parts_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction_log" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "sparePartID" INTEGER NOT NULL,
    "userID" TEXT NOT NULL,
    "fromUserID" TEXT NOT NULL,
    "addedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Spare_parts_name_key" ON "Spare_parts"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Works_userID_key" ON "Works"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Works_customerID_key" ON "Works"("customerID");

-- CreateIndex
CREATE UNIQUE INDEX "Quotation_workID_key" ON "Quotation"("workID");

-- CreateIndex
CREATE UNIQUE INDEX "Invoices_workID_key" ON "Invoices"("workID");

-- CreateIndex
CREATE INDEX "Invoices_customerID_idx" ON "Invoices"("customerID");

-- CreateIndex
CREATE UNIQUE INDEX "PO_workID_key" ON "PO"("workID");

-- CreateIndex
CREATE INDEX "Requests_workID_idx" ON "Requests"("workID");

-- CreateIndex
CREATE UNIQUE INDEX "Spare_parts_requests_sparePartID_key" ON "Spare_parts_requests"("sparePartID");

-- CreateIndex
CREATE UNIQUE INDEX "Spare_parts_requests_requestID_key" ON "Spare_parts_requests"("requestID");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_log_sparePartID_key" ON "Transaction_log"("sparePartID");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_log_userID_key" ON "Transaction_log"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_log_fromUserID_key" ON "Transaction_log"("fromUserID");
