package com.saravanatech.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saravanatech.service.GeminiApiService;
import com.saravanatech.service.OpenAIService;

@RestController
@RequestMapping("/api")
public class ChatController {
	private final OpenAIService openAIService;
	private final GeminiApiService geminiApiService;

    public ChatController(OpenAIService openAIService,GeminiApiService geminiApiService) {
        this.openAIService = openAIService;
        this.geminiApiService = geminiApiService;
    }

    @PostMapping("/chat")
    public String chat(@RequestBody String userMessage) {
        return geminiApiService.getGeminiResponse(userMessage);
    }
    
    @GetMapping("test")
    public String test1() { 
    	return "Hello world";
    }
}
