import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Course } from "@/generated/prisma/client";

export function CourseForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Course;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input id="slug" name="slug" required defaultValue={defaultValues?.slug} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="level">Level</Label>
          <Input id="level" name="level" defaultValue={defaultValues?.level ?? ""} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="titleEn">Title (EN)</Label>
          <Input id="titleEn" name="titleEn" required defaultValue={defaultValues?.titleEn} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="titleZh">Title (ZH)</Label>
          <Input id="titleZh" name="titleZh" defaultValue={defaultValues?.titleZh ?? ""} />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="descriptionEn">Description (EN)</Label>
        <Textarea id="descriptionEn" name="descriptionEn" rows={4} defaultValue={defaultValues?.descriptionEn ?? ""} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="descriptionZh">Description (ZH)</Label>
        <Textarea id="descriptionZh" name="descriptionZh" rows={4} defaultValue={defaultValues?.descriptionZh ?? ""} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            defaultValue={defaultValues ? String(defaultValues.price) : undefined}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
          <Input id="thumbnailUrl" name="thumbnailUrl" defaultValue={defaultValues?.thumbnailUrl ?? ""} />
        </div>
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
      <Button type="submit">Save</Button>
    </form>
  );
}
