import { useNavigate } from "react-router-dom";

const WorkoutPlanForm = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/WorkoutPlan');
        alert("Your workout plan has been updated!");
    }

    return (
        <div style={styles.wrapper}>
            <h2>Workout Plan Form</h2>
            
            <form style={styles.form}>
                <label style={styles.label}>Reason for wanting to update your workout plan:</label>
                <select style={styles.input}>
                    <option>Unable to access equipment</option>
                    <option>Injury or health reasons</option>
                    <option>Not enjoyable</option>
                    <option>Too difficult</option>
                    <option>Other</option>
                </select>
                <label style={styles.label}>Is there anything we should account for in future workouts?</label>
                <textarea style={styles.input} placeholder="Additional details (optional)" rows="4" />
                <button style={styles.input} onClick={handleSubmit} type="submit">Change Workout Plan</button>
            </form>

        </div>
    )
}

const styles = {
    wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px', margin: '2rem auto' },
    label: { fontSize: '1.2rem', color: '#00ff88' },
    input: { padding: '0.5rem', fontSize: '1rem' }
};

export default WorkoutPlanForm;