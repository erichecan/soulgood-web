import { CourseForm } from "../course-form";
import { createCourseAction } from "../actions";

export default function NewCoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New Course</h1>
      <div className="mt-6">
        <CourseForm action={createCourseAction} />
      </div>
    </div>
  );
}
