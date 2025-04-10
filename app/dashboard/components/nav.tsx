"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

import { logout, revalidateDashboardData } from "@/lib/actions";
import { LogOut, RefreshCw } from "lucide-react";
import { useActionState, useTransition } from "react";

export default function NavBar() {
  const [, logoutAction, isLogoutPending] = useActionState(logout, undefined);
  const [isRefreshPending, startRefreshTransition] = useTransition();

  const handleRefreshClick = () => {
    startRefreshTransition(async () => {
      try {
        await revalidateDashboardData();
        toast.success("Data updated successfully.");
      } catch (error) {
        toast.error(
          "Oops! Something went wrong fetching that data. Maybe try again later."
        );
        console.error("Error during refresh:", error);
      }
    });
  };

  return (
    <nav className="fixed w-full backdrop-blur-3xl z-50 h-16 px-2 sm:px-4">
      {(isRefreshPending || isLogoutPending) && (
        <div className="flex h-dvh w-full z-50 items-center justify-center absolute inset-0 bg-background/50">
          <div className="text-2xl font-semibold">
            {isRefreshPending ? "Refreshing data..." : "Logging out..."}
          </div>
        </div>
      )}
      <div className="m-auto py-3 flex items-end justify-between gap-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold grow">
          Metrytics Dashboard
        </h1>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={"outline"}
                className="cursor-pointer"
                onClick={handleRefreshClick}
              >
                <RefreshCw className={isRefreshPending ? "animate-spin" : ""} />
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
              <form action={logoutAction}>
                <Button
                  variant={"outline"}
                  className="cursor-pointer"
                  type="submit"
                  disabled={isLogoutPending} // Disable based on logout pending state
                >
                  <LogOut />
                  <div className="hidden md:block">Sign Out</div>
                </Button>
              </form>
            </TooltipTrigger>
            <TooltipContent className="md:hidden">
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </nav>
  );
}
