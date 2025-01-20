import { PiggyBank } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-primary/10 rounded-full">
        <PiggyBank className="w-8 h-8 text-primary" />
      </div>
      <span className="text-xl font-bold text-gray-900">Piggy Bank</span>
    </div>
  );
};