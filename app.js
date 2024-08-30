document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('fetchButton').addEventListener('click', fetchVulnerabilityData);
});

async function fetchVulnerabilityData() {
    const vulnId = document.getElementById('vulnId').value;
    const resultDiv = document.getElementById('result');
    const selectedApi = document.querySelector('input[name="api"]:checked').value;
    resultDiv.innerHTML = 'Loading...';

    try {
        let response, data;

        if (selectedApi === 'cvss') {
            response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${vulnId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            data = await response.json();

            if (data.vulnerabilities && data.vulnerabilities.length > 0) {
                const vulnerability = data.vulnerabilities[0];
                const cvssScore = vulnerability.cvssMetricV3 ? vulnerability.cvssMetricV3.baseScore : 'N/A';

                resultDiv.innerHTML = `
                    <h2>Vulnerability: ${vulnId}</h2>
                    <p><strong>CVSS Score:</strong> ${cvssScore}</p>
                `;
            } else {
                resultDiv.innerHTML = 'No data found for the given CVE ID.';
            }
        } else if (selectedApi === 'epss') {
            response = await fetch(`https://api.first.org/data/v1/epss?cve=${vulnId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            data = await response.json();

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
