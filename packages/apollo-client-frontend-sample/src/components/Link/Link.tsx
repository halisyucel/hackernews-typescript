export interface LinkProps {
    createdAt: string;
    description: string;
    url: string;
}

export default function Link({
  createdAt,
  description,
  url,
}: LinkProps) {
  return (
    <div className="flex justify-center items-center border-b-2 border-dashed p-2 m-2">
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mr-2 text-blue-500"
      >
        {description}
      </a>
      -
      <span className="text-gray-500 pl-2 font-monospace font-bold text-xs">
        {createdAt}
      </span>
    </div>
  );
}