Certainly! Here's the entire README content in one block for easy copying:

---

# Vulnerability Lookup App

This is a simple web application that allows users to look up vulnerability information using CVE IDs. It fetches data from the NVD for CVSS scores and from the FIRST.org API for EPSS scores.

## Live Demo

You can view a live demo of this project hosted on **GitHub Pages**. This demo provides a real-time preview of the `cvss-epss-demo` repository. 

Check it out here: [CVSS EPSS Demo](https://dchandlerp.github.io/cvss-epss-demo/)

The demo is automatically updated with each push to the main branch, ensuring that it always reflects the latest changes.


## Features

- **Lookup CVSS Scores**: Get detailed CVSS scores for vulnerabilities from the NVD.
- **Lookup EPSS Scores**: Retrieve EPSS scores to understand the exploitability of vulnerabilities.
- **Toggle between APIs**: Easily switch between fetching CVSS and EPSS data.

## Setup

To run the application locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/vulnerability-lookup-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd vulnerability-lookup-app
   ```

3. **Open `index.html` in a web browser**:
   - You can do this by double-clicking the `index.html` file or using a live server extension in your code editor.

## Usage

1. **Enter a CVE ID**: Type or paste a CVE ID into the input field. A default example (CVE-2019-1010218) is provided.

2. **Choose an API**: Select either the CVSS or EPSS option to determine which scores to fetch.

3. **Get Info**: Click the "Get Info" button to retrieve and display the vulnerability information.

## Dependencies

This project does not require any external dependencies or package installations. It uses:

- **HTML/CSS**: For the structure and styling of the web page.
- **JavaScript**: To handle API requests and data display.

## APIs Used

- **NVD API**: To fetch CVSS scores.
  - Base URL: `https://services.nvd.nist.gov/rest/json/cves/2.0`
  
- **FIRST.org EPSS API**: To fetch EPSS scores.
  - Base URL: `https://api.first.org/data/v1/epss`

## Contributing

If you want to contribute to this project, please fork the repository and create a pull request with your changes. Contributions are welcome!

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.




