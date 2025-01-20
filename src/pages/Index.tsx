import { SavingsGoal } from "@/components/SavingsGoal";
import { SavingsOverview } from "@/components/SavingsOverview";
import { Header } from "@/components/Header";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddGoalDialog } from "@/components/AddGoalDialog";
import { AddDepositDialog } from "@/components/AddDepositDialog";
import { useState } from "react";
import { EditGoalDialog } from "@/components/EditGoalDialog";

const Index = () => {
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);

  const { data: goals, isLoading } = useQuery({
    queryKey: ["savings-goals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("savings_goals")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const { data: deposits } = useQuery({
    queryKey: ["deposits"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deposits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const totalSavings = goals?.reduce((sum, goal) => sum + (goal.current_amount || 0), 0) || 0;
  const monthlyIncrease = deposits
    ?.filter((deposit) => {
      const depositDate = new Date(deposit.created_at);
      const now = new Date();
      return (
        depositDate.getMonth() === now.getMonth() &&
        depositDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce((sum, deposit) => sum + deposit.amount, 0) || 0;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container max-w-md mx-auto p-4 space-y-6">
        <header className="text-center py-6">
          <h1 className="text-2xl font-bold text-gray-900">My Savings</h1>
          <p className="text-gray-600 mt-1">Track your savings goals</p>
        </header>

        <SavingsOverview 
          totalSavings={totalSavings} 
          monthlyIncrease={monthlyIncrease} 
        />

        <div className="flex justify-between gap-4">
          <AddGoalDialog />
          <AddDepositDialog goals={goals?.map(g => ({ id: g.id, title: g.title })) ?? []} />
        </div>

        <div className="space-y-4">
          {goals?.map((goal) => (
            <SavingsGoal
              key={goal.id}
              id={goal.id}
              title={goal.title}
              target={goal.target_amount}
              current={goal.current_amount || 0}
              onEdit={setEditingGoalId}
            />
          ))}
        </div>
      </div>
      
      {editingGoalId && (
        <EditGoalDialog
          goalId={editingGoalId}
          onClose={() => setEditingGoalId(null)}
        />
      )}
    </div>
  );
};

export default Index;