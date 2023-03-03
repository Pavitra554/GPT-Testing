import React from "react";
import {SiOpenai} from 'react-icons/si'

type props = {
  data: string;
};

const Output: React.FC<props> = ({ data }) => {
  return (
    <div className='w-full flex flex-row space-x-2 border-t border-zinc-700 pt-10'>
      <div className="p-2 text-zinc-400">
        <SiOpenai size={20}/>
      </div>
      <div className='h-52 w-full bg-zinc-800/50 rounded-lg shadow-xl border border-zinc-700/80 ease-linear duration-150 p-4 text-zinc-200 text-lg'>
        {data}
      </div>
    </div>
  );
};

export default Output;
