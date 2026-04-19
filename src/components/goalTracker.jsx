import { useState } from "react";
import { useAddGoal } from "../hooks/useAddGoal.js";
import { useGetGoals } from "../hooks/useGetGoals.js";

export const GoalTracker = () => {
    const [goalName, setGoalName] = useState("");
    const [targetAmount, setTargetAmount] = useState(0);
    const [savedAmount, setSavedAmount] = useState(0);

    const { addGoal } = useAddGoal();
    const { goals } = useGetGoals();

    const onSubmit = (e) => {
        e.preventDefault();
        
        addGoal({goalName, targetAmount, savedAmount});

        setGoalName("");
        setTargetAmount(0);
        setSavedAmount(0);
    }

    return (
        <div className="goal-tracker">
            <h1> Goal Tracker </h1>
            <form className="add-goal" onSubmit={onSubmit}>
                <input type="text" placeholder="Goal Name" value={goalName} required onChange={(e) => setGoalName(e.target.value)} />
                <input type="number" placeholder="Target Amount" value={targetAmount} required onChange={(e) => setTargetAmount(e.target.value)} />
                <input type="number" placeholder="Saved Amount" value={savedAmount} required onChange={(e) => setSavedAmount(e.target.value)} />
                <button type="submit">Add Goal</button>
            </form>

            <div className="goals-list">
                {goals.map((goal) => {
                    const progressPercentage = ((goal.savedAmount / goal.targetAmount) * 100).toFixed(1);
                    const isCompleted = goal.savedAmount >= goal.targetAmount;
                    
                    return (
                        <div key={goal.id}>
                            <div className="goal-header">
                                <strong>{goal.goalName}</strong>
                                <span>£{goal.savedAmount} / £{goal.targetAmount}</span>
                            </div>

                        <progress value={goal.savedAmount} max={goal.targetAmount} />

                        <p>
                            {progressPercentage}% Saved
                        </p>
                        
                        </div>
                    )
                })}
            </div>
        </div>
    );
};