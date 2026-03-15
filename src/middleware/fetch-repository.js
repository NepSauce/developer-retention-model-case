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
});

async function getTopOpenSourceRepos() {
    try {
        const response = await octokit.rest.search.repos({
            q: "stars:>50000",
            sort: "stars",
            order: "desc",
            per_page: 10
        });
        return response.data.items;
    } catch (error) {
        console.error("Error:", error);
    }
}

getTopOpenSourceRepos().then(repos => {
    console.log("Top Open Source Repositories:");
    repos.forEach(repo => {
        console.log(`${repo.full_name} - ${repo.stargazers_count}`);
    });
});