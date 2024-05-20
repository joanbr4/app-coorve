export const TextCounter = ({ text }: { text: string }) => {
  return (
    <div className="h-10">
      <div className="flex flex-grow">
        <div className="grow">
          <div className="float-right flex">
            <div className="pt-5 text-sm text-gray-400">{text.length}/5000</div>
          </div>
        </div>
      </div>
    </div>
  );
};
