-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "currentWordIndex" INTEGER NOT NULL DEFAULT 0,
    "isReferee" BOOLEAN NOT NULL DEFAULT false,
    "SocketID" TEXT NOT NULL,
    "wpm" INTEGER NOT NULL DEFAULT -1,
    "name" TEXT NOT NULL,
    "GameId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "Words" TEXT NOT NULL,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "isOver" BOOLEAN NOT NULL DEFAULT false,
    "StartTime" INTEGER NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_GameId_fkey" FOREIGN KEY ("GameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
