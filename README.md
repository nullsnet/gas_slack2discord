# gas_slack2discord
Convert Slack format webhook to Discord format, and post it to Discord.

## Description
* Convert Slack format Webhook payload to Discord format.
* Convert Slack format web link to markdown format.
* Post to specified Discord Webhook.
* **Supports conversion Slack Channel to Discord Webhook.**

## Usage
1. Get Discord Webhook URL.
2. Extract `{webhook.id}` and `{webhook.token}` from Webhook URL, and URL encode.
   i.e., `https://discordapp.com/api/webhooks/{webhook.id}/{webhook.token}` -> `{webhook.id}%2F{webhook.token}`
3. Post to `https://script.google.com/macros/s/AKfycbyFjUJiMhn_eeYgXCZ6ekmR9TZ-S_2QKdygn9cePw9L6_3lzt8/exec?url={webhook.id}%2F{webhook.token}` with Slack format JSON payload. Or regist this URL to your Slack Webhook service.

### GET Parameter
| Parameter                                        | Details                                                          |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| `url={webhook.id}%2F{webhook.token}`             | Default post URL                                                 |
| `{slack_channel}={webhook.id}%2F{webhook.token}` | If the Slack channel is specified by JSON payload, use this. |

### POST Payload
| [Slack](https://bit.ly/2tXEJKV) | [Discord](https://bit.ly/2HDkBHW) | Conversion |
| ------------------------------- | --------------------------------- | ---------- |
| `text`                          | `content`                         |            |
| `username`                      | `username`                        |            |
| `avatar_url`                    | `icon_url`                        |            |
| `attachment.author_name`        | `embed.author.name`               |            |
| `attachment.author_link`        | `embed.author.link`               | URL Encode |
| `attachment.title`              | `embed.title`                     |            |
| `attachment.title_link`         | `embed.link`                      |            |
| `attachment.text`               | `embed.description`               |            |
| `attachment.color`              | `embed.color`                     | HEX to DEC |

## Supported Services
* Growi Slack Incoming Webhooks
* GitLab Slack Integration
* redmine_messenger