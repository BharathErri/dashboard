"use client"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AttendanceBarChart = ({data}:{data:{name:string; present:number; absent:number}[]}) => {
    return (
        <ResponsiveContainer width="100%" height="90%">
            <BarChart width= {500}  height= {300} data={data} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke='#ddd'/>
                <XAxis dataKey="name" axisLine={false} tick={{fill:"#a9aeb5ff"}} tickLine={false}/>                        
                <YAxis axisLine={false} tick={{fill:"#a9aeb5ff"}} tickLine={false}/>
                <Tooltip contentStyle={{borderRadius:"10px", borderColor:"lightgray"}}/>
                <Legend align='left' verticalAlign='top' wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}/>
                <Bar dataKey="present" fill="#f3c90cff"  legendType='circle' radius={[10,10,0,0]} />
                <Bar dataKey="absent" fill="#11c6fcff" legendType='circle' radius={[10,10,0,0]}/>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default AttendanceBarChart;