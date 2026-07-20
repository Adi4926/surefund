import Link from "next/link";
import { blogPosts } from "@/lib/blogData";
import { formatDate } from "@/lib/format";

export default function BlogListPage() {
  return (
    <main className="section">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-primary md:text-4xl">SureFund Blog</h1>
        <p className="mt-3 text-primary/60">
          Practical guidance on loans, credit scores, and personal finance.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="glass-card block p-6 transition-shadow hover:shadow-glow"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-secondary">
              {formatDate(post.date)}
            </p>
            <h2 className="mt-2 text-lg font-bold text-primary">{post.title}</h2>
            <p className="mt-2 text-sm text-primary/60">{post.excerpt}</p>
            <p className="mt-4 text-xs text-primary/40">By {post.author}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
