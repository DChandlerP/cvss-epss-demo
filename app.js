document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetchButton').addEventListener('click', fetchVulnerabilityData);
});

async function fetchVulnerabilityData() {
    const vulnId = document.getElementById('vulnId').value;
    const resultDiv = document.getElementById('result');
    const selectedApi = document.querySelector('input[name="api"]:checked').value;
    resultDiv.innerHTML = 'Loading...';

    try {
        if (selectedApi === 'cvss') {
            await fetchCVSSData(vulnId, resultDiv);
        } else if (selectedApi === 'epss') {
            await fetchEPSSData(vulnId, resultDiv);
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data. Please try again later.';
    }
}

async function fetchCVSSData(vulnId, resultDiv) {
    const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${vulnId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    if (data.vulnerabilities && data.vulnerabilities.length > 0) {
        const vulnerability = data.vulnerabilities[0].cve;
        const cvssMetrics = vulnerability.metrics.cvssMetricV31 ? vulnerability.metrics.cvssMetricV31[0] : null;

        if (cvssMetrics) {
            displayCVSSData(vulnId, cvssMetrics, resultDiv);
        } else {
            resultDiv.innerHTML = 'No CVSS metrics found for the given CVE ID.';
        }
    } else {
        resultDiv.innerHTML = 'No data found for the given CVE ID.';
    }
}

function displayCVSSData(vulnId, cvssMetrics, resultDiv) {
    const cvssData = cvssMetrics.cvssData;
    resultDiv.innerHTML = `
        <h2>Vulnerability: ${vulnId}</h2>
        <p><strong>CVSS Version:</strong> ${cvssData.version}</p>
        <p><strong>Base Score:</strong> ${cvssData.baseScore}</p>
        <p><strong>Base Severity:</strong> ${cvssData.baseSeverity}</p>
        <p><strong>Exploitability Score:</strong> ${cvssMetrics.exploitabilityScore}</p>
        <p><strong>Impact Score:</strong> ${cvssMetrics.impactScore}</p>
        <p><strong>Attack Vector:</strong> ${cvssData.attackVector}</p>
        <p><strong>Attack Complexity:</strong> ${cvssData.attackComplexity}</p>
        <p><strong>Privileges Required:</strong> ${cvssData.privilegesRequired}</p>
        <p><strong>User Interaction:</strong> ${cvssData.userInteraction}</p>
        <p><strong>Confidentiality Impact:</strong> ${cvssData.confidentialityImpact}</p>
        <p><strong>Integrity Impact:</strong> ${cvssData.integrityImpact}</p>
        <p><strong>Availability Impact:</strong> ${cvssData.availabilityImpact}</p>
    `;
}


async function fetchEPSSData(vulnId, resultDiv) {
    const response = await fetch(`https://api.first.org/data/v1/epss?cve=${vulnId}`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

    if (data.data && data.data.length > 0) {
        const epssData = data.data[0];
        displayEPSSData(vulnId, epssData, resultDiv);
    } else {
        resultDiv.innerHTML = 'No data found for the given CVE ID.';
    }
}

function displayEPSSData(vulnId, epssData, resultDiv) {
    const epssScore = epssData.epss || 'N/A';
    const percentile = epssData.percentile || 'N/A';

    resultDiv.innerHTML = `
        <h2>Vulnerability: ${vulnId}</h2>
        <p><strong>EPSS Score:</strong> ${epssScore}</p>
        <p><strong>Percentile:</strong> ${percentile}</p>
        <p>EPSS Score: Indicates the probability of a vulnerability being exploited soon.</p>
        <p>Percentile: Shows how the vulnerability ranks compared to others.</p>
        <p>Combined Insight: Using EPSS with CVSS helps prioritize vulnerabilities by both severity and likelihood of exploitation, offering a comprehensive threat assessment.</p>
    `;
}
