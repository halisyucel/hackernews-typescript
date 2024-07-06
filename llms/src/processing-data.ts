import "dotenv/config";
// import {PDFLoader} from "@langchain/community/document_loaders/fs/pdf";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import {GithubRepoLoader} from "@langchain/community/document_loaders/web/github";

const repoLoader = new GithubRepoLoader(
	"https://github.com/langchain-ai/langchainjs",
	{recursive: false, ignorePaths: ["*.md", "yarn.lock"]}
);

// const pdfLoader = new PDFLoader('../assets/lecture-1.pdf');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
	const files = await repoLoader.load();

	console.log(files.slice(0, 3))

	// const pdf = await pdfLoader.load();

	// console.log(pdf.slice(0, 5) + '...')

	const code = `function add(a, b) {
	// Add two numbers
	return a + b;
}`

	const splitter = new RecursiveCharacterTextSplitter({
		chunkSize: 32,
		chunkOverlap: 0,
	});

	const splits = await splitter.splitText(code);

	console.log(splits);
})();
