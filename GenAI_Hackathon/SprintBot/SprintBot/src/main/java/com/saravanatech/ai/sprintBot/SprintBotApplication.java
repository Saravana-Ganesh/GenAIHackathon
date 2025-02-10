package com.saravanatech.ai.sprintBot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages="com.saravanatech")
@EnableJpaRepositories(basePackages = "com.saravanatech.repository")
@EntityScan(basePackages = "com.saravanatech.entity")
public class SprintBotApplication {

	public static void main(String[] args) {
		SpringApplication.run(SprintBotApplication.class, args);
	}

}
