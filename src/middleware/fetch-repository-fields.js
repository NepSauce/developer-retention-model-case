import FetchHelper from "../utils/fetch-helper";

class FetchRepositoryFields {
    constructor(starThreshold, repoCount) {
        this.fetchHelper = new FetchHelper();
        this.starThreshold = starThreshold; 
        this.repoCount = repoCount;

        const repositories = this.fetchHelper.getTopOpenSourceRepos(this.starThreshold);
        this.repositories = repositories.slice(0, this.repoCount);

        console.log(`Fetched top ${this.repoCount} repositories with more than ${this.starThreshold} stars.`);
    }   
}