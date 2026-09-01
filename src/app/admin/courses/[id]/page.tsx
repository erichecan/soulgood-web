import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCourse } from "@/lib/db/courses";
import { CourseForm } from "../course-form";
import { deleteCourseAction, updateCourseAction } from "../actions";

export default async function EditCoursePage({ params }: PageProps<"/admin/courses/[id]">) {
  const { id } = await params;
  const course = await getCourse(id);
  if (!course) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Course</h1>
        <form action={deleteCourseAction.bind(null, id)}>
          <Button type="submit" variant="destructive" size="sm">
            Delete
          </Button>
        </form>
      </div>
      <div className="mt-6">
        <CourseForm action={updateCourseAction.bind(null, id)} defaultValues={course} />
      </div>
    </div>
  );
}
