import { Trigger } from "deno-slack-api/types.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";
import ExampleWorkflow from "../workflows/example.ts";

const trigger: Trigger<typeof ExampleWorkflow.definition> = {
	type: TriggerTypes.Scheduled,
	name: "scheduled_trigger",
	workflow: `#/workflows/${ExampleWorkflow.definition.callback_id}`,
	inputs: {
		channel: {
			value: "{{ExampleWorkflow.definition.inputs.channel}}"
		},
		submitting_user: {
			value: ExampleWorkflow.definition.inputs.submitting_user
		},
		message: {
			value: ExampleWorkflow.definition.inputs.message
		}
	},
	schedule: {
		start_time: new Date(new Date().getTime() + 60000).toISOString(),
		end_time: "2023-12-22T23:59:59Z",
		frequency: {
			type: "seconds",
			repeats_every: 10
		},
	}
};

export default trigger;