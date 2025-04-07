import EventsTable from "@/app/dashboard/sections/events-table";
import VisitorsTable from "@/app/dashboard/sections/visitors-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabTrigger,
} from "@/components/ui/tabs";
import { Activity, Users, View } from "lucide-react";
import { IAnalyticsSummary, IEventData, IVisitorData } from "../types";
import PageViews from "./sections/page-views";

export default function FullDashboard({
  visitors,
  events,
  summary,
}: {
  visitors: IVisitorData[];
  events: IEventData[];
  summary: IAnalyticsSummary;
}) {
  return (
    <Card className="h-full pb-4">
      <Tabs defaultValue="visitors" className="h-full ">
        <CardHeader>
          <TabsList className="h-full w-full">
            <TabsTrigger value="visitors" className="w-full cursor-pointer">
              <TabTrigger
                title="Visitors"
                icon={Users}
                value={summary.uniqueVisitors}
              />
            </TabsTrigger>
            <TabsTrigger value="page-views" className="w-full cursor-pointer">
              <TabTrigger
                title="Page Views"
                icon={View}
                value={summary.pageViews}
              />
            </TabsTrigger>

            <TabsTrigger value="events" className="w-full cursor-pointer">
              <TabTrigger
                title="Events"
                icon={Activity}
                value={summary.totalEvents}
              />
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="h-full flex-1 overflow-auto">
          <TabsContent value="visitors" className="h-full flex-1">
            <VisitorsTable visitors={visitors.slice(0, 10)} />
          </TabsContent>
          <TabsContent value="page-views" className="h-full flex-1">
            <PageViews summary={summary} />
          </TabsContent>
          <TabsContent value="events" className="h-full flex-1">
            <EventsTable events={events.slice(0, 10)} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
