
import Announcements from "@/components/Announcements";
import AttendanceContainer from "@/components/AttendanceContainer";
import CalendarContainer from "@/components/calenderContainer";
import CountChartContainer from "@/components/count-chart-Container";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/UserCard";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [keys: string]: string | undefined }>;
}) => {
  const { ...params } = await searchParams;
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/* Left side */}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/* User Card */}
        <div className="flex gap-2 justify-between flex-wrap">
          <UserCard type="admin"/>
          <UserCard type="teacher"/>
          <UserCard type="student"/>
          <UserCard type="parent"/>
        </div>
        {/* Middle charts */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* count chart  */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* Attedence chart */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceContainer />
          </div>
        </div>
        {/* Bottom charts */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* Right side */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <CalendarContainer  searchParams={searchParams}/>
        <Announcements />
      </div>
    </div>
  )
}

export default AdminPage;