import { Card } from "@/components/ui/card";
import { ArrowUpCircle } from "lucide-react";

interface SavingsOverviewProps {
  totalSavings: number;
  monthlyIncrease: number;
}

export const SavingsOverview = ({ totalSavings, monthlyIncrease }: SavingsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="p-6 bg-primary text-white">
        <h3 className="text-sm font-medium text-primary-foreground/80">Total Savings</h3>
        <p className="text-3xl font-bold mt-2">${totalSavings.toLocaleString()}</p>
      </Card>
      
      <Card className="p-6 bg-secondary">
        <div className="flex items-center gap-2">
          <ArrowUpCircle className="w-5 h-5 text-secondary-foreground/80" />
          <h3 className="text-sm font-medium text-secondary-foreground/80">Monthly Growth</h3>
        </div>
        <p className="text-3xl font-bold mt-2 text-white">
          ${monthlyIncrease.toLocaleString()}
        </p>
      </Card>
    </div>
  );
};