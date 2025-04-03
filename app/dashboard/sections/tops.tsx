import { IKeyVisits } from "@/app/types";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

export default function Tops({
  title,
  tops,
}: {
  title: string;
  tops: IKeyVisits[];
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <ul className="space-y-4">
          {tops.map((top, index) => (
            <li key={index} className="flex flex-col gap-2">
              <div className="flex w-full justify-between items-center gap-4">
                <OverflowTooltip text={top.key} />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{top.percent}%</TooltipTrigger>
                    <TooltipContent className="bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-4 shadow-sm">
                      <div className="flex justify-between items-center gap-8">
                        <span>Percent:</span>
                        <span>{top.percent}%</span>
                      </div>
                      <div className="flex justify-between items-center gap-8">
                        <span>Visits:</span>
                        <span>{top.visits}</span>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Progress
                value={top.percent}
                aria-label={`${top.key} progress - ${top.percent}%`}
              />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

interface OverflowTooltipProps {
  text: string;
}

function OverflowTooltip({ text }: OverflowTooltipProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsOverflowing(element.scrollWidth > element.clientWidth);
    }
  }, [text]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <p ref={textRef} className="truncate cursor-default">
            {text}
          </p>
        </TooltipTrigger>
        <TooltipContent
          className={`bg-card text-card-foreground flex flex-col gap-4 rounded-xl border p-4 shadow-sm z-10 ${
            !isOverflowing ? "hidden" : ""
          }`}
        >
          {text}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
