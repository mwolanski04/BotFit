import React, { useEffect } from 'react';

const MealPlan = () => {
    //function createMealTable() {
        useEffect(() => {
                const data = [
                    { when: "Breakfast", meal: "Scrambled Eggs", link: "https://www.simplyrecipes.com/recipes/how_to_make_fluffy_scrambled_eggs/" },
                    { when: "Lunch", meal: "Grilled Chicken Salad", link: "https://www.delish.com/cooking/recipe-ideas/a19665918/grilled-chicken-salad-recipe/" },
                    { when: "Dinner", meal: "Salmon with Veggies", link: "https://www.foodnetwork.com/recipes/food-network-kitchen/salmon-with-roasted-vegetables-recipe-2109877" }
                ];

                const table = document.createElement("table");
                table.border = "1";

                const headers = ["Time of Day", "Meal", "Link"];
                const headerRow = document.createElement("tr");

                headers.forEach(text => {
                    const th = document.createElement("th");
                    th.textContent = text;
                    headerRow.appendChild(th);
                });
                table.appendChild(headerRow);

                data.forEach(item => {
                    const row = document.createElement("tr");
                    Object.values(item).forEach(value => {
                        const cell = document.createElement("td");
                        cell.textContent = value;
                        row.appendChild(cell);
                    });
                    table.appendChild(row);
                });

                document.getElementById("table-container").appendChild(table);
            }, []);

    return (
        <div>
            <h2>Your Meal Plan</h2>
            <div id="table-container"></div>
        </div>
    );
};

export default MealPlan;