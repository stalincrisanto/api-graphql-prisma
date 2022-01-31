-- CreateTable
CREATE TABLE "User" (
    "idUser" SERIAL NOT NULL,
    "emailUser" TEXT NOT NULL,
    "nameUser" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Post" (
    "idPost" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "authorId" INTEGER,
    "idCategory" INTEGER NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("idPost")
);

-- CreateTable
CREATE TABLE "Category" (
    "idCategory" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("idCategory")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailUser_key" ON "User"("emailUser");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("idUser") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "Category"("idCategory") ON DELETE RESTRICT ON UPDATE CASCADE;
