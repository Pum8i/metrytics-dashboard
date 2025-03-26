import { IVisitorData } from "../types";
import { v4 as uuidv4 } from "uuid";

function generateRandomIP() {
  const getRandomOctet = () => Math.floor(Math.random() * 256);

  // Generate four random octets (0-255)
  const octet1 = getRandomOctet();
  const octet2 = getRandomOctet();
  const octet3 = getRandomOctet();
  const octet4 = getRandomOctet();

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
}

export const generateMockVisitors = (
  count: number
): {
  visitors: IVisitorData[];
  totalVisitors: number;
  uniqueVisitors: number;
  pages: { page: string; visits: number }[];
  referrers: { referrer: string; visits: number }[];
} => {
  const browsers = ["Chrome", "Firefox", "Safari", "Edge", "Opera"];
  const os = ["Windows", "macOS", "iOS", "Android", "Linux"];
  const pages = ["/home", "/about", "/products", "/contact", "/blog"];
  const referrers = ["Google", "Facebook", "Twitter", "Direct", "Bing"];
  const countries = ["US", "UK", "Canada", "Germany", "France", "Japan"];
  const cities = ["New York", "London", "Toronto", "Berlin", "Paris", "Tokyo"];

  const allVisitors = Array.from({ length: count }, () => {
    const browser = browsers[Math.floor(Math.random() * browsers.length)];
    const operatingSystem = os[Math.floor(Math.random() * os.length)];
    const page = pages[Math.floor(Math.random() * pages.length)];
    const referrer = referrers[Math.floor(Math.random() * referrers.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];

    return {
      id: uuidv4(),
      app_name: "test app",
      ip_address: generateRandomIP(),
      timestamp: new Date(
        Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      ),
      location: `${city}/${country}`,
      city: city,
      country: country,
      browser_os: `${browser}/${operatingSystem}`,
      browser: browser,
      os: operatingSystem,
      page,
      referrer,
    };
  });

  const totalVisitors = allVisitors.length;

  const uniqueVisitors = new Set(allVisitors.map((v) => v.ip_address)).size;

  const _referrers = Array.from(
    allVisitors.reduce((map, visitor) => {
      map.set(visitor.referrer, (map.get(visitor.referrer) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([referrer, visits]) => ({ referrer, visits }));

  const _pages = Array.from(
    allVisitors.reduce((map, visitor) => {
      map.set(visitor.page, (map.get(visitor.page) || 0) + 1);
      return map;
    }, new Map<string, number>())
  ).map(([page, visits]) => ({ page, visits }));

  return {
    visitors: allVisitors,
    totalVisitors,
    uniqueVisitors,
    pages: _pages,
    referrers: _referrers,
  };
};
