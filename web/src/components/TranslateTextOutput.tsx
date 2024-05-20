import { MdContentCopy } from "react-icons/md";

const Loading = () => <span className="animate-pulse">⏺</span>;

export function TranslateTextOutput({
  result = "",
  isLoading,
}: {
  result: string;
  isLoading: boolean;
}) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
  };

  const renderResult = () => {
    if (isLoading && result.length === 0) return <Loading />;
    if (!isLoading && result.length === 0)
      return <span className="text-gray-400">Traducción... </span>;
    if (isLoading && result.length > 0)
      return (
        <span>
          {result}
          <Loading />
        </span>
      );
    return <span>{result}</span>;
  };

  return (
    <div className="w-6/12 rounded-br-lg bg-gray-100 p-4">
      <div className="h-40">
        <div className="pointer-events-none h-10 resize-none bg-transparent text-base text-black lg:text-2xl">
          {renderResult()}
        </div>
      </div>

      <div className="h-10">
        <div className="flex flex-grow">
          <div className="grow">
            <div className="float-right flex">
              <button
                className="mt-1 flex
                  h-10 w-10 items-center justify-center rounded-full transition-colors
                  duration-100 hover:bg-gray-200"
                onClick={copyToClipboard}
              >
                <MdContentCopy />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
