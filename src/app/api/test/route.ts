import { prisma } from "@/app/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const users = await prisma.search_item.findMany();
  return new NextResponse(JSON.stringify(users), { status: 200 });
};

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const users = await prisma.stat_item.findMany({
    where: {
      time: {
        lte: data.toDate,
        gte: data.fromDate,
      },
      name: data.name,
      type: data.type,
    },
    orderBy: {
      time: "asc",
    },
  });
  // const result = await conn.query("SELECT * FROM stat_item WHERE name LIKE $1 AND time >= $2 AND time < $3 AND type = $4" ORDER BY time;, [data.name, data.fromDate, data.toDate, data.type]);

  return new NextResponse(JSON.stringify(users), { status: 200 });
};
