import Image from "next/image";
import Calender from "./Calender";
import CalendarList from "./calendarList";

const CalendarContainer = async ({
  searchParams,
}: {
  searchParams: Promise<{ [keys: string]: string | undefined }>;
}) => {
  const { date } = await searchParams;
  return (
    <div className="bg-white p-4 rounded-md">
      <Calender />
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <CalendarList dateParam={date} />
      </div>
    </div>
  );
};

export default CalendarContainer;