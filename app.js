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
            // Fetch CVSS data from the NVD API
            const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${vulnId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (data.vulnerabilities && data.vulnerabilities.length > 0) {
                const vulnerability = data.vulnerabilities[0].cve;
        
                const cvssMetrics = vulnerability.metrics.cvssMetricV31 ? vulnerability.metrics.cvssMetricV31[0] : null;

                if (cvssMetrics) {
                    const cvssData = cvssMetrics.cvssData;
                    resultDiv.innerHTML = `
                        <h2>Vulnerability: ${vulnId}</h2>
                        <p><strong>CVSS Version:</strong> ${cvssData.version}</p>
                        <p><strong>Vector String:</strong> ${cvssData.vectorString}</p>
                        <p><strong>Base Score:</strong> ${cvssData.baseScore}</p>
                        <p><strong>Base Severity:</strong> ${cvssData.baseSeverity}</p>
                        <p><strong>Exploitability Score:</strong> ${cvssMetrics.exploitabilityScore}</p>
                        <p><strong>Impact Score:</strong> ${cvssMetrics.impactScore}</p>
                    `;
                } else {
                    resultDiv.innerHTML = 'No CVSS metrics found for the given CVE ID.';
                }
            } else {
                resultDiv.innerHTML = 'No data found for the given CVE ID.';
            }
        } else if (selectedApi === 'epss') {
            // Fetch EPSS data from the FIRST.org API
            const response = await fetch(`https://api.first.org/data/v1/epss?cve=${vulnId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (data.data && data.data.length > 0) {
                const epssData = data.data[0];
                const epssScore = epssData.epss || 'N/A';
                const percentile = epssData.percentile || 'N/A';

                resultDiv.innerHTML = `
                    <h2>Vulnerability: ${vulnId}</h2>
                    <p><strong>EPSS Score:</strong> ${epssScore}</p>
                    <p><strong>Percentile:</strong> ${percentile}</p>
                `;
            } else {
                resultDiv.innerHTML = 'No data found for the given CVE ID.';
            }
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error fetching data. Please try again later.';
    }
}

