import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listBlogPosts } from "@/lib/db/blogs";
import { deleteBlogPostAction } from "./actions";

export default async function AdminBlogsPage() {
  const posts = await listBlogPosts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Blogs</h1>
        <Button asChild size="sm">
          <Link href="/admin/blogs/new">New Blog Post</Link>
        </Button>
      </div>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Published</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.titleEn ?? post.titleZh}</TableCell>
              <TableCell className="text-muted-foreground">{post.slug}</TableCell>
              <TableCell>{post.publishedAt ? post.publishedAt.toLocaleDateString() : "Draft"}</TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/blogs/${post.id}`}>Edit</Link>
                  </Button>
                  <form action={deleteBlogPostAction.bind(null, post.id)}>
                    <Button type="submit" variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {posts.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No blog posts yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
