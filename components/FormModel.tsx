"use client";
import Image from "next/image";
import { Dispatch, JSX, SetStateAction, useActionState, useEffect, useState } from "react";
import StudentsForm from "./forms/studentsForm";
import ParentForm from "./forms/parentForm";
import SubjectsForm from "./forms/subjectsForm";
import dynamic from "next/dynamic";
import { deleteClass, deleteExam, deleteStudent, deleteSubject, deleteTeacher } from "@/lib/serverActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FormContainerProps } from "./FormContainer";


const deleteActionMap: Record<string, any> = {
    Subject:deleteSubject,
    class:deleteClass,
    teacher:deleteTeacher,
    student:deleteStudent,
    exam:deleteExam,
    lesson:deleteSubject,
    assignment:deleteSubject,
    parent:deleteSubject,
    result:deleteSubject,
    event:deleteSubject,
    
}

const TeacherForm = dynamic(() => import('./forms/teacherForm'), {
    loading: () => <h1>Loading............</h1>
})
const StudentForm = dynamic(() => import('./forms/studentsForm'), {
    loading: () => <h1>Loading............</h1>
})
const SubjectForm = dynamic(() => import('./forms/subjectsForm'), {
    loading: () => <h1>Loading............</h1>
})
const ClassForm = dynamic(() => import('./forms/classForm'), {
    loading: () => <h1>Loading............</h1>
})
const ExamForm = dynamic(() => import('./forms/examForm'), {
    loading: () => <h1>Loading............</h1>
})

const forms:Record<
    string,
    (setOpen:Dispatch<SetStateAction<boolean>>, type:"create" | "update" , data?:any, relatedData?:any) => JSX.Element 
> = {
    teacher:(setOpen, type,data, relatedData) => <TeacherForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
    student:(setOpen, type,data, relatedData) => <StudentsForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
    //parent:(setOpen,type,data, relatedData)  => <ParentForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
    Subject:(setOpen,type,data, relatedData) => <SubjectsForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
    class:(setOpen,type,data, relatedData) => <ClassForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>,
    exam:(setOpen,type,data, relatedData) => <ExamForm type={type} data={data} setOpen={setOpen} relatedData={relatedData}/>
}

const FormModel = ({table,type,data,id, relatedData}:FormContainerProps & {relatedData?:any}) => {
    const size = type === "create" ? "w-8 h-8" : "w-7 h-7";
    const bgColor = 
        type === "create" 
            ? "bg-yellow-300" 
            : type === "update" 
            ? "bg-sky-300" 
            :  "bg-violet-300";

    const [open, setOpen ] = useState(false);
    const router = useRouter();
    // Use Action State
    const [state, formAction] = useActionState(deleteActionMap[table], {
        success:false, 
        error:false
    });
    useEffect(() => {
        if(state.success) {
            toast(`${table} has been Deleted`);
            setOpen(false);
            router.refresh();
        }
    },[state, router, table]);

    const formdata = () => {
        return type === "delete" && id ? (
            <form action={formAction} className="p-4 flex flex-col gap-4 ">
                <input type="hidden" defaultValue={id} name="id"/>
                <span className="text-center font-medium">Are you sure you want to delete this {table}?</span>
                <button className="bg-red-500 text-white py-2 px-2 rounded-md border-none w-max self-center cursor-pointer">Delete</button>
            </form>
        ) : type === "create" || type === "update" ? (
            forms[table](setOpen,type,data, relatedData)
        ) : (
            "Form Not Found"
        );
    };
    return (
        <>
            <button 
                className={`${size} flex items-center justify-center rounded-full cursor-pointer ${bgColor}`}
                onClick={() => setOpen(true)}
            >
                <Image src={`/${type}.png`} alt="" width={16} height={16}/>
            </button>
            {open && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
                    <div className="bg-gray-100 p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto shadow-lg">
                        {formdata()}
                        <div className="absolute top-4 right-4 cursor-pointer " onClick={() => setOpen(false)}>
                            <Image src="/close.png" alt="" width={14} height={14} />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default FormModel;