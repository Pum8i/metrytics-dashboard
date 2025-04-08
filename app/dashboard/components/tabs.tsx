import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabTrigger,
} from "@/components/ui/tabs";
import { Activity, Users, View } from "lucide-react";
import { IAnalyticsSummary, IEventData, IVisitorData } from "../../types";
import Events from "./events/events-tab";
import PageViews from "./views/views-tab";
import Visitors from "./visitors/visitors-tab";

export default function TabsDashboard({
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
      <Tabs defaultValue="visitors" className="h-full">
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
            <Visitors visitors={visitors} />
          </TabsContent>
          <TabsContent value="page-views" className="h-full flex-1">
            <PageViews summary={summary} />
          </TabsContent>
          <TabsContent value="events" className="h-full flex-1">
            <Events events={events} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
