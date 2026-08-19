import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blogData";

const BASE_URL = "https://www.surefund.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/about",
    "/services",
    "/personal-loan",
    "/business-loan",
    "/credit-card",
    "/lap",
    "/emi-calculator",
    "/faq",
    "/contact",
    "/careers",
    "/blog",
    "/privacy-policy",
    "/terms-conditions",
    "/disclaimer",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1.0 : 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}