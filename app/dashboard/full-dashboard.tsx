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
    <Tabs defaultValue="visitors" className="h-full pb-4">
      <Card className="h-full">
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
        <CardContent>
          <TabsContent value="visitors">
            <VisitorsTable visitors={visitors.slice(0, 10)} />
          </TabsContent>
          <TabsContent value="page-views">
            <PageViews summary={summary} />
          </TabsContent>
          <TabsContent value="events">
            <EventsTable events={events.slice(0, 10)} />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
}
