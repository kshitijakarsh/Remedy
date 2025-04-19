
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export function PageTitle({ title, description, children, className }: PageTitleProps) {
  return (
    <div className={cn("mb-6 flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0", className)}>
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex items-center space-x-2">{children}</div>}
    </div>
  );
}
