"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFieldForm from "../inputField";
import { ExamSchema, SubjectSchema } from "@/lib/validationSchemas";
import { createExam, createSubject, updateExam, updateSubject } from "@/lib/serverActions";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const ExamForm = ({
    type,
    data,
    setOpen,
    relatedData,
}:{
    type:"create" | "update" ;
    data?:any;
    setOpen:Dispatch<SetStateAction<boolean>>,
    relatedData?:any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ExamSchema>({
        resolver: zodResolver(ExamSchema),
    });

    const router = useRouter();

    // form validation USE-ACTION-STATE
    const [state, formAction] = useActionState(type === "create" ? createExam : updateExam, {success:false, error:false});
    
    const onSubmit = handleSubmit(data => {
        console.log(data);
        startTransition(() => {
            formAction(data);
        })
    })

    useEffect(() => {
        if(state.success){
            toast(`Exam has been ${type === "create" ? "created" : "updated"}`)
            setOpen(false);
            router.refresh();
        } else if (state.error) {
            toast.error("Something went Wrong!");
        }
    },[state]);
    const {lessons} = relatedData;
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a New Exam" : "Update the Exam"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputFieldForm label="Exam Title" name="title" defaultValue={data?.title} register={register} error={errors.title}/>
                <InputFieldForm label="Start Date" type="datetime-local" name="startTime" defaultValue={data?.startTime} register={register} error={errors.startTime}/>
                <InputFieldForm label="End Date" type="datetime-local" name="endTime" defaultValue={data?.endTime} register={register} error={errors.endTime}/>
                {data && (
                    <InputFieldForm label="Id" name="id" defaultValue={data?.id} register={register} error={errors.id} hidden/>
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4 ">
                    <label className="text-sm text-gray-600">Lesson</label>
                    <select 
                        className="rounded-md bg-white text-sm w-full p-2 text-gray-700" 
                        {...register("lessonId")} 
                        defaultValue={data?.teacher}
                    >
                        {lessons.map((lesson:{id:number,name:string}) => (
                            <option 
                                value={lesson.id} 
                                key={lesson.id}
                                className="text-gray-800 bg-white hover:bg-sky-100"
                                style={{padding:"6px", cursor:"pointer"}}
                            >
                                {lesson.name}
                            </option>
                        ))}
                    </select>
                    {errors.lessonId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.lessonId.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            {state.error && <span className="text-red-500 text-sm">Something went Wrong</span>}
            <button className="bg-blue-400 rounded-md p-2 text-gray-600">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ExamForm;