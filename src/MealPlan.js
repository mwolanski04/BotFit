const MealPlan = () => {
    const data = [
        { when: "Breakfast", meal: "Scrambled Eggs", link: "https://www.simplyrecipes.com/recipes/how_to_make_fluffy_scrambled_eggs/" },
        { when: "Lunch", meal: "Grilled Chicken Salad", link: "https://www.delish.com/cooking/recipe-ideas/a19665918/grilled-chicken-salad-recipe/" },
        { when: "Dinner", meal: "Salmon with Veggies", link: "https://www.lecremedelacrumb.com/one-pan-baked-teriyaki-salmon-and-vegetables/" }
    ];

    return (
        <div style = {styles.wrapper}>
            <h2>Your Meal Plan</h2>

            <table style = {styles.table}>
                <thead>
                    <tr style = {styles.tr}>
                        <th>Time of Day</th>
                        <th>Meal</th>
                        <th>Link</th>
                    </tr>
                </thead>

                <tbody style = {styles.tbody}>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td style = {styles.td}>{item.when}</td>
                            <td style = {styles.td}>{item.meal}</td>
                            <td style = {styles.td}>
                                <a href={item.link} target="_blank" rel="noreferrer">
                                    View a recommended recipe
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    wrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' },
    table: { width: '80%', borderCollapse: 'collapse', backgroundColor: '#00ff88', color: '#333'},
    tr: { borderBottom: '2px solid #333', padding: '5px', fontSize: '20px', fontStyle: 'italic' },
    td: { borderBottom: '1px solid #333', padding: '10px', textAlign: 'center' },
};

export default MealPlan;