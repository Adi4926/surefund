import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/blogData";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="section max-w-3xl">
      <Link
        href="/blog"
        className="mb-6 flex items-center gap-1 text-sm text-primary/50 hover:text-secondary"
      >
        <ChevronLeft size={16} /> Back to Blog
      </Link>

      <p className="text-xs font-medium uppercase tracking-wide text-secondary">
        {formatDate(post.date)} • By {post.author}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-primary md:text-4xl">{post.title}</h1>

      <div className="mt-8 space-y-4">
        {post.content.map((para, i) => (
          <p key={i} className="text-primary/70 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-gradient-hero p-8 text-center text-white">
        <h2 className="text-xl font-bold">Ready to apply?</h2>
        <p className="mt-2 text-white/70">
          Let our team help you find the right loan or card for your needs.
        </p>
        <Link href="/personal-loan" className="btn-accent mt-5 inline-flex">
          Explore Products
        </Link>
      </div>
    </main>
  );
}
