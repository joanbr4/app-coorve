import { Tcontext } from "@/types/types";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function Configuration() {
  const [status, setStatus] = useState("Coming soon new features...");
  const { setParamId } = useOutletContext<Tcontext<string>>();

  useEffect(() => {
    const url = new URL(window.location.href);
    const param = url.pathname.split("/")[2];
    setParamId(param);

    const statuses = [
      "Coming soon new features...",
      // "Worker is processing...",
      "Still working...",
      "Almost there...",
      "Still working...",
      // "Just a moment more...",
    ];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setStatus(statuses[currentIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100">
        <div className="animate-spin text-7xl">⚙️</div>
        <div className="mt-4 text-xl text-gray-700">{status}</div>

        {/* <div className="flex  max-w-[200px] border bg-slate-400">
          <p className="my-auto p-8 text-white ">
            Próximas features van a ser desplegas muy pronto...
          </p>
        </div> */}
      </div>
    </>
  );
}
export { Configuration };
