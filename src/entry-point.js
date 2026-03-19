import FetchRepositoryFields from "./middleware/fetch-repository-fields.js";

const STAR_THRESHOLD = 1000;
const CONTRIBUTOR_THRESHOLD = 100;
const REPO_COUNT = 10;

async function main() {
    const fetchRepositoryFields = new FetchRepositoryFields(STAR_THRESHOLD, CONTRIBUTOR_THRESHOLD, REPO_COUNT);
    // wait for the middleware async initialization to finish so logs appear
    if (fetchRepositoryFields && fetchRepositoryFields.ready) {
        await fetchRepositoryFields.ready;
    }
}

main();