import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="flex justify-between">
          {title}
          {icon && <div className="">{icon}</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
