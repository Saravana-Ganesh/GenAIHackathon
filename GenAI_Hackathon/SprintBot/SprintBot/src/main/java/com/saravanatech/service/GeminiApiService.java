package com.saravanatech.service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeminiApiService {
	@Value("${gemini.api.key}")
	private String apiKey;

	private final RestTemplate restTemplate;

	public GeminiApiService(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	private static final String GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=";

	public String getGeminiResponse(String userPrompt) {
		String url = GEMINI_API_URL + apiKey;

		// Request body
		Map<String, Object> requestBody = Map.of("contents",
				Collections.singletonList(Map.of("parts", Collections.singletonList(Map.of("text", userPrompt)))));

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

		// Send request
		ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, request, Map.class);

		// Extract response
		if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
			/*
			 * Map<?, ?> firstCandidate = ((Map<?, ?>) ((java.util.List<?>)
			 * response.getBody().get("candidates")).get(0));
			 * 
			 * return (String) ((Map<?, ?>) ((java.util.List<?>)
			 * firstCandidate.get("content")).get(0)).get("text");
			 */
			 Object candidatesObj = response.getBody().get("candidates");

			    if (candidatesObj instanceof List<?> candidatesList && !candidatesList.isEmpty()) {
			        Object firstCandidateObj = candidatesList.get(0);

			        if (firstCandidateObj instanceof Map<?, ?> firstCandidate) {
			            Object contentObj = firstCandidate.get("content");

			            if (contentObj instanceof Map<?, ?> contentMap) { // Fix: Expecting a Map, not a List
			                Object partsObj = contentMap.get("parts");

			                if (partsObj instanceof List<?> partsList && !partsList.isEmpty()) {
			                    Object textObj = partsList.get(0);

			                    if (textObj instanceof Map<?, ?> textMap) {
			                        return (String) textMap.get("text"); // Extracting "text" safely
			                    }
			                }
			            }
			        }
			    }
		}

		return "Error: Unable to fetch response from Gemini API";
	}
}
