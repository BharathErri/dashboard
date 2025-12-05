import { title } from "process";
import z from "zod";

export const SubjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject Name is Required!"}),
  teachers:z.array(z.string()),
});
export type SubjectSchema = z.infer<typeof SubjectSchema>;


// Class Schema

export const ClassSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class Name is Required!"}),
  capacity: z.coerce.number().min(1, {message:"Capacity is Required!"}),
  gradeId: z.coerce.number().min(1, {message:"Grade is Required!"}),
  supervisorId: z.coerce.string().optional(),
});
export type ClassSchema = z.infer<typeof ClassSchema>;

// Teacher Schema
export const TeacherSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(5, { message: 'UserName is Required!' }),
  password: z.string().min(8, { message: "Password is Required!" }).optional().or(z.literal("")),
  name: z.string().min(1, { message: "Name is required!" }),
  surname: z.string().min(1, { message: "SurName is required!" }),
  email: z.string().email({ message: "Email Address is Required!" }).optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  dob: z.coerce.date({ message: "Date Of Birth is required!" }),
  bloodType: z.string().min(1, { message: "Blood Group Is Required" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is Required" }),
  img: z.string().optional(),
  subjects: z.array(z.string()).optional(),
});

export type TeacherSchema = z.infer<typeof TeacherSchema>;


export const StudentSchema = z.object({
  id: z.string().optional(),
  username: z.string().min(5, { message: 'UserName is Required!' }),
  password: z.string().min(8, { message: "Password is Required!" }).optional().or(z.literal("")),
  name: z.string().min(1, { message: "Name is required!" }),
  surname: z.string().min(1, { message: "SurName is required!" }),
  email: z.string().email({ message: "Email Address is Required!" }).optional().or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  dob: z.coerce.date({ message: "Date Of Birth is required!" }),
  bloodType: z.string().min(1, { message: "Blood Group Is Required" }),
  gender: z.enum(["MALE", "FEMALE"], { message: "Gender is Required" }),
  img: z.string().optional(),
  gradeId: z.coerce.number().min(1,{message:"Grade is Required"}),
  classId: z.coerce.number().min(1,{message:"Class is Required"}),
  parentId: z.string().min(1,{message:"Parent Id is Required"})

});

export type StudentSchema = z.infer<typeof StudentSchema>;


export const ExamSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title Name is Required!"}),
  startTime: z.coerce.date({message:"Start Time is Required"}),
  endTime: z.coerce.date({message:"End Time is Required"}),
  lessonId: z.coerce.number({message:"Lesson is Required"})
});

export type ExamSchema = z.infer<typeof ExamSchema>;