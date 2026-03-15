import { dotenv } from "dotenv";
import { Octokit } from "@octokit/rest";    

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: "Developer Retention Model Case Study",
    baseUrl: "https://api.github.com",
    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
    },
    request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0
    }  
})
(async () => {
    
})();