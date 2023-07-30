import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
//import MessageWorkFlow from "../workflows/message_workflow.ts";

export const TypeHello = DefineFunction({
	callback_id: "type_hello_function",
	title: "Type Hello",
	description: "Type Hello",
	source_file: "functions/type_hello_function.ts",
	input_parameters: {
		properties: {
			recipient:{
				type: Schema.slack.types.user_id,
				description: "recipient"
			},
			message: {
				type: Schema.types.string,
				description: "message",
			}
		},
		required: ["message", "recipient"],
	},
	output_parameters: {
		properties: {
			greeting: {
				type: Schema.types.string,
				description: "message"
			}
		},
		required: ["greeting"],
	},
});

export default SlackFunction(
	TypeHello, 
	({ inputs }) => {

		const { recipient, message } = inputs;
		
		// Send a message to channel using a nicely formatted
		// message using block elements from Block Kit.
		// https://api.slack.com/block-kit
		
		const greeting = `<@${recipient}> :wave: says ${message}`
		
		console.log("output: ", greeting)
		
		return { outputs: { greeting }};
	}
);
