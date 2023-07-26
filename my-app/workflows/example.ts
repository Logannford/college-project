import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { TypeHello } from "../functions/type_hello.ts";

const TypeHelloWorkflow = DefineWorkflow({
	callback_id: "type_hello",
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
		},
		required: ["channel", "interactivity"],
	},
})

const inputForm = TypeHelloWorkflow.addStep(
	Schema.slack.functions.OpenForm,
	{
		title: "Message Input Form",
		interactivity: TypeHelloWorkflow.inputs.interactivity,
		submit_label: "Submit",
		fields: {
			elements: [{
				name: "message",
				title: "Message to display",
				type: Schema.types.string,
				long: true
			}],
			required: ["message"],
		},
	},
);

TypeHelloWorkflow.addStep(
	TypeHello,
	{
		channel: inputForm.outputs.channel,
		submitting_user: inputForm.outputs.submitting_user,
		message: inputForm.outputs.message
	}
);

export default TypeHelloWorkflow;
