/**
 * Get the location information from the IP address.
 * Uses an external API - see https://ip-api.com/ for details.
 *
 */
export async function getLocationInfo(
  ipAddress: string
): Promise<{ city: string; country: string }> {
  const unknown = { city: "unknown", country: "unknown" };
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
      return unknown;
    }
    const respData = await resp.json();

    if (respData.status !== "success") {
      return unknown;
    }

    return {
      city: respData.city,
      country: respData.country,
    };
  } catch (error) {
    console.log("getLocationInfo ~ error:", error);
    return unknown;
  }
}
