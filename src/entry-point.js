import FetchRepositoryFields from "./middleware/fetch-repository-fields.js";

const STAR_THRESHOLD = 50000;
const REPO_COUNT = 10;

async function main() {
    const fetchRepositoryFields = new FetchRepositoryFields(STAR_THRESHOLD, REPO_COUNT);
}

main();