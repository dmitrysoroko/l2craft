import { NextRequest, NextResponse } from "next/server";
import fsPromises from "fs/promises";
import path from "path";
import { initData } from "@/app/constants";

async function exists(f: string) {
  try {
    await fsPromises.stat(f);
    return true;
  } catch {
    return false;
  }
}

const filePath = path.join(process.cwd(), "src/app/data.json");

export const GET = async () => {
  const isFileExist = await exists(filePath);

  let data = initData;
  if (isFileExist) {
    data = JSON.parse(await fsPromises.readFile(filePath, "utf8"));
  } else {
    await fsPromises.writeFile(filePath, JSON.stringify(data), "utf8");
  }

  return new NextResponse(JSON.stringify(data), { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();

  await fsPromises.writeFile(filePath, JSON.stringify(data), "utf8");

  return new NextResponse(JSON.stringify(data), { status: 200 });
};
