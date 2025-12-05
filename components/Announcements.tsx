import Link from "next/link";
const Announcements = () => {
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold my-4">Announcements</h1>
                <Link href="">
                    <span className="text-xs text-gray-400" >View All</span>
                </Link>
            </div>
            <div className="flex flex-col gap-4 mt-2">
                <div className="bg-[#a6c3e3] rounded-md p-4 ">
                    <div className="flex items-center justify-between ">
                        <h2 className="font-medium ">Sports Day Announcement</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">10-11-2025</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">We are excited to announce the Annual Sports Day on 10-11-2025 at the school playground.</p>
                </div>
                <div className="bg-[#b1c291] rounded-md p-4">
                    <div className="flex items-center justify-between ">
                        <h2 className="font-medium ">Cultural Fest Announcement</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">20-11-2025</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Get ready for a day of fun, colours, and creativity!</p>
                </div>
                <div className="bg-[#edbd39] rounded-md p-4 ">
                    <div className="flex items-center justify-between ">
                        <h2 className="font-medium ">Science Exhibition Announcement</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">02-12-2025</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Our Annual Science Exhibition will be held on 02-11-2025 in the school auditorium</p>
                </div>
            </div>
        </div>
    )
}

export default Announcements;