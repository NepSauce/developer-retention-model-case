import FetchHelper from "../utils/fetch-helper.js";

class FetchRepositoryFields {
    constructor(starThreshold, repoCount) {
        this.fetchHelper = new FetchHelper();
        this.starThreshold = starThreshold; 
        this.repoCount = repoCount;

        (async () => {
            try {
                const repositories = await this.fetchHelper.getTopOpenSourceRepos(this.starThreshold);

                if (!repositories || repositories.length === 0) {
                    console.log("No repositories found.");
                    return;
                }
                
                const topRepos = repositories.slice(0, this.repoCount);

                for (const repo of topRepos) {
                    console.log(`Repository: ${repo.full_name}`);
                    console.log(`Stars: ${repo.stargazers_count}`);
                }
            } catch (err) {
                console.error("Error fetching repositories:", err);
            }
        })();
    }
}

export default FetchRepositoryFields;