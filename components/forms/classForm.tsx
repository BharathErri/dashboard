"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFieldForm from "../inputField";
import { ClassSchema, SubjectSchema } from "@/lib/validationSchemas";
import { createClass, createSubject, updateClass, updateSubject } from "@/lib/serverActions";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


const ClassForm = ({
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
    } = useForm<ClassSchema>({
        resolver: zodResolver(ClassSchema),
    });

    const router = useRouter();

    // form validation USE-ACTION-STATE
    const [state, formAction] = useActionState(type === "create" ? createClass : updateClass, {success:false, error:false});
    
    const onSubmit = handleSubmit(data => {
        console.log(data);
        startTransition(() => {
            formAction(data);
        })
    })

    useEffect(() => {
        if(state.success){
            toast(`Class has been ${type === "create" ? "created" : "updated"}`)
            setOpen(false);
            router.refresh();
        } else if (state.error) {
            toast.error("Something went Wrong!");
        }
    },[state]);

    const {teacher, grades} = relatedData;

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">{type === "create" ? "Create a New Class" : "Update the Class"}</h1>
            <div className="flex justify-between flex-wrap gap-4">
                <InputFieldForm label="Class Name" name="name" defaultValue={data?.name} register={register} error={errors.name}/>
                <InputFieldForm label="Capacity" name="capacity" defaultValue={data?.capacity} register={register} error={errors.capacity}/>

                {data && (
                    <InputFieldForm label="Id" name="id" defaultValue={data?.id} register={register} error={errors.id} hidden/>
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4 ">
                    <label className="text-sm text-gray-600">Supervisor</label>
                    <select 
                        className="rounded-md bg-white text-sm w-full p-2 text-gray-700" 
                        {...register("supervisorId")} 
                        defaultValue={data?.teacher}
                    >
                        {teacher.map((teacher:{id:string,name:string, surname:string}) => (
                            <option 
                                value={teacher.id} 
                                key={teacher.id}
                                selected={data && teacher.id === data.supervisorId}
                                defaultValue={teacher.id}
                                className="text-gray-800 bg-white hover:bg-sky-100"
                                style={{padding:"6px", cursor:"pointer"}}
                            >
                                {teacher.name + " " + teacher.surname}
                            </option>
                        ))}
                    </select>
                    {errors.supervisorId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.supervisorId.message.toString()}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4 ">
                    <label className="text-sm text-gray-600">Grade</label>
                    <select 
                        className="rounded-md bg-white text-sm w-full p-2 text-gray-700" 
                        {...register("gradeId")} 
                        defaultValue={data?.gradeId}
                    >
                        {grades.map((grades:{id:number,level:number}) => (
                            <option 
                                value={grades.id} 
                                key={grades.id}
                                defaultValue={grades.id}
                                selected={data && grades.id === data.gradeId}
                                className="text-gray-800 bg-white hover:bg-sky-100"
                                style={{padding:"6px", cursor:"pointer"}}
                            >
                                {grades.level}
                            </option>
                        ))}
                    </select>
                    {errors.gradeId?.message && (
                        <p className="text-xs text-red-400">
                            {errors.gradeId.message.toString()}
                        </p>
                    )}
                </div>
            </div>
            {state.error && <span className="text-red-500 text-sm">Something went Wrong</span>}
            <button className="bg-blue-400 rounded-md p-2 text-gray-600">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ClassForm;