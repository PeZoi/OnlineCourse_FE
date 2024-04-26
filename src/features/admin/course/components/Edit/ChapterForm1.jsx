import { useForm } from 'react-hook-form';
import ChapterField from './ChapterField';
import { v4 as uuidv4 } from 'uuid';

export default function ChapterForm1({ course }) {
   const defaultValues = {
      chapter: [
         {
            id: uuidv4(),
            name: 'Chương 1',
            lessonList: [
               {
                  id: uuidv4(),
                  name: 'Bài 1',
               },
               {
                  id: uuidv4(),
                  name: 'Bài 2',
               },
            ],
         },
         {
            id: uuidv4(),
            name: 'Chương 2',
            lessonList: [],
         },
      ],
   };

   const {
      control,
      register,
      handleSubmit,
      reset,
      getValues,
      setValue,
      formState: { errors },
   } = useForm({
      mode: 'onChange',
      // resolver: yupResolver(schema),
      defaultValues,
   });

   const onSubmit = (data) => {
      console.log(data);
   };

   return (
      <div className="mt-5 border border-gray p-10 rounded-lg">
         <form onSubmit={handleSubmit(onSubmit)}>
            <ChapterField {...{ control, register, errors, defaultValues }} />
            <button type="submit">Submit</button>
         </form>
      </div>
   );
}