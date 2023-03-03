import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Output from "../components/Output";
import Link from "next/link";

const Home: NextPage = () => {
  const [data, setData] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const generateData = async () => {
    try {
      if (input === "") {
        throw error;
      }
      setIsLoading(true);
      setInput("");

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const incoming_DATA = await res.json();

      setData(incoming_DATA.output.text);
      setIsLoading(false);
    } catch (e) {
      setError(true);
      console.log(e);
    }
  };

  return (
    <div className='p-4'>
      <Head>
        <title>Savage GPT</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='h-full flex flex-col justify-between max-w-xl mx-auto gap-4'>
        <div className='flex flex-col w-full items-center gap-4'>
          <div
            className='text-zinc-100 font-bold
         text-4xl'
          >
            Savage GPT
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter your Question.. :)'
            className='w-full h-40 bg-zinc-800/50 rounded-lg shadow-xl border border-zinc-700/80 focus:border-indigo-600 outline-none ease-linear duration-150 p-4 text-zinc-100 text-lg'
          />
          <div className='w-full flex flex-row-reverse'>
            <button
              onClick={() => generateData()}
              className='flex justify-center items-center px-3 py-2 bg-indigo-600/10 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:scale-105 active:scale-95 hover:bg-indigo-600 hover:text-zinc-100 ease-linear duration-150 select-none'
            >
              {isloading ? "Generating..." : "Generate Output"}
            </button>
          </div>
          {data && <Output data={data && data.substring(6)} />}
        </div>
      </div>
      <div className="w-full flex fixed bottom-4 flex-row items-center justify-center text-zinc-400 font-medium text-lg">
        <Link href={'https://pavitra.vercel.app/'}>
          <div>Built by <span className="italic text-indigo-600">@Pavitra</span></div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
