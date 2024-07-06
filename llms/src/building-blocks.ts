import 'dotenv/config';

import {ChatOpenAI} from "@langchain/openai";
import {RunnableSequence} from "@langchain/core/runnables";
import {ChatPromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
(async () => {
	const model = new ChatOpenAI({
		modelName: "gpt-4o"
	});

	const parser = new StringOutputParser();

	// const prompt = ChatPromptTemplate.fromTemplate(
	// 	`What are three good names for a company that makes {product}?`
	// )

	const prompt = ChatPromptTemplate.fromMessages([
		["system", "You are an expert at picking company names."],
		["human", "What are three good names for a company that makes {product}?"]
	])

	await prompt.formatMessages({
		product: "chatbots"
	})

	// const chain = prompt.pipe(model).pipe(parser);
	//
	// const response = await chain.invoke({
	// 	product: "chatbots"
	// });

	const chain = RunnableSequence.from([
		prompt,
		model,
		parser
	]);

	const response = await chain.invoke({
		product: "chatbots"
	});

	console.log('---- invoked: ', response);

	const stream = await chain.stream({
		product: "chatbots"
	});

	console.log('---- stream: ');
	for await (const output of stream) {
		process.stdout.write(output);
	}
	process.stdout.write('\n');

	const batch = await chain.batch([
		{product: "cars"},
		{product: "computers"},
	]);

	console.log('---- batch: ');

	for (const output of batch) {
		console.log(output);
	}
})();
