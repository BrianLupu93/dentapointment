import { TbDental } from "react-icons/tb";

const HomeTitle = () => {
  return (
    <div className='w-full flex justify-center items-end mb-10'>
      <span className='text-3xl sm:text-5xl '>Dent</span>
      <TbDental size={60} />
      <span className='text-3xl sm:text-5xl'>ppointment</span>
    </div>
  );
};

export default HomeTitle;
