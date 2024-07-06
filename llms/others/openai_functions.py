from openai import OpenAI
import json
import os


def get_current_weather(location, unit="fahrenheit"):
    return json.dumps({
        "location": location,
        "temperature": "72",
        "unit": unit,
        "forecast": ["sunny", "windy"],
    })


client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))

get_current_weather_function = {
    "name": "get_current_weather",
    "description": "Get the current weather in a given location",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The city and state, e.g. San Francisco, CA",
            },
            "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
        },
        "required": ["location"],
    },
}

user_message = {
    "role": "user",
    "content": "What's the weather like in Boston?"
}

completion = client.chat.completions.create(
    model="gpt-4",
    messages=[user_message],
    functions=[get_current_weather_function],
    function_call="auto"
)

function_call = completion.choices[0].message.function_call

if function_call:
    print(f"Function call: {function_call}")
    args = json.loads(function_call.arguments)
    print(f"Arguments: {args}")
    result = get_current_weather(**args)
    print(f"Result: {result}")
