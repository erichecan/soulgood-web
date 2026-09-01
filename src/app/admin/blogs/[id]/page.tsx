import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getBlogPost } from "@/lib/db/blogs";
import { BlogForm } from "../blog-form";
import { deleteBlogPostAction, updateBlogPostAction } from "../actions";

export default async function EditBlogPostPage({ params }: PageProps<"/admin/blogs/[id]">) {
  const { id } = await params;
  const post = await getBlogPost(id);
  if (!post) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Blog Post</h1>
        <form action={deleteBlogPostAction.bind(null, id)}>
          <Button type="submit" variant="destructive" size="sm">
            Delete
          </Button>
        </form>
      </div>
      <div className="mt-6">
        <BlogForm action={updateBlogPostAction.bind(null, id)} defaultValues={post} />
      </div>
    </div>
  );
}
