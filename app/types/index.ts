export interface IVisitorData {
  id: string;
  timestamp: Date;
  app_name: string;
  ip_address: string;
  browser_os: string;
  location: string;
  page: string;
  referrer: string;
}

export interface IAnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  topPages: Array<{ page: string; visits: number }>;
  topReferrers: Array<{ referrer: string; visits: number }>;
}
