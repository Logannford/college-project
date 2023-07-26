import { Trigger } from "deno-slack-api/types.ts";
import messageWorkFlow from "../workflows/message_workflow.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";

const trigger: Trigger<typeof messageWorkFlow.definition> = {
	type: TriggerTypes.Shortcut,
	name: "Test Trigger",
	description: "Test Trigger",
	workflow: `#/workflows/type_hello_workflow`,
	inputs: {
		interactivity: {
			value: TriggerContextData.Shortcut.interactivity,
		},
		channel: {
			value: TriggerContextData.Shortcut.channel_id,
		},
		message: {
			value: TriggerContextData.Shortcut.message,
			customizable: true,
		},
	},
};

export default trigger;