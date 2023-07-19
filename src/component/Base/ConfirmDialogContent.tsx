export interface ConfirmDialogContentProps {
  title: string;
  message: string;
}

export function ConfirmDialogContent({ title, message }: ConfirmDialogContentProps) {
  return (
    <div className="flex h-20 flex-col gap-4 p-1">
      <h1 className="w-full border-b-2 border-b-cerulean-600 pb-1 text-sm font-bold text-hoki-600">
        {title}
      </h1>
      <p>{message}</p>
    </div>
  );
}

export default ConfirmDialogContent;
