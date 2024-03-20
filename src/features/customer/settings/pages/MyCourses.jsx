import { Link } from 'react-router-dom';
import MyCourseItem from '../components/MyCourseItem';
import CirclePlus from '../../../../public/icons/CirclePlus';

export default function MyCourses() {
   return (
      <div className="ml-20 mt-16 min-h-screen">
         <h2 className="text-[22px] font-semibold">Khoá học của tôi</h2>
         <hr />
         <p>
            Bạn đang có <span className="font-semibold">5</span> khoá học
         </p>
         <div className="mt-5 grid grid-cols-3 gap-6">
            {Array(5)
               .fill()
               .map((index) => (
                  <Link to={'/'} key={index}>
                     <MyCourseItem />
                  </Link>
               ))}
            <Link
               to={'/'}
               className="border-[3px] border-[#e8e8e8] border-dashed rounded-xl relative flex flex-col items-center justify-between pb-10 pt-20 text-[#767676] hover:border-primary hover:text-primary transition-all ease-linear duration-300 group "
            >
               <div className="size-7 ">
                  <CirclePlus />
               </div>

               <button className="px-5 py-1 mt-5 rounded-2xl text-primary border-2 border-primary font-medium z-20">
                  Thêm khoá học
               </button>
               <div
                  className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-primary h-24 w-32 opacity-0 group-hover:opacity-60 group-hover:top-14 transition-all ease-linear duration-300 z-0"
                  style={{
                     maskImage: `url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjYuMjA1IiBoZWlnaHQ9IjkyLjQxNSI+PGcgZGF0YS1uYW1lPSJHcm91cCAyOTM0MTkiIGZpbGw9IiNkZWRlZjkiPjxwYXRoIGRhdGEtbmFtZT0iUGF0aCAxMjkyNjciIGQ9Im0xMjUuMzQ5IDgwLjM0OC0xLjE5Mi40ODFhMTkuMzggMTkuMzggMCAwIDAtMTAuNzI0IDEwLjcyNiAxLjM2OSAxLjM2OSAwIDAgMS0yLjUzOSAwIDE5LjM3MyAxOS4zNzMgMCAwIDAtMTAuNzI0LTEwLjcyNmwtMS4xOTItLjQ4MWExLjM2NyAxLjM2NyAwIDAgMSAwLTIuNTM4bC41MDYtLjJhMTkuMzg2IDE5LjM4NiAwIDAgMCAxMC43MjYtMTAuNzI4bC42ODItMS42OTNhMS4zNjkgMS4zNjkgMCAwIDEgMi41MzkgMGwuNjg0IDEuN2ExOS4zOSAxOS4zOSAwIDAgMCAxMC43MjMgMTAuNzI0bC41MDYuMmExLjM2NyAxLjM2NyAwIDAgMSAwIDIuNTM4WiIvPjxwYXRoIGRhdGEtbmFtZT0iUGF0aCAxMjkyNjgiIGQ9Im0yMS40NzcgMTIuNjM1LS45NC4zOGExNS4yODcgMTUuMjg3IDAgMCAwLTguNDU5IDguNDU5IDEuMDc5IDEuMDc5IDAgMCAxLTIgMCAxNS4yOCAxNS4yOCAwIDAgMC04LjQ1OC04LjQ1OWwtLjk0LS4zOGExLjA3OSAxLjA3OSAwIDAgMSAwLTJsLjQtLjE2MWExNS4yODQgMTUuMjg0IDAgMCAwIDguNDYtOC40NjJsLjUzOC0xLjMzNmExLjA4MSAxLjA4MSAwIDAgMSAyIDBsLjU0IDEuMzM4YTE1LjI4NiAxNS4yODYgMCAwIDAgOC40NTggOC40NThsLjQuMTYyYTEuMDggMS4wOCAwIDAgMSAwIDJaIi8+PC9nPjwvc3ZnPg==)`,
                  }}
               ></div>
            </Link>
         </div>
      </div>
   );
}
