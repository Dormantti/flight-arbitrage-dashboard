import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const title = "航价智采 AirPrice Intelligence｜AI 机票采购决策平台";
  const description = "AI 驱动的机票采购时机预测与成本优化平台，为 OTA、商旅平台和票务采购团队提供价格趋势、降价概率、风险与预计节省。";

  return {
    metadataBase,
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_CN",
      siteName: "航价智采 AirPrice Intelligence",
      images: [{ url: "/og.png", width: 1728, height: 909, alt: "航价智采 AI 机票采购决策平台" }],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
