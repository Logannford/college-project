import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { TypeHello } from "../functions/type_hello.ts";

const TypeHelloWorkflow = DefineWorkflow({
	callback_id: "type_hello_workflow",
	title: "Type Hello",
	description: "Type Hello",
	input_parameters: {
		properties: {
			interactivity: {
				type: Schema.slack.types.interactivity,
			},
			channel: {
				type: Schema.slack.types.channel_id,
			},
			message: {
				type: Schema.types.string
			}
		},
		required: [],
	},
});

const inputForm = TypeHelloWorkflow.addStep(
	Schema.slack.functions.OpenForm,
	{
		title: "Message Input Form",
		interactivity: TypeHelloWorkflow.inputs.interactivity,
		submit_label: "Submit",
		fields: {
			elements: [
				{
					name: "message",
					title: "Message to display",
					type: Schema.types.string,
					long: true
				},
				{
					name: "channel",
					title: "Channel to send message to",
					type: Schema.slack.types.channel_id,
					default: TypeHelloWorkflow.inputs.channel,
				},
				{
					name: "submitting_user",
					title: "submitting_user",
					type: Schema.slack.types.submitting_user,
				}
			],	
			required: ["message", "channel", "submitting_user"],
		},
	},
);

TypeHelloWorkflow.addStep(
	TypeHello,
	{
		channel: inputForm.outputs.fields.channel,
		submitting_user: inputForm.outputs.fields.submitting_user,
		message: inputForm.outputs.fields.message
	}
);

export default TypeHelloWorkflow;
