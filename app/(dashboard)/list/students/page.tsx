
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Link from "next/link";
import FormContainer from "@/components/FormContainer";
import { Class, Prisma, Student } from "@/lib/generated/prisma";
import { Item_Per_Page } from "@/lib/page";
import { getRole } from "@/lib/utils";
import prisma from "@/lib/prisma";

type StudentList = Student & {class:Class} ;


const StudentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {

  const params = await searchParams;
  const {page, ...queryParams} = params;
  const p = page ? parseInt(page) : 1;
  const role = await getRole()

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Student ID",
      accessor: "studentId",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Class",
      accessor: "class",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
    },
    ...(role === "admin" ? [
      {
        header: "Actions",
        accessor: "action",
      }
    ]:[]),
  ];

  const renderRow = (item: StudentList ) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-4">
        <Image
          src={item.img || "/avatar.png"}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">{item.class.name}</td>
      <td className="hidden md:table-cell">{item.class.name}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item.id}`}>
            <button className="w-7 h-7 flex cursor-pointer items-center justify-center rounded-full bg-[#C3EBFA]">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role === "admin" && (
            //  <button className="w-7 h-7 flex items-center justify-center rounded-full bg-[#CFCEFF]">
            //   <Image src="/delete.png" alt="" width={16} height={16} />
            //  </button>
            <FormContainer table="student" type="delete" id={item.id}/>
          )}
        </div>
      </td>
    </tr>
  );
  // URL PARAMS CONDITION
  const query: Prisma.StudentWhereInput = {};
  if(queryParams){
    for(const [key, value] of Object.entries(queryParams)){
      if(value !== undefined){
        switch(key){
          case "teacherId":
            query.class = {
              lessons: {
                some: {
                teacherId:value,
              }
              }
            };
            break;
            case "search":
              query.name={contains:value, mode:"insensitive"}
            break;
            default:
            break;
        }
      }
    }
  }
  
  const [data, count] = await prisma.$transaction([
    prisma.student.findMany({
    where:query,
    include: {
      class:true,
    },
    take:Item_Per_Page,
    skip:Item_Per_Page * (p-1),
  }),
    prisma.student.count({
    where:query,
    })
  ])

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Students</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
                // <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-300">
                //     <Image src="/plus.png" alt="" width={14} height={14} />
                // </button>
              <FormContainer table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <Pagination page={p} count={count}/>
    </div>
  );
};

export default StudentPage;
