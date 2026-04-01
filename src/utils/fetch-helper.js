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

    async getTopOpenSourceRepos(starThreshold, count) {
        try {
            const response = await this.octokit.rest.search.repos({
                q: `stars:>${starThreshold}`,
                sort: "stars",
                order: "desc",
                per_page: count
            });

            return response.data.items;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async getRepoContributors(owner, repo) {
        try {
            const contributors = await this.octokit.paginate(this.octokit.rest.repos.listContributors, {
                owner,
                repo,
                per_page: 100
            });

            return contributors;
        } catch (error) {
            console.error("Error fetching contributors:", error);
            return [];
        }
    }

    async getRepoContributorDetails(userName) {
        try {
            const response = await this.octokit.rest.users.getByUsername({
                username: userName
            });

            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }

    async getRepoContributorStats(owner, repo) {
        try {
            const response = await this.octokit.rest.repos.getContributorsStats({
                owner,
                repo,
            });

            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
}
export default FetchHelper;