import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { TypeHello } from "../functions/type_hello.ts";

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
		required: ["interactivity"],
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
					type: Schema.slack.types.user_id,
				}
			],	
			required: ["submitting_user", "channel", "message"],
		},
	},
);

TypeHelloWorkflow.addStep(
    TypeHello,
    {
        interactivity: inputForm.outputs.fields.interactivity,
        channel: inputForm.outputs.fields.channel,
        message: inputForm.outputs.fields.message
    }
);


export default TypeHelloWorkflow;
