import prisma from "@/lib/prisma";
import BarChart from "./count-chart";
import Image from "next/image";

const CountChartContainer = async() => {
    const data = await prisma.student.groupBy({
        by:["gender"],
        _count:true,
    });
    const boys = data.find((d) => d.gender === "MALE")?._count || 0;
    const girls = data.find((d) => d.gender === "FEMALE")?._count || 0;
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* Title */}
            <div className='flex justify-between items-center '>
                <h1 className='text-lg font-semibold '>Students</h1>
                <Image src="/moreDark.png" alt='' width={20} height={20}/>
            </div>
            {/* Bar Chart */}
                <BarChart boys={boys} girls={girls} />
            {/* Bottom */}
            <div className='flex justify-center gap-16'>
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <div className='w-5 h-5 rounded-full bg-[#11c6fcff]'/>
                    <h1 className='font-bold'>{boys}</h1>
                    <h2 className='text-xs text-gray-500'>Boys ({Math.round((boys/(boys + girls))*100)} %)</h2>
                </div>
                <div className='flex flex-col gap-1 items-center justify-center'>
                    <div className='w-5 h-5 rounded-full bg-[#f3c90cff]'/>
                    <h1 className='font-bold'>{girls}</h1>
                    <h2 className='text-xs text-gray-500'>Girls ({Math.round((girls/(boys + girls))*100)} %)</h2>
                </div>
            </div>
        </div>
    )
}

export default CountChartContainer;