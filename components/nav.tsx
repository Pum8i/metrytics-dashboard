"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LogOut, RefreshCw } from "lucide-react";

interface NavBarProps {
  fetchData: () => void;
  loading: boolean;
  formAction: () => void;
  isPending: boolean;
}

export default function NavBar({
  fetchData,
  loading,
  formAction,
  isPending,
}: NavBarProps) {
  return (
    <nav className="fixed w-full backdrop-blur-3xl z-50 h-16 sm:px-4 px-2">
      <div className="m-auto py-3 flex items-end justify-between gap-4">
        <h1 className="text-3xl font-bold grow">Analytics Dashboard</h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={fetchData}
                disabled={loading}
              >
                <RefreshCw className={loading ? "animate-spin" : ""} />
                <div className="hidden md:block">Refresh Data</div>
              </Button>
            </TooltipTrigger>
            <TooltipContent className="md:hidden">
              <p>Refresh Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <form action={formAction}>
                <Button
                  variant={"outline"}
                  className="cursor-pointer"
                  type="submit"
                  disabled={isPending}
                >
                  <LogOut />
                  <div className="hidden md:block">Sign Out</div>
                </Button>
              </form>
            </TooltipTrigger>
            <TooltipContent className="md:hidden">
              <p>Refresh Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
}
