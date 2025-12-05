"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputFieldForm from "../inputField";
import Image from "next/image";
import { Dispatch, SetStateAction, startTransition, useActionState, useEffect, useState } from "react";
import { TeacherSchema } from "@/lib/validationSchemas";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { createTeacher, updateTeacher } from "@/lib/serverActions";
import { CldUploadWidget } from 'next-cloudinary';

const TeacherForm = ({
    type,
    data,
    setOpen,
    relatedData,
}:{
    type:"create" | "update" 
    data?:any;
    setOpen:Dispatch<SetStateAction<boolean>>;
    relatedData?:any;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TeacherSchema>({
        resolver: zodResolver(TeacherSchema),
    });

    const router = useRouter();

    const [image, setImage] = useState<any>();
    // form validation USE-ACTION-STATE
    const [state, formAction] = useActionState(type === "create" ? createTeacher : updateTeacher, {success:false, error:false});
    
    const onSubmit = handleSubmit(data => {
        console.log(data);
        startTransition(() => {
            formAction({...data, img: image?.secure_url});
        })
    })

    useEffect(() => {
        if(state.success){
            toast(`Teacher has been ${type === "create" ? "created" : "updated"}`)
            setOpen(false);
            router.refresh();
        } else if (state.error) {
            toast.error("Something went Wrong!");
        }
    },[state,router,type,setOpen]);

    const subjects = relatedData?.subjects || [];    
    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">{type==="create"?"Create a New Teacher" : "Update Teacher"}</h1>
            <span className="text-xs text-gary-500 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputFieldForm label="User Name" name="username" defaultValue={data?.username} register={register} error={errors.username}/>
                <InputFieldForm label="Email" type="email" name="email" defaultValue={data?.email} register={register} error={errors.email}/>
                <InputFieldForm label="Password" type="password" name="password" defaultValue={data?.password} register={register} error={errors.password}/>
            </div>
            <span className="text-xs text-gary-500 font-medium">Personal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputFieldForm label="Name" name="name" defaultValue={data?.name} register={register} error={errors.name}/>
                <InputFieldForm label="SurName" name="surname" defaultValue={data?.surname} register={register} error={errors.surname}/>
                <InputFieldForm label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone}/>
                <InputFieldForm label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address}/>
                <InputFieldForm label="Blood Type" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors.bloodType}/>
                <InputFieldForm label="Date Of Birth" name="dob" type="Date" defaultValue={data?.dob.toISOString().split("T")[0]} register={register} error={errors.dob}/>
                {data && (
                    <InputFieldForm label="Id" name="id" defaultValue={data?.id} register={register} error={errors.id} hidden/>
                )}
                <div className="flex flex-col gap-2 w-full md:w-1/4 ">
                    <label className="text-sm text-gray-600">Gender</label>
                    <select 
                        className="rounded-md bg-white text-sm w-full p-2" 
                        {...register("gender")} 
                        defaultValue={data?.gender}
                    >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>
                    {errors.gender?.message && (
                        <p className="text-red-500 text-xs">{errors.gender.message.toString()}</p>
                    )}
                </div>
                <div className="flex flex-col gap-2 w-full md:w-1/4 ">
                    <label className="text-sm text-gray-600">Subjects</label>
                    <select 
                        multiple
                        className="rounded-md bg-white text-gray-800 text-sm w-full p-2" 
                        {...register("subjects")} 
                        defaultValue={data?.subjects}
                    >
                        {subjects.map((subject:{id:number, name: string}) => (
                            <option value={subject.id} key={subject.id}>
                                {subject.name}
                            </option>
                        ))}
                    </select>
                    {errors.subjects?.message && (
                        <p className="text-red-500 text-xs">{errors.subjects.message.toString()}</p>
                    )}
                </div>
                <CldUploadWidget uploadPreset="school" onSuccess={(result, widget) => {
                    setImage(result.info)
                    widget.close()
                }}>
                    {({ open }) => {
                        return (
                            <div onClick={() => open()} className="text-xs text-gray-500 flex items-center gap-2 cursor-pointer">
                                <Image src="/upload.png" alt="" width={28} height={28} />
                                <span>Upload Photo</span>
                            </div>
                        );
                    }}
                </CldUploadWidget>
            </div>
            {state.error && (
                <span className="text-red-400">Something Went Wrong</span>
            )}
            <button className="bg-blue-400 rounded-md p-2 text-gray-600 self-center">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default TeacherForm;