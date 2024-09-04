import { getBearerTokenProvider, InteractiveBrowserCredential } from "@azure/identity";
import { AzureOpenAI } from "openai";

const credential = new InteractiveBrowserCredential({
  tenantId: "72f988bf-86f1-41af-91ab-2d7cd011db47",
  clientId: "6e4c509e-2b65-40dc-b461-beb2c824f63a",
});
const scope = "user.read";
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

const deployment = "gpt-4o";
const apiVersion = "2024-07-01-preview";
const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion, endpoint: "https://proto-api.azure-api.net/" });

document.querySelector("form")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const userMessage = formData.get("message") as string;
  const response = await client.chat.completions
    .create({
      messages: [{ role: "user", content: userMessage }],
      model: "gpt-4o",
    })
    .catch((e) => e);

  document.querySelector("#output")!.textContent = JSON.stringify({ response }, null, 2);
});
