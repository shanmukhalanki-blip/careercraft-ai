const API_URL = "https://careercraft-ai-2475.onrender.com";

// Get elements
const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("resume");
const resultDiv = document.getElementById("result");
const loading = document.getElementById("loading");

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = fileInput.files[0];

  if (!file) {
    alert("Please upload a resume");
    return;
  }

  const formData = new FormData();
  formData.append("resume", file);

  try {
    // Show loading
    loading.style.display = "block";
    resultDiv.innerHTML = "";

    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();

    // Hide loading
    loading.style.display = "none";

    // Display result
    resultDiv.innerHTML = `
      <h2>ATS Score: ${data.score}%</h2>
      
      <h3>Missing Keywords:</h3>
      <ul>
        ${data.missing_keywords.map(k => `<li>${k}</li>`).join("")}
      </ul>

      <h3>Suggestions:</h3>
      <ul>
        ${data.suggestions.map(s => `<li>${s}</li>`).join("")}
      </ul>

      <button onclick="alert('Upgrade feature coming soon!')">
        Upgrade Resume – ₹199
      </button>
    `;

  } catch (error) {
    loading.style.display = "none";
    resultDiv.innerHTML = `
      <p style="color:red;">⚠ Failed: Resume<br>${error.message}</p>
    `;
  }
});