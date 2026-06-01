"use client";

import { Button } from "@/components/ui/button";

interface AddJobButtonProps {
  onClick: () => void;
}

export function AddJobButton({ onClick }: AddJobButtonProps) {
  return (
    <Button onClick={onClick} className="whitespace-nowrap">
      + Add Job
    </Button>
  );
}
