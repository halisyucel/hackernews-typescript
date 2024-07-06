import "dotenv/config";

// import {similarity} from "ml-distance";
import {OpenAIEmbeddings} from "@langchain/openai";
import {MemoryVectorStore} from "langchain/vectorstores/memory";

(async (): Promise<void> => {
	const embeddings = new OpenAIEmbeddings();

	const embed1 = await embeddings.embedQuery("aaaaaaaaa");
	const embed2 = await embeddings.embedQuery("bjhggktılşreş");

	// const similarityScore = similarity.cosine(embed1, embed2);
	// console.log(similarityScore)

	// const store = new MemoryVectorStore(embeddings);
	//
	// import {PDFLoader} from "langchain/document_loaders/fs/pdf";
	// import {
	// 	RecursiveCharacterTextSplitter
	// } from "langchain/text_splitter";
	//
	// const loader = new PDFLoader("./data/MachineLearning-Lecture01.pdf");
	//
	// const rawCS229Docs = await loader.load();
	//
	// const splitter = new RecursiveCharacterTextSplitter({
	// 	chunkSize: 128,
	// 	chunkOverlap: 0,
	// });
	//
	// const splitDocs = await splitter.splitDocuments(rawCS229Docs);
	//
	// await vectorstore.addDocuments(splitDocs);
	//
	// const retrievedDocs = await vectorstore.similaritySearch(
	// 	"What is deep learning?",
	// 	4
	// );
	//
	// const pageContents = retrievedDocs.map(doc => doc.pageContent);
	//
	// const retriever = vectorstore.asRetriever();
	//
	// await retriever.invoke("What is deep learning?")
})();
