-- CreateTable
CREATE TABLE "t_menu" (
    "id" SERIAL NOT NULL,
    "menu_name" TEXT NOT NULL,
    "parent_id" INTEGER,
    "icon" TEXT,
    "show_status" INTEGER NOT NULL,
    "menu_level" INTEGER,
    "menuUrl" TEXT,
    "path" TEXT,
    "create_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "udpate_time" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "t_menu_pkey" PRIMARY KEY ("id")
);
