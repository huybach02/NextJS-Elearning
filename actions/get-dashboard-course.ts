import {db} from "@/lib/db";
import {Category, Chapter, Course} from "@prisma/client";
import {getProgress} from "./get-progress";

interface DashboardCourses {
  completedCourses: any[];
  inProgressCourses: any[];
}

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
    const purchaseCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true,
              },
            },
          },
        },
      },
    });

    const courses = purchaseCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategory[];

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const inProgressCourses = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      inProgressCourses,
    };
  } catch (error) {
    console.log("GET DASHBOARD COURSES ERROR ", error);
    return {
      completedCourses: [],
      inProgressCourses: [],
    };
  }
};
