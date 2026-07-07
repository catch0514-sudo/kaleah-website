import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/storage/database/supabase-client";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.trim();

        const client = getSupabaseClient();

        let dbQuery = client
            .from("news")
            .select("id, title, category, date, excerpt, image, tag_color")
            .eq("is_published", true)
            .order("created_at", { ascending: false });

        // 如果有搜索关键词，使用 ilike 模糊匹配 title 和 excerpt
        if (query) {
            dbQuery = dbQuery.or(`title.ilike.%${query}%,excerpt.ilike.%${query}%`);
        }

        const { data, error } = await dbQuery;

        if (error) {
            console.error("搜索新闻失败:", error);
            return NextResponse.json(
                { success: false, error: "搜索失败", data: [] },
                { status: 500 }
            );
        }

        // 格式化日期
        const formattedData = (data || []).map(item => ({
            ...item,
            date: item.date ? item.date.split("T")[0] : item.date,
        }));

        return NextResponse.json({
            success: true,
            data: formattedData,
            query: query || null,
        });
    } catch (error) {
        console.error("搜索新闻异常:", error);
        return NextResponse.json(
            { success: false, error: "服务器错误", data: [] },
            { status: 500 }
        );
    }
}
