import { Trigger } from "deno-slack-api/types.ts";
import { TriggerContextData, TriggerTypes } from "deno-slack-api/mod.ts";
import messageWorkFlow from "../workflows/message_workflow.ts";

const messageTrigger: Trigger<typeof messageWorkFlow.definition> = {
	type: TriggerTypes.Shortcut,
	name: "Send a message",
	description: "send a message to a channel",
	workflow: `#/workflows/send_message_workflow`,
	inputs: {
		interactivity: {
			value: TriggerContextData.Shortcut.interactivity,
		},
		channel: {
			value: TriggerContextData.Shortcut.channel_id,
		}
	},
};

export default messageTrigger;