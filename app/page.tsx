// pages/index.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getLocalMarkdownPosts } from '@/utils';

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await getLocalMarkdownPosts();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Local Markdown Posts</h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <a key={post.slug} href={`/blog/${post.slug}`} className="p-4 border rounded block hover:bg-slate-50 transition">
            <Image
              src={post.thumbnail}
              alt=''
              width='500'
              height='500'
             />
            <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
            <span className="text-sm text-gray-400">{post.date}</span>
            <p className="mt-2 text-gray-600">{post.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  );
}

// export default function Homepage (posts) {
//   return (
//     <div>
//       <h1>Welcome to My Blog</h1>
//       {posts.map(post => (
//         <div key={post.slug}>
//           <h2>{post.title}</h2>
//           <p>{post.date}</p>
//           <Link href={`/posts/${post.slug}`}>
//             <a>Read More</a>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );

// }


// export default function HomePage () {
// return (
//     <div>
//       <h1>Welcome to My Blog</h1>
//       <Link href="/admin/index.html">Go to Admin</Link>
//     </div>
//   );
// }