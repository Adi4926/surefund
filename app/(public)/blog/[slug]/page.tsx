import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowRight } from "lucide-react";
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
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 font-sans text-white">
      <main className="mx-auto max-w-3xl px-4 sm:px-6">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-yellow-400"
        >
          <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> 
          Back to Blog
        </Link>

        {/* Post Metadata */}
        <p className="text-xs font-semibold uppercase tracking-wider text-yellow-400">
          {formatDate(post.date)} • By {post.author}
        </p>

        {/* Post Title */}
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-5xl leading-tight">
          {post.title}
        </h1>

        {/* Blog Content Paragraphs */}
        <div className="mt-10 space-y-6">
          {post.content.map((para, i) => (
            <p key={i} className="text-lg leading-relaxed text-white/70">
              {para}
            </p>
          ))}
        </div>

        {/* Call to Action Box */}
        <div className="mt-16 relative overflow-hidden rounded-3xl border border-blue-500/20 bg-white/5 p-8 md:p-12 backdrop-blur-xl text-center shadow-[0_0_40px_rgba(59,130,246,0.15)]">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Ready to apply?</h2>
            <p className="text-white/70 max-w-md mx-auto mb-8">
              Let our team help you find the right loan or card for your needs.
            </p>
            <Link 
              href="/personal-loan" 
              className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
            >
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}