"use client";

import { formatEnergy, config } from "@/lib/config";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface EnergyLabelProps {
  energyUsed: number;
}

export function EnergyLabel({ energyUsed }: EnergyLabelProps) {
  if (!config.showEnergyResponse) return null;

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <Dialog>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-1 text-xs text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-full transition-colors cursor-pointer">
                {formatEnergy(energyUsed)}
              </button>
            </DialogTrigger>
          </TooltipTrigger>

          <TooltipContent side="top" className="max-w-[280px] text-xs leading-relaxed">
            <p className="font-medium mb-1">Try clearer prompts:</p>
            <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
              <li>Role — "Act as a UX designer"</li>
              <li>Context — "For a mobile app"</li>
              <li>Specific — "Give 3 ideas"</li>
            </ul>
          </TooltipContent>

          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Write Better Prompts · Use Less Energy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-sm">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                <p className="text-xs text-amber-700 mb-0.5">This response used</p>
                <p className="text-lg font-semibold text-amber-800">{formatEnergy(energyUsed, "numeric")}</p>
                <p className="text-xs text-amber-600">{formatEnergy(energyUsed, "equivalent")}</p>
              </div>

              <p className="text-muted-foreground text-xs">
                Clearer prompts get better answers in fewer tokens — saving energy.
              </p>

              <div className="space-y-3">
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-xs mb-1">1. Add a role</p>
                  <p className="text-muted-foreground text-xs">
                    "Act as a UX designer and review this layout"
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-xs mb-1">2. Give context</p>
                  <p className="text-muted-foreground text-xs">
                    "For a mobile app used by students aged 16–22"
                  </p>
                </div>
                <div className="border rounded-lg p-3">
                  <p className="font-medium text-xs mb-1">3. Be specific</p>
                  <p className="text-muted-foreground text-xs">
                    "Give exactly 3 suggestions with short explanations"
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
}
