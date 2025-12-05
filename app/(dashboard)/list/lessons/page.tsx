
import FormModel from "@/components/FormModel";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Class, Lesson, Prisma, Subject, Teacher } from "@/lib/generated/prisma";
import Image from "next/image";
import { Item_Per_Page } from "@/lib/page";
import { getRole } from "@/lib/utils";
import prisma from "@/lib/prisma";

type LessonList = Lesson & {teacher:Teacher} & {subject:Subject} & {class:Class} ;

const LessonPage =async ({
    searchParams,
  }: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
  }) => {
  const params = await searchParams;
  const {page, ...queryParams} = params;
  const p = page ? parseInt(page) : 1;
  const role = await getRole();
  
  const columns = [
    {
      header: "Subject Name",
      accessor: "subject",
    },
    {
      header: "Class Name",
      accessor: "class",
    },
    {
      header: "Teacher",
      accessor: "teacher",
      className: "hidden lg:table-cell",
    },
    ...(role == "admin" ? [
      {
        header: "Actions",
        accessor: "action",
      }
    ]:[]),
  ];

  const renderRow = (item: LessonList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-[#F1F0FF]"
    >
      <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">{item.teacher.name}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <> 
              <FormModel table="lesson" type="update" data={item}/>
              <FormModel table="lesson" type="delete" id={item.id}/>
            </>
          )}
        </div>
      </td>
    </tr>
  );
  // URL PARAMS CONDITION
  const query: Prisma.LessonWhereInput = {};
  if(queryParams){
    for(const [key, value] of Object.entries(queryParams)){
      if(value !== undefined){
        switch(key){
          case "teacherId":
            query.teacherId = value;
          break;
          case "classId":
            query.classId = parseInt(value);
          break;
          case "search":
            query.OR = [
              {subject: {name: {contains:value, mode:"insensitive"}}},
              {teacher: {name: {contains:value, mode:"insensitive"}}},
            ]
            break;
            default:
              break;
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
    prisma.lesson.findMany({
      where:query,
      include : {
        teacher:{select:{name:true}},
        subject:{select:{name:true}},
        class:{select:{name:true}},
      },
      take:Item_Per_Page,
      skip:Item_Per_Page * (p-1),
    }),
    prisma.lesson.count({
      where:query,
    })
  ])
  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
                <FormModel table="lesson" type="create" />
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

export default LessonPage;
