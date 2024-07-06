import {FormEvent, useState} from "react";
import {gql} from "../../__generated__";
import {useMutation} from "@apollo/client";

const CREATE_LINK_MUTATION = gql(`
    mutation PostMutation(
        $description: String!
        $url: String!
    ) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`);

export default function Form(): JSX.Element {
	const [description, setDescription] = useState('');
	const [url, setUrl] = useState('');

	// @ts-ignore
	const [createLink] = useMutation(CREATE_LINK_MUTATION, {
		variables: {
			description,
			url,
		}
	});

	const handleSubmit = () => {
		createLink()
			.then(() => {
				setDescription('');
				setUrl('');
			});
	}

	return (
		<div className="border-b-2 border-dashed p-2 pb-4 m-2 flex justify-center items-end">
			<div className="flex flex-col w-[200px] mr-4">
				<label className="font-light">Description</label>
				<input
					type="text"
					className="h-8 border-2 border-gray-300 py-1 px-2"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<div className="flex flex-col w-[200px] mr-4">
				<label className="font-light">URL</label>
				<input
					type="text"
					className="h-8 border-2 border-gray-300 py-1 px-2"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>
			<button className="h-8 bg-blue-500 text-white px-4 rounded" onClick={handleSubmit}>
				Submit
			</button>
		</div>
	)
}