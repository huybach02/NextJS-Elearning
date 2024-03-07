import {getDashboardCourses} from "@/actions/get-dashboard-course";
import CoursesList from "@/components/CoursesList";
import {auth} from "@clerk/nextjs";
import {CheckCircle, Clock} from "lucide-react";
import {redirect} from "next/navigation";
import InfoCard from "./_components/InfoCard";

export default async function Dashboard() {
  const {userId} = auth();

  if (!userId) {
    redirect("/");
  }

  const {completedCourses, inProgressCourses} = await getDashboardCourses(
    userId
  );

  return (
    <div className="p-6 space-y-4">
      <div className="flex flex-col gap-5 border rounded-md p-5 shadow-md">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={inProgressCourses.length}
          variant="default"
        />
        {inProgressCourses.length > 0 && (
          <CoursesList items={inProgressCourses} />
        )}
      </div>
      <div className="flex flex-col gap-5 border rounded-md p-5 shadow-md">
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
        {completedCourses.length > 0 && (
          <CoursesList items={completedCourses} />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-primary">
          Purchased courses
        </h2>
        <CoursesList items={[...completedCourses, ...inProgressCourses]} />
      </div>
    </div>
  );
}
