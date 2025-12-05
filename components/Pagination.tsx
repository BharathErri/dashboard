"use client"
import { Item_Per_Page } from "@/lib/page";
import { useRouter } from "next/navigation";

const Pagination = ({page, count}: {page: number; count: number}) => {
  const router = useRouter();
  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params.toString()}`)
  };

  const totalPages = Math.ceil(count / Item_Per_Page);

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button 
        disabled={page<= 1} 
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-sky-200"
        onClick={()=> changePage(page-1)}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-xs">
        {Array.from({length:totalPages}, (_,index) => {
          const pageIndex = index + 1;
          return (
            <button 
              key={pageIndex} 
              className={`px-2 py-1 rounded-sm ${page == pageIndex ? "bg-sky-300" : ""} cursor-pointer`} 
              onClick={() => changePage(pageIndex)}
            >
              {pageIndex}
            </button>
          )
        } )}
      </div>
      <button 
        disabled={page >= totalPages}
        onClick={() => changePage(page+1)}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-sky-200"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination;

