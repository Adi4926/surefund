"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blogData";
import { formatDate } from "@/lib/format";

export default function BlogListPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-20 font-sans text-white">
      
      {/* --- HEADER SECTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mx-auto mb-16 max-w-2xl px-4 text-center sm:px-6 lg:px-8"
      >
        <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-semibold text-yellow-400 backdrop-blur-xl">
          Insights & Guides
        </span>
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          SureFund <span className="text-blue-400">Blog</span>
        </h1>
        <p className="text-lg leading-relaxed text-white/60">
          Practical guidance on loans, credit scores, and personal finance.
        </p>
      </motion.div>

      {/* --- BLOG GRID SECTION --- */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50 hover:bg-white/10 hover:shadow-[0_15px_40px_-10px_rgba(59,130,246,0.25)]"
              >
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-yellow-400">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mb-4 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-blue-400">
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-white/60">
                    {post.excerpt}
                  </p>
                </div>
                
                {/* Footer of the Card: Author & Read More Arrow */}
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-xs font-bold text-yellow-400">
                      {post.author.charAt(0)}
                    </div>
                    <p className="text-sm font-medium text-white/80">By {post.author}</p>
                  </div>
                  
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-colors duration-300 group-hover:bg-yellow-400">
                    <ArrowRight size={16} className="text-white/50 transition-colors duration-300 group-hover:text-blue-900" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}