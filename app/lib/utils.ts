/**
 * Get the location information from the IP address.
 * Uses an external API - see https://ip-api.com/ for details.
 *
 * @param {string} ipAddress - The IP address to get location information for.
 * @returns {Promise<string>} - A promise that resolves to a string containing the city and country.
 */
export async function getLocationInfo(ipAddress: string): Promise<string> {
  try {
    const resp = await fetch(
      `http://ip-api.com/json/${ipAddress}?fields=status,message,country,countryCode,regionName,city`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!resp.ok) {
      return "unknown";
    }
    const respData = await resp.json();

    if (respData.status !== "success") {
      return "unknown";
    }

    return `${respData.city}/${respData.country}`;
  } catch (error) {
    console.log("getLocationInfo ~ error:", error);
    return "unknown";
  }
}

/**
 * Get browser information from the user agent string.
 *
 * @param {string} userAgent - The user agent string to parse.
 */
export function getBrowserInfo(userAgent: string) {
  let browserName = "Unknown";
  let browserVersion = "Unknown";
  let osName = "Unknown";

  if (userAgent.includes("Firefox")) {
    browserName = "Firefox";
    browserVersion = userAgent.match(/Firefox\/([0-9\.]+)/)?.[1] || "Unknown";
  } else if (userAgent.includes("Chrome")) {
    browserName = "Chrome";
    browserVersion = userAgent.match(/Chrome\/([0-9\.]+)/)?.[1] || "Unknown";
  } else if (userAgent.includes("Safari")) {
    browserName = "Safari";
    browserVersion = userAgent.match(/Version\/([0-9\.]+)/)?.[1] || "Unknown";
  } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    browserName = "Internet Explorer";
    browserVersion = userAgent.match(/(MSIE |rv:)([0-9\.]+)/)?.[2] || "Unknown";
  }

  if (userAgent.includes("Windows NT")) {
    osName = "Windows";
  } else if (userAgent.includes("Mac OS X")) {
    osName = "Mac OS";
  } else if (userAgent.includes("Linux")) {
    osName = "Linux";
  } else if (userAgent.includes("Android")) {
    osName = "Android";
  } else if (userAgent.includes("iPhone") || userAgent.includes("iPad")) {
    osName = "iOS";
  }

  return { browserName, browserVersion, osName };
}
