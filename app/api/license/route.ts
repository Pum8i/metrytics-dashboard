import { promises as fs } from "fs";
import { NextResponse } from "next/server";
import path from "path";

/**
 * This API route serves the project's MIT license file.
 *
 * It reads the content of the `LICENSE` file from the project's root directory
 * and sends it as a plain text response.
 */
export async function GET(): Promise<NextResponse> {
  const licensePath = path.join(process.cwd(), "LICENSE");
  const fileContent = await fs.readFile(licensePath, "utf8");

  return new NextResponse(fileContent, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
