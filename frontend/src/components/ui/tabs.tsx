export function Tabs({ ...props }) {
  return (
    <div className="" {...props} />
  );
}

export function TabsList({ ...props }) {
  return (
    <div
      className="inline-flex items-center justify-center rounded-lg bg-gray-100 p-1"
      {...props}
    />
  );
}

export function TabsTrigger({ ...props }) {
  return (
    <button
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm"
      {...props}
    />
  );
}

export function TabsContent({ ...props }) {
  return (
    <div
      className="mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
      {...props}
    />
  );
}