-- CreateTable
CREATE TABLE "t_user" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER,
    "um" TEXT NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "department_code" TEXT,
    "mobile" TEXT,
    "department_three_code" TEXT,
    "department_four_code" TEXT,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpate_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_user_pkey" PRIMARY KEY ("id")
);
