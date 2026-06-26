import { NextRequest, NextResponse } from "next/server";
import { preorderService } from "@/modules/preorder/preorder.service";
import { ERROR_MESSAGES } from "@/modules/preorder/preorder.constants";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const preorder = await preorderService.getById(id);
    return NextResponse.json(preorder);
  } catch (error) {
    if (error instanceof Error && error.message === ERROR_MESSAGES.NOT_FOUND) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: 404 }
      );
    }
    console.error(`GET /api/preorders/[id] error:`, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const body = await req.json();
    const preorder = await preorderService.update(id, body);
    return NextResponse.json(preorder);
  } catch (error) {
    if (error instanceof Error && error.message === ERROR_MESSAGES.NOT_FOUND) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: 404 }
      );
    }
    console.error(`PUT /api/preorders/[id] error:`, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params;
    const result = await preorderService.delete(id);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === ERROR_MESSAGES.NOT_FOUND) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOT_FOUND },
        { status: 404 }
      );
    }
    console.error(`DELETE /api/preorders/[id] error:`, error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.INTERNAL_ERROR },
      { status: 500 }
    );
  }
};