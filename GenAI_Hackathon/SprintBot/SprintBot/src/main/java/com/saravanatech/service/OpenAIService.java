package com.saravanatech.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.core.JsonValue;
import com.openai.models.ChatCompletionCreateParams;
import com.openai.models.ChatModel;
import com.openai.models.ResponseFormatJsonSchema;
import com.openai.models.ResponseFormatJsonSchema.JsonSchema;

@Service
public class OpenAIService {
	@Value("${openai.api.key}")
	private String openaiApiKey;

	public String getResponse(String userMessage) {
		OpenAIClient openAIClient = OpenAIOkHttpClient.builder()
                .apiKey(openaiApiKey)
                .build();
		JsonSchema.Schema schema = JsonSchema.Schema.builder()
                .putAdditionalProperty("type", JsonValue.from("object"))
                .putAdditionalProperty("properties", JsonValue.from(
                        Map.of("employees", Map.of("items", Map.of("type", "string")))))
                .build();

        ChatCompletionCreateParams createParams = ChatCompletionCreateParams.builder()
                .model(ChatModel.GPT_4O_MINI)
                .maxCompletionTokens(2048)
                .responseFormat(ResponseFormatJsonSchema.builder()
                        .jsonSchema(JsonSchema.builder()
                                .name("employee-list")
                                .schema(schema)
                                .build())
                        .build()) 
                .addUserMessage("Who works at OpenAI?")
                .build();

		return openAIClient.chat()
                .completions()
                .create(createParams)
                .choices()
                .stream()
                .flatMap(choice -> choice.message().content().stream())
                .findFirst()
                .orElse("No response");
    }
	
}
