
export function Table({ ...props }) {
  return (
    <div className="relative overflow-auto">
      <table
        className="w-full caption-bottom text-sm bg-white border border-gray-200"
        {...props}
      />
    </div>
  );
}