const teacherId = ["user_2dM1SjU1zFgHEc1uLwDYYbxiKpa"];

export const isTeacher = (userId?: string | null) => {
  return teacherId.some((teacher) => teacher === userId);
};
