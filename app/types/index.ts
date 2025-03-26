export interface IVisitorData {
  id: string;
  app_name: string;
  browser_os: string;
  browser: string;
  city: string;
  country: string;
  ip_address: string;
  location: string;
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
