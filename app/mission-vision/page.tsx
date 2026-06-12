import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import  {remark} from 'remark'; // for markdown richtext
import  html from 'remark-html'; // for markdown richtext
import { MissionVision } from '@/types/MissionVision';

export default async function MissionVisionPage() {
  // 1. Locate the markdown file in your project
  const filePath = path.join(process.cwd(), '../sveltia-test/content/pages', 'mission-vision.md');
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // 2. Parse the front matter and cast it to your TypeScript interface
  const { data } = matter(fileContent);
  const frontMatter = data as MissionVision;

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Our Mission & Vision</h1>
      <p className="text-gray-600 mb-6">{frontMatter.description}</p>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Mission</h2>
        <p>{frontMatter.mission}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Vision</h2>
        <p>{frontMatter.vision}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold">Goals</h2>
        {/* <p className="whitespace-pre-line">{(await remark().use(html).process(frontMatter.goals)).toString()}</p> */}
        <div className="prose prose-sm"
        dangerouslySetInnerHTML={{ __html: (await remark().use(html).process(frontMatter.goals)).toString()}} />
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Core Values</h2>
        <ul className="list-disc pl-5 space-y-1">
          {/* 3. Access using bracket notation and loop */}
          {frontMatter["core_values"].map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}