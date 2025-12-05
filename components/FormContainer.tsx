import prisma from "@/lib/prisma";
import FormModel from "./FormModel";
import { getCurrentUserId, getRole} from "@/lib/utils";

export type FormContainerProps = {
    table: "teacher" | "student" |"Subject"| "parent" | "class" | "lesson" | "exam" | "assignment" | "result"  | "event";
    type: "create" | "update" | "delete";
    data?: any;
    id?:number | string;
}
const FormContainer = async({table,type,data,id}:FormContainerProps & {relatedData?:any}) => {
    let relatedData = {};
    const role = await getRole();
    const userId = await getCurrentUserId();
    if(type !== "delete"){
        switch (table) {
            case "Subject":
                const subjectTeachers = await prisma.teacher.findMany({
                    select: {id:true, name: true, surname: true},
                });
                relatedData = {teacher: subjectTeachers}
            break;
            case "class":
                const classGrades = await prisma.grade.findMany({
                    select: {id:true, level: true},
                });
                const classTeachers = await prisma.teacher.findMany({
                    select: {id:true, name: true , surname:true},
                });
                relatedData = {teacher: classTeachers, grades:classGrades}
            break;
            case "teacher":
                const teacherSubjects = await prisma.subject.findMany({
                    select: {id:true, name:true},
                });
                relatedData = {subjects: teacherSubjects}
            break;
            case "student":
                const studentGrades = await prisma.grade.findMany({
                    select: {id:true, level:true},
                });
                const studentClasses = await prisma.class.findMany({
                    include: {
                        _count:{
                            select: {
                                students:true,
                            }
                        }
                    }
                });
                relatedData = {grades: studentGrades, classes: studentClasses}
            break;
            case "exam":
                const examLessons = await prisma.lesson.findMany({
                    where: {
                        ...(role ==="teacher" ? {teacherId:userId!} : {}),
                    },
                    select:{id:true, name:true},

                });
                relatedData = {lessons: examLessons}
            break;
            default:
            break;
        }
    }
    return (
        <FormModel table={table} type={type} data={data} id={id} relatedData ={relatedData}/>
    )
}

export default FormContainer;