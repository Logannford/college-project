import { HTTP_CAT, OPPENHEIMER } from "./constants.ts";

// deno-lint-ignore no-explicit-any
export default function sendMessageBlocks(inputs: any): any[] {
  return [
    {
      type: "actions",
      block_id: "gif-selection",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Oppenheimer",
          },
          action_id: OPPENHEIMER,
        },
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "HTTP Cat",
          },
          action_id: HTTP_CAT,
        },
      ],
    },
  ];
}
