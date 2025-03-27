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
  totalVisits: number;
  uniqueVisitors: number;
  topPages: Array<{ page: string; visits: number }>;
  topReferrers: Array<{ referrer: string; visits: number }>;
}
