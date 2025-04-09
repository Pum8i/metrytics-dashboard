import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TabTrigger,
} from "@/components/ui/tabs";
import { Activity, Users, View } from "lucide-react";
import { IEventData, IVisitorAggregatesData, IVisitorData } from "../../types";
import Events from "./events/events-tab";
import PageViews from "./views/views-tab";
import Visitors from "./visitors/visitors-tab";

export default function TabsDashboard({
  events,
  visitorAggregates,
  visitors,
}: {
  visitors: IVisitorData[];
  visitorAggregates: IVisitorAggregatesData;
  events: {
    allEvents: IEventData[];
    totalEvents: number;
  };
}) {
  return (
    <Card className="h-full pb-4">
      <Tabs defaultValue="page-views" className="h-full">
        <CardHeader>
          <TabsList className="h-full w-full">
            <TabsTrigger value="page-views" className="w-full cursor-pointer">
              <TabTrigger
                title="Page Views"
                icon={<View className="max-sm:hidden" />}
                value={visitorAggregates.pageViews}
              />
            </TabsTrigger>
            <TabsTrigger value="events" className="w-full cursor-pointer">
              <TabTrigger
                title="Events"
                icon={<Activity className="max-sm:hidden" />}
                value={events.totalEvents}
              />
            </TabsTrigger>{" "}
            <TabsTrigger value="visitors" className="w-full cursor-pointer">
              <TabTrigger
                title="Visitors"
                icon={<Users className="max-sm:hidden" />}
                value={visitorAggregates.uniqueVisitors}
              />
            </TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="h-full flex-1 overflow-auto">
          <TabsContent value="page-views" className="h-full flex-1">
            <PageViews visitors={visitorAggregates} />
          </TabsContent>
          <TabsContent value="events" className="h-full flex-1">
            <Events events={events.allEvents} />
          </TabsContent>{" "}
          <TabsContent value="visitors" className="h-full flex-1">
            <Visitors visitors={visitors} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
