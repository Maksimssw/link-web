import React from "react";

interface Props {
  className?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
}

export const EmptyLayout: React.FC<Props>  = ({className, children}) => {
  return (
    <main className="w-full inline-flex justify-center h-auto max-w-full pt-10">
      {children}
    </main>
  )
}