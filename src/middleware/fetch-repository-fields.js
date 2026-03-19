import FetchHelper from "../utils/fetch-helper.js";

class FetchRepositoryFields {
    constructor(starThreshold, contributorThreshold, repoCount) {
        this.fetchHelper = new FetchHelper();
        this.starThreshold = starThreshold; 
        this.contributorThreshold = contributorThreshold;
        this.repoCount = repoCount;

        (async () => {
            try {
                const repositories = await this.fetchHelper.getTopOpenSourceRepos(this.starThreshold);
                const filteredRepos = await this.getReposPastContributorThreshold(repositories, this.contributorThreshold);

                if (!filteredRepos || filteredRepos.length === 0) {
                    console.log("No repositories found.");
                    return;
                }
                
                const topRepos = filteredRepos.slice(0, this.repoCount);

                for (const repo of topRepos) {
                    console.log(`Repository: ${repo.full_name}`);
                    console.log(`Stars: ${repo.stargazers_count}`);
                    console.log(`Contributors: ${repo.contributors_count}`);
                }
            } catch (err) {
                console.error("Error fetching repositories:", err);
            }
        })();
    }

    async getReposPastContributorThreshold(repositories, contributorThreshold) {
        const filteredRepos = [];

        for (const repo of repositories) {
            try {
                const contributors = await this.fetchHelper.getRepoContributorStats(repo.owner.login, repo.name) || [];
                const contributorCount = contributors.length;

                if (contributorCount > contributorThreshold) {
                    filteredRepos.push(repo);
                }
            } catch (err) {
                console.error(`Failed to fetch contributors for ${repo.full_name}:`, err);
            }
        }
        return filteredRepos;

    }
}

export default FetchRepositoryFields;