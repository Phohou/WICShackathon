import { NextResponse } from "next/server"

export async function GET() {
  // Simulate a delay to mimic backend processing
  await new Promise((resolve) => setTimeout(resolve, 2000))

  return NextResponse.json({ message: "Data loaded successfully" })
}

