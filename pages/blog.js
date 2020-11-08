import Link from "next/link";

import Layout from "components/Layout";
import SEO from "components/Seo";
import { getSortedPosts } from "utils/posts";
import Bio from "components/Bio";

export default function Blog({ posts }) {
  return (
    <Layout>
      <SEO title="All posts" />
      <div className="grid gap-6">
        {posts.map(({ frontmatter: { title, description, date }, slug }) => (
          <article key={slug}>
            <header className="py-2">
              <h3 className="py-2">
                <Link href={"/post/[slug]"} as={`/post/${slug}`}>
                  <a className="text-3xl font-bold text-blue-600 lg:text-4xl font-display">
                    {title}
                  </a>
                </Link>
              </h3>
              <span className="text-sm">{date}</span>
            </header>
            <section>
              <p className="text-lg">{description}</p>
            </section>
          </article>
        ))}
      </div>
      <Bio className="my-10" />
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getSortedPosts();

  return {
    props: {
      posts,
    },
  };
}
