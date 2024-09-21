import json
import boto3

# Initialize the Bedrock client
bedrock_runtime = boto3.client(service_name="bedrock-runtime")

def generate_embedding(text):
    """
    Generate an embedding for the given text using Amazon Titan embedding model.
    """
    body = json.dumps({"inputText": text})
    
    response = bedrock_runtime.invoke_model(
        modelId="amazon.titan-embed-text-v1",
        contentType="application/json",
        accept="application/json",
        body=body
    )
    
    response_body = json.loads(response['body'].read())
    return response_body['embedding']

def query_bedrock(prompt, model_id="mistral.mistral-small-2402-v1:0"):
    """
    Query the Bedrock model with a given prompt.
    """
    body = json.dumps({
        "prompt": f"<s>[INST] {prompt} [/INST]",
        "max_tokens": 300,
        "temperature": 0.7,
        "top_p": 0.9,
        "top_k": 50
    })
    
    response = bedrock_runtime.invoke_model(
        body=body,
        modelId=model_id,
        accept='application/json',
        contentType='application/json'
    )
    
    response_body = json.loads(response['body'].read())
    print(response_body['outputs'][0]['text'])
    return response_body['outputs'][0]['text']

if __name__ == "__main__":
    # Generate embedding
    sample_text = "VALORANT is a tactical first-person shooter game developed by Riot Games."
    embedding = generate_embedding(sample_text)
    print(f"Embedding (first 5 dimensions): {embedding[:5]}")
    
    # Query the model
    prompt = "Explain the basic concept of VALORANT in one sentence."
    response = query_bedrock(prompt)
    print(f"Model response: {response}")