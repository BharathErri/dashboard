"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import InputFieldForm from "../inputField";
import { Dispatch, SetStateAction } from "react";

const schema = z.object({
  username: z.string().min(5, { message: 'Minimum 5 Characters' }).max(20,{message:"Maximum 20 Characters"}),
  email: z.string().email({message:"Invalid Email Address"}),
  studentName:z.string().min(4,{message:"Minimum 4 Characters"}),
  password:z.string().min(8, {message:"Minimum 8 Characters"}),
  firstName:z.string().min(1, {message:"First Name is required!"}),
  lastName:z.string().min(3, {message:"Last Name is required!"}),
  phone:z.string().min(10, {message:"Phone Number is required!"}),
  address:z.string().min(5, {message:"Address is required!"}),
});

const ParentForm = ({
    type,
    data,
    setOpen,
}:{
    type:"create" | "update" 
    data?:any;
    setOpen:Dispatch<SetStateAction<boolean>>;
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(data => {
        alert(data);
    })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-8">
            <h1 className="text-xl font-semibold">Create a New Parent</h1>
            <span className="text-xs text-gary-500 font-medium">Authentication Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputFieldForm label="User Name" name="username" defaultValue={data?.username} register={register} error={errors.username}/>
                <InputFieldForm label="Email" type="email" name="email" defaultValue={data?.email} register={register} error={errors.email}/>
                <InputFieldForm label="Password" type="password" name="password" defaultValue={data?.password} register={register} error={errors.password}/>
            </div>
            <span className="text-xs text-gary-500 font-medium">Personal Information</span>
            <div className="flex justify-between flex-wrap gap-4">
                <InputFieldForm label="First Name" name="firstName" defaultValue={data?.firstName} register={register} error={errors.firstName}/>
                <InputFieldForm label="Last Name" name="lastName" defaultValue={data?.lastName} register={register} error={errors.lastName}/>
                <InputFieldForm label="Student Name" name="studentName" defaultValue={data?.studentName} register={register} error={errors.studentName}/>
                <InputFieldForm label="Phone" name="phone" defaultValue={data?.phone} register={register} error={errors.phone}/>
                <InputFieldForm label="Address" name="address" defaultValue={data?.address} register={register} error={errors.address}/>
            </div>
            <button className="bg-blue-400 rounded-md p-2 text-gray-600 w-max self-center">{type === "create" ? "Create" : "Update"}</button>
        </form>
    )
}

export default ParentForm;