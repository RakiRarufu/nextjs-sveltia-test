import fs from "fs";
import matter from "gray-matter";
import path from "path"

export interface PostData {
  slug: string;
  title: string;
  date: string;
  body: string;
}

 // Point this path directly to where Sveltia CMS saves your markdown folder
const postsDirectory = path.join(process.cwd(), "../sveltia-test/content/posts")

export async function getLocalMarkdownPosts() {
  
  // Guard clause if the directory hasn't been created yet
  if (!fs.existsSync(postsDirectory)) return [];

  const filenames = fs.readdirSync(postsDirectory);
  
  const posts = filenames
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      
      // Parse markdown frontmatter attributes
      const { data, content } = matter(fileContents);
      
      return {
        slug: filename.replace(/\.md$/, ''),
        title: data.title || 'Untitled Post',
        date: data.date || 'No Date',
        excerpt: data.excerpt || content.slice(0, 140) + '...',
      };
    });

  // Sort posts chronologically (newest first)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
