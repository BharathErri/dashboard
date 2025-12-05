import Image from "next/image";
import prisma from "../lib/prisma";
import AttendanceBarChart from "./attendance";

export default async function AttendanceContainer(){
    const today = new Date();
    const dayOfWeek = today.getDay();
    const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate()-daysSinceMonday);

    const resData = await prisma.attendance.findMany({
        where:{
            date:{
                gte:lastMonday
            },
        },
        select: {
            date: true,
            present: true,
        },
    });
    const daysOfWeek = ["Mon","Tue","Wed","thu","Fri"];

    const attendanceMap:Record<string, {present:number; absent:number}> = {
        Mon:{present:0, absent:0},
        Tue:{present:0, absent:0},
        Wed:{present:0, absent:0},
        Thu:{present:0, absent:0},
        Fri:{present:0, absent:0},
    }
    resData.forEach(item => {
        const itemDate = new Date(item.date);
        const recordDay = itemDate.getDate(); // 0-6
        // Mon-Fri = 1-5 
        if(recordDay >=1 && recordDay <=5){
            const dayName = daysOfWeek[recordDay-1];
            if(item.present) {
                attendanceMap[dayName].present += 1;
            } else {
                attendanceMap[dayName].absent +=1;
            }
        }
    });
    const data = daysOfWeek.map((day) => ({
        name: day,
        present: attendanceMap[day]?.present ?? 0,
        absent: attendanceMap[day]?.absent ?? 0,
    }));
    return(
        <div className='bg-white rounded-xl  h-full w-full p-4'>
            {/* Title */}
            <div className='flex justify-between items-center '>
                <h1 className='text-lg font-semibold '>Attendance</h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}/>
            </div>
            {/* Chart */}
            <AttendanceBarChart data={data}/>
        </div>
    )
}