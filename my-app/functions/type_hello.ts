import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const TypeHello = DefineFunction({
	callback_id: "type_hello_function",
	title: "Type Hello",
	description: "Type Hello",
	source_file: "functions/type_hello.ts",
	input_parameters: {
		properties: {
			message: {
				type: Schema.types.string
			}
		},
		required: ["message"],
	},
	output_parameters: {
		properties: {
			channel: {
				type: Schema.slack.types.channel_id,
			},
			submitting_user: {
				type: Schema.slack.types.user_id,
			},
			message: {
				type: Schema.types.string
			}
		},
		required: ["submitting_user", "message"],
	},
});

export default SlackFunction(
	TypeHello, 
	async ({ inputs, client }) => {
		const { channel, submitting_user, message } = inputs;

		// Send a message to channel using a nicely formatted
		// message using block elements from Block Kit.
		// https://api.slack.com/block-kit
		await client.chat.postMessage({
			channel,
			blocks: [
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": `Hello <@${submitting_user}>!`,
					},
				},
				{
					"type": "section",
					"text": {
						"type": "mrkdwn",
						"text": `${message}`,
					},
				}
			],
		});

		//return all inputs as outputs for consumption in subsequent functions
		return {
			outputs: { message }
		}
});
