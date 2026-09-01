import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { BlogPost } from "@/generated/prisma/client";

export function BlogForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: BlogPost;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={defaultValues?.slug} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="author">Author</Label>
          <Input id="author" name="author" defaultValue={defaultValues?.author ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="titleEn">Title (EN)</Label>
          <Input id="titleEn" name="titleEn" defaultValue={defaultValues?.titleEn ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="titleZh">Title (ZH)</Label>
          <Input id="titleZh" name="titleZh" defaultValue={defaultValues?.titleZh ?? ""} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contentEn">Content (EN)</Label>
        <Textarea id="contentEn" name="contentEn" rows={6} defaultValue={defaultValues?.contentEn ?? ""} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contentZh">Content (ZH)</Label>
        <Textarea id="contentZh" name="contentZh" rows={6} defaultValue={defaultValues?.contentZh ?? ""} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="coverImageUrl">Cover Image URL</Label>
          <Input id="coverImageUrl" name="coverImageUrl" defaultValue={defaultValues?.coverImageUrl ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="publishedAt">Published Date</Label>
          <Input
            id="publishedAt"
            name="publishedAt"
            type="date"
            defaultValue={defaultValues?.publishedAt ? defaultValues.publishedAt.toISOString().slice(0, 10) : ""}
          />
        </div>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
