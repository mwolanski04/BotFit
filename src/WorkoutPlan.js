import { useNavigate } from 'react-router-dom';

const WorkoutPlan = () => {
    const navigate = useNavigate();
    const data = [
        { exercise: "Pushups", repetitions: "10", sets: 5, tutorial: "https://www.youtube.com/watch?v=IODxDxX7oi4" },
        { exercise: "Squats", repetitions: "15", sets: 3, tutorial: "https://www.youtube.com/watch?v=aclHkVaku9U" },
        { exercise: "Planks", repetitions: "30 seconds", sets: 3, tutorial: "https://www.youtube.com/watch?v=pSHjTRCQxIw" }
    ];
    const dayOfWeek = "Monday";
    const workoutFocus = "Full Body Strength";

    const updatePlan = () => {
        navigate('/WorkoutPlanForm');
    }

    return (
        <div style = {styles.wrapper}>
            <h2>Your Workout Plan</h2>
            <h3 style = {styles.subheader}>{dayOfWeek} - {workoutFocus}</h3>
            
            <table style = {styles.table}>
                <thead>
                    <tr style = {styles.tr}>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Repetitions/Duration</th>
                        <th>Tutorial</th>
                    </tr>
                </thead>

                <tbody style = {styles.tbody}>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td style = {styles.td}>{item.exercise}</td>
                            <td style = {styles.td}>{item.sets}</td>
                            <td style = {styles.td}>{item.repetitions}</td>
                            <td style = {styles.td}>
                                <a href={item.tutorial} target="_blank" rel="noopener noreferrer">
                                    Watch a tutorial
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button style = {styles.button} onClick={updatePlan}>
                Update Workout Plan
            </button>
        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' },
    table: { width: '80%', borderCollapse: 'collapse', backgroundColor: '#00ff88', color: '#333'},
    tr: { borderBottom: '2px solid #333', padding: '5px', fontSize: '20px', fontStyle: 'italic' },
    td: { borderBottom: '1px solid #333', padding: '10px', textAlign: 'center' },
    button: { marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#333', color: '#fff', border: 'none', cursor: 'pointer' }
};

export default WorkoutPlan;