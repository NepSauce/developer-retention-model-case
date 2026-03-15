import { dotenv } from "dotenv";
import { Octokit } from "@octokit/rest";    

dotenv.config();

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
});