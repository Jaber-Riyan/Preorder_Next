import { NextRequest, NextResponse } from "next/server";
import { preorderService } from "@/modules/preorder/preorder.service";
import { ERROR_MESSAGES } from "@/modules/preorder/preorder.constants";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const query: Record<string, unknown> = {};

    const tab = searchParams.get("tab");
    const sortField = searchParams.get("sortField");
    const sortDirection = searchParams.get("sortDirection");
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize");

    if (tab) query.tab = tab;
    if (sortField) query.sortField = sortField;
    if (sortDirection) query.sortDirection = sortDirection;
    if (page) query.page = page;
    if (pageSize) query.pageSize = pageSize;

    const result = await preorderService.list(query);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/preorders error:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const preorder = await preorderService.create(body);
    return NextResponse.json(preorder, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "Validation error") {
      return NextResponse.json(
        { error: "Validation failed" },
        { status: 400 }
      );
    }
    console.error("POST /api/preorders error:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
};