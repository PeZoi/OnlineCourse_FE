import { Skeleton } from 'primereact/skeleton';

export default function CourseHomeLoading({ className }) {
   return (
      <div className={className + ' flex flex-col gap-2'}>
         <Skeleton height="180px"></Skeleton>
         <Skeleton></Skeleton>
         <Skeleton width="9rem"></Skeleton>
      </div>
   );
}
