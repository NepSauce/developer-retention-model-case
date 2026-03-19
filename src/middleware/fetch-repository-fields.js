import FetchHelper from "../utils/fetch-helper.js";

class FetchRepositoryFields {
    constructor(starThreshold, contributorThreshold, repoCount) {
        this.fetchHelper = new FetchHelper();
        this.starThreshold = starThreshold; 
        this.contributorThreshold = contributorThreshold;
        this.repoCount = repoCount;

        this.ready = (async () => {
            console.log("FetchRepositoryFields: initialization started");
            try {
                const repositories = await this.fetchHelper.getTopOpenSourceRepos(this.starThreshold) || [];
                console.log(`FetchRepositoryFields: fetched ${repositories.length} repositories`);
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
            console.log(`Checking contributors for ${repo.full_name}`);

            try {
                const contributors = await this.fetchHelper.getRepoContributors(repo.owner.login, repo.name) || [];
                const contributorCount = contributors.length;
                console.log(` -> ${repo.full_name}: ${contributorCount} contributors`);

                if (contributorCount >= contributorThreshold) {
                    repo.contributors_count = contributorCount;
                    filteredRepos.push(repo);
                }
            } catch (err) {
                const msg = err && err.response && err.response.data && err.response.data.message ? 
                    err.response.data.message : (err && err.message) || '';
                
                if (msg && msg.toLowerCase().includes('too large')) {
                    repo.contributors_count = contributorThreshold + 1;
                    filteredRepos.push(repo);
                } else {
                    console.error(`Failed to fetch contributors for ${repo.full_name}:`, err);
                }
            }
        }
        return filteredRepos;

    }
}

export default FetchRepositoryFields;