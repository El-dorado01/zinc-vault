// src/components/steam-game-portfolio.tsx
"use client";

import { useState, useEffect } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb";
import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Game } from "@/types";
import { fetchGames, saveGame, deleteGame as deleteAGame, addToSpecialList } from "@/lib/games/gameUtils";
import GameCard from "@/components/steam-game-portfolio/GameCard";
import Pagination from "@/components/steam-game-portfolio/Pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import GameForm from "@/components/steam-game-portfolio/GameForm";
import DeleteGameModal from "@/components/steam-game-portfolio/DeleteGameModal";
import AddGameModal from "@/components/steam-game-portfolio/AddGameModal"; 

const SteamGamePortfolio = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [totalGames, setTotalGames] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteGame, setDeleteGame] = useState<Game | null>(null);
  const [currentGame, setCurrentGame] = useState<Partial<Game>>({
    name: "",
    description: null,
    thumbnail: null,
    studio: "",
    problem: null,
    approach: null,
    tools: [],
    carousel_images: [],
  });

  // Fetch games
  useEffect(() => {
    const loadGames = async () => {
      const { games, total } = await fetchGames(currentPage, itemsPerPage);
      setGames(games);
      setTotalGames(total);
    };
    loadGames();
  }, [currentPage]);

  // Handle edit game
  const handleEditGame = (game: Game) => {
    setCurrentGame(game);
    setIsEditSheetOpen(true);
  };

  // Handle save game
  const handleSaveGame = async () => {
    if (!currentGame.name?.trim()) {
      toast.error("Game name is required");
      return;
    }

    setIsSaving(true);
    const success = await saveGame(currentGame);
    if (success) {
      const { games, total } = await fetchGames(currentPage, itemsPerPage);
      setGames(games);
      setTotalGames(total);
      setIsAddModalOpen(false);
      setIsEditSheetOpen(false);
      setCurrentGame({
        name: "",
        description: null,
        thumbnail: null,
        studio: "",
        problem: null,
        approach: null,
        tools: [],
        carousel_images: [],
      });
    }
    setIsSaving(false);
  };

  // Handle delete game
  const handleDeleteGame = async () => {
    if (!deleteGame) return;

    setIsDeleting(true);
    const success = await deleteAGame(deleteGame.id, deleteGame.thumbnail, deleteGame.carousel_images);
    if (success) {
      const { games, total } = await fetchGames(currentPage, itemsPerPage);
      setGames(games);
      setTotalGames(total);
      setIsDeleteModalOpen(false);
      setDeleteGame(null);
    }
    setIsDeleting(false);
  };

  // Handle add to special list
  const handleAddToSpecialList = async (gameId: string) => {
    await addToSpecialList(gameId);
  };

  // Pagination
  const totalPages = Math.ceil(totalGames / itemsPerPage);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <SidebarInset>
      <DashboardBreadcrumb />
      <div className="flex flex-1 flex-col gap-4 p-4 shadow-sm rounded-lg mx-5 bg-sidebar md:min-h-min">
        <Heading
          title="Steam Game Promotion - Portfolio"
          description="Manage your game portfolio. Add, edit, or delete games, and select up to 7 for the special carousel."
          classname="mb-4"
        />

        <div className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-10 space-y-10">
          <div className="flex justify-between items-center w-full">
            <h1 className="font-bold text-3xl">Case Studies</h1>
            <Button onClick={() => setIsAddModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" /> Add Game
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-4 w-full min-h-screen gap-2">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onEdit={handleEditGame}
                onDelete={(g) => {
                  setDeleteGame(g);
                  setIsDeleteModalOpen(true);
                }}
                onAddToSpecialList={handleAddToSpecialList}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <AddGameModal
        isOpen={isAddModalOpen}
        setIsOpen={setIsAddModalOpen}
        game={currentGame}
        setGame={setCurrentGame}
        onSave={handleSaveGame}
        isSaving={isSaving}
      />

      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent side="right" className="w-full sm:w-[540px] p-2">
          <SheetHeader>
            <SheetTitle className="text-lg">Edit Game</SheetTitle>
            <SheetDescription>
              Update game details. All fields are optional except the name.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="overflow-y-auto h-[calc(100vh-120px)]">
            <div className="p-4">
              <GameForm game={currentGame} setGame={setCurrentGame} isSaving={isSaving} />
            </div>
          </ScrollArea>
          <SheetFooter>
            <Button onClick={handleSaveGame} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  Saving
                </>
              ) : (
                "Save changes"
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <DeleteGameModal
        isOpen={isDeleteModalOpen}
        setIsOpen={setIsDeleteModalOpen}
        onDelete={handleDeleteGame}
        isDeleting={isDeleting}
      />
    </SidebarInset>
  );
};

export default SteamGamePortfolio;