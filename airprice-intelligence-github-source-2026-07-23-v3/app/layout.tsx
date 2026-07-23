import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "航价智采 AirPrice Intelligence｜全航班机票采购决策平台";
  const description = "中英双语的 AI 机票采购决策平台，支持查询 data.xlsx 中 99 个航班号的未来预期、价格趋势、风险与预计节省。 Bilingual all-flight airfare procurement intelligence.";

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_CN",
      alternateLocale: ["en_US"],
      siteName: "航价智采 AirPrice Intelligence",
      images: [{ url: "/og.png", width: 1728, height: 909, alt: "航价智采 AI 机票采购决策平台" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
