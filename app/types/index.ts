export interface IVisitorData {
  id: string;
  app_name: string;
  browser: string;
  city: string;
  country: string;
  ip_address: string;
  os: string;
  page: string;
  referrer: string;
  timestamp: Date;
}

export interface IAnalyticsSummary {
  totalVisitors: number;
  uniqueVisitors: number;
  totalEvents: number;
  topPages: IKeyVisits[];
  topReferrers: IKeyVisits[];
  countries: IKeyVisits[];
  cities: IKeyVisits[];
}

export interface IKeyVisits {
  key: string;
  visits: number;
  percent: number;
}

export interface IEventData {
  id: string;
  app_name: string;
  ip_address: string;
  timestamp: Date;
  event: string;
  description: string | null | undefined;
}
