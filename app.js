// This version includes advanced features: Scenario Analysis, Variable Assumptions, Graphical Representation, and User Authentication.
// Note: This is a simplified example. In a real-world scenario, user authentication should be handled securely on the server.

// Array to store scenarios
let scenarios = [];

function calculateProjections() {
    // Get input values
    const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
    const monthlyRevenue = parseFloat(document.getElementById('monthly-revenue').value);
    const monthlyExpenses = parseFloat(document.getElementById('monthly-expenses').value);
    const months = parseInt(document.getElementById('months').value);

    // Calculate projections
    const projections = [];
    let totalRevenue = 0;
    let totalExpenses = 0;

    for (let i = 1; i <= months; i++) {
        totalRevenue += monthlyRevenue;
        totalExpenses += monthlyExpenses;

        projections.push({
            month: i,
            totalRevenue,
            totalExpenses,
            netProfit: totalRevenue - totalExpenses
        });
    }

    // Display projections
    displayProjections(projections);

    // Update and display the scenario dropdown
    updateScenarioDropdown();
}

function displayProjections(projections) {
    const projectionsContainer = document.getElementById('projections-container');
    projectionsContainer.innerHTML = '';

    const table = document.createElement('table');
    table.innerHTML = `<tr>
                        <th>Month</th>
                        <th>Total Revenue</th>
                        <th>Total Expenses</th>
                        <th>Net Profit</th>
                    </tr>`;

    projections.forEach(projection => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${projection.month}</td>
                        <td>${projection.totalRevenue.toFixed(2)}</td>
                        <td>${projection.totalExpenses.toFixed(2)}</td>
                        <td>${projection.netProfit.toFixed(2)}</td>`;
        table.appendChild(row);
    });

    projectionsContainer.appendChild(table);
}

function saveScenario() {
    // Get input values
    const scenarioName = document.getElementById('scenario-name').value;

    // Validate scenario name
    if (!scenarioName) {
        alert('Please enter a scenario name.');
        return;
    }

    // Store scenario data
    const scenarioData = {
        name: scenarioName,
        assumptions: {
            initialInvestment: parseFloat(document.getElementById('initial-investment').value),
            monthlyRevenue: parseFloat(document.getElementById('monthly-revenue').value),
            monthlyExpenses: parseFloat(document.getElementById('monthly-expenses').value),
            months: parseInt(document.getElementById('months').value)
            // Add more assumptions as needed
        }
    };

    // Save scenario
    scenarios.push(scenarioData);

    // Update and display the scenario dropdown
    updateScenarioDropdown();

    // Clear input fields
    document.getElementById('scenario-name').value = '';
}

function loadScenario() {
    // Load selected scenario and update input fields
    const selectScenario = document.getElementById('select-scenario');
    const selectedScenarioIndex = selectScenario.selectedIndex;

    if (selectedScenarioIndex > 0) {
        const selectedScenario = scenarios[selectedScenarioIndex - 1];

        document.getElementById('scenario-name').value = selectedScenario.name;
        document.getElementById('initial-investment').value = selectedScenario.assumptions.initialInvestment;
        document.getElementById('monthly-revenue').value = selectedScenario.assumptions.monthlyRevenue;
        document.getElementById('monthly-expenses').value = selectedScenario.assumptions.monthlyExpenses;
        document.getElementById('months').value = selectedScenario.assumptions.months;
    }
}

function updateScenarioDropdown() {
    // Update the scenario dropdown
    const selectScenario = document.getElementById('select-scenario');
    selectScenario.innerHTML = '<option value="" selected>Select Scenario</option>';

    scenarios.forEach((scenario, index) => {
        const option = document.createElement('option');
        option.value = index + 1;
        option.text = scenario.name;
        selectScenario.appendChild(option);
    });
}