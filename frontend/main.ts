document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("id3-form") as HTMLFormElement;
  const output = document.getElementById("output") as HTMLPreElement;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    output.textContent = "Running ID3...\n";

    try {

      // Get Accuracy First
      const accuracyResponse = await fetch("http://localhost:8080/accuracy");
      if (!accuracyResponse.ok) throw new Error("Failed to fetch accuracy");

      const accuracy: number = await accuracyResponse.json();
      output.textContent += `\nAccuracy: ${accuracy.toFixed(2)}%`;


      // Get Tree Structure


      // List Rules
      const rulesResponse = await fetch("http://localhost:8080/rules?measure=infoGain");
      if (!rulesResponse.ok) throw new Error("Failed to fetch rules");

      const rules: string[] = await rulesResponse.json();
      output.textContent += "\nGenerated Rules:\n" + rules.join("\n");



    } catch (error) {
      console.error("Error:", error);
      output.textContent += `\nError: ${error}`;
    }
  });
});
