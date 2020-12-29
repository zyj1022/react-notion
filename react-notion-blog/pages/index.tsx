import Link from "next/link";

export function getNotionApiURL(type='table') {
  const NOTION_BLOG_ID = process.env.NOTION_BLOG_ID || "dd3da3d9edb548e0a2da98569967c80f";
  const WORKERS_DEV = 'https://notion-api.zking.workers.dev/';
  const VERSION = 'v1';
  const HOST = `${WORKERS_DEV}${VERSION}/${type}/`;
  return `${HOST}${NOTION_BLOG_ID}`;
}

export type Post = { id: string; slug: string; title: string; date: string };

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(getNotionApiURL()).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: Post[] }) {
  console.log('HomePage', posts);
  return (
    <div className="container mx-auto">
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <Link key={post.id} href="/blog/[slug]" as={`/blog/${post.slug}`}>
            <a>
              <b>{post.title}</b>
              <div className="sub">posted on {post.date}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
