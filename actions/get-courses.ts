import {Category, Course} from "@prisma/client";

import {getProgress} from "@/actions/get-progress";
import {db} from "@/lib/db";

export type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: {id: string}[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title, // Dữ liệu trong cơ sở dữ liệu có thể chứa cả chữ in và chữ thường
          mode: "insensitive", // Chế độ không phân biệt chữ in hoa và chữ thường
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchase: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const coursesWithProgress: CourseWithProgressWithCategory[] =
      await Promise.all(
        courses.map(async (course) => {
          if (course.purchase.length === 0) {
            return {
              ...course,
              progress: null,
            };
          }

          const progressPercentage = await getProgress(userId, course.id);

          return {
            ...course,
            progress: progressPercentage,
          };
        })
      );

    return coursesWithProgress;
  } catch (error) {
    console.log("GET COURSES ERROR: ", error);
    return [];
  }
};
