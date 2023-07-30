import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { TypeHello } from "../functions/type_hello_function.ts";

export const TypeHelloWorkflow = DefineWorkflow({
	callback_id: "send_message_workflow",
	title: "Type Hello",
	description: "Type Hello",
	input_parameters: {
		properties: {
			interactivity: {
				type: Schema.slack.types.interactivity,
				description: "interactivity",
			},
			channel: {
				type: Schema.slack.types.channel_id,
				description: "channel",
			}
		},
		required: ["interactivity"]
	},
});

const inputForm = TypeHelloWorkflow.addStep(
	Schema.slack.functions.OpenForm,
	{
		title: "Choose a photo!",
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
					name: "submitting_user",
					title: "submitting_user",
					type: Schema.slack.types.user_id,
				}
			],	
			required: ["submitting_user", "message"],
		},
	},
);

const test = TypeHelloWorkflow.addStep(
	TypeHello,
	{
		recipient: inputForm.outputs.fields.submitting_user,
		message: inputForm.outputs.fields.message,
	}
)

TypeHelloWorkflow.addStep(
    Schema.slack.functions.SendMessage,
    {
        message: test.outputs.greeting,
				channel_id: TypeHelloWorkflow.inputs.channel,
    }
);

export default TypeHelloWorkflow;
