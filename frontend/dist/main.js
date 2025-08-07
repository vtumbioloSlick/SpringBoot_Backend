"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("id3-form");
    const output = document.getElementById("output");
    form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        output.textContent = "Running ID3...\n";
        try {
            // Get Accuracy First
            const accuracyResponse = yield fetch("http://localhost:8080/accuracy");
            if (!accuracyResponse.ok)
                throw new Error("Failed to fetch accuracy");
            const accuracy = yield accuracyResponse.json();
            output.textContent += `\nAccuracy: ${accuracy.toFixed(2)}%`;
            // Get Tree Structure
            // List Rules
            const rulesResponse = yield fetch("http://localhost:8080/rules?measure=infoGain");
            if (!rulesResponse.ok)
                throw new Error("Failed to fetch rules");
            const rules = yield rulesResponse.json();
            output.textContent += "\nGenerated Rules:\n" + rules.join("\n");
        }
        catch (error) {
            console.error("Error:", error);
            output.textContent += `\nError: ${error}`;
        }
    }));
});
