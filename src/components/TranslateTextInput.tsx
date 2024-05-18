import { TextCounter } from "@/components/TextCounter";

export function TranslateTextInput({
  onChange,
  text = "",
}: {
  onChange: (text: string) => void;
  text: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-6/12 border-r border-gray-200 p-4">
      <div className="h-40">
        <div className="flex flex-row">
          <textarea
            autoFocus
            onChange={handleChange}
            className="w-full resize-none text-base
                focus:outline-none lg:text-2xl"
            rows={5}
            spellCheck={false}
            maxLength={5000}
            placeholder="Introduce tu texto..."
          />
        </div>
      </div>

      <TextCounter text={text} />
    </div>
  );
}
