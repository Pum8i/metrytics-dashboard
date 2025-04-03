import { IVisitorData } from "@/app/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClientCardProps {
  visitor: IVisitorData;
}

function ClientCardItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center">
      <span className="min-w-28">{`${label}:`}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

export default function ClientCard({ visitor }: ClientCardProps) {
  const formattedDate = new Date(visitor.timestamp).toLocaleString();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>{visitor.ip_address}</div>
          <div>{formattedDate}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <ClientCardItem
            label={"Location"}
            value={`${visitor.city}/${visitor.country}`}
          />
          <ClientCardItem
            label={"Device"}
            value={`${visitor.browser}/${visitor.os}`}
          />
          <ClientCardItem label={"Page"} value={visitor.page} />
          <ClientCardItem label={"Referrer"} value={visitor.referrer} />
        </div>
      </CardContent>
    </Card>
  );
}
