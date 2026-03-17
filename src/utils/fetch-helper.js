import dotenv from "dotenv";
import { Octokit } from "@octokit/rest";    

class FetchHelper {
    constructor() {
        dotenv.config();

        this.octokit = new Octokit({
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
    }

    async getTopOpenSourceRepos() {
        try {
            const response = await this.octokit.rest.search.repos({
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
}

export default FetchHelper;