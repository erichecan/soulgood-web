import { BlogForm } from "../blog-form";
import { createBlogPostAction } from "../actions";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New Blog Post</h1>
      <div className="mt-6">
        <BlogForm action={createBlogPostAction} />
      </div>
    </div>
  );
}
