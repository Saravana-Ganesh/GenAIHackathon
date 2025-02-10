package com.saravanatech.controller;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.saravanatech.entity.UserEntity;
import com.saravanatech.repository.UserRepository;
import com.saravanatech.util.JwtUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {
	private final UserRepository userRepository;
	private final JwtUtil jwtUtil;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
		this.userRepository = userRepository;
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/signup")
	public String signup(@RequestBody UserEntity user) {
		Optional<UserEntity> existingUser = userRepository.findByUserName(user.getUserName());
		if (!existingUser.isPresent()) {
			user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash password
			userRepository.save(user);
			return "User registered successfully!";
		}
		return "User Already Exists";
	}

	@PostMapping("/login")
	public String login(@RequestBody UserEntity user) {
		Optional<UserEntity> existingUser = userRepository.findByUserName(user.getUserName());
		if (existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
			return jwtUtil.generateToken(user.getUserName()); // Return JWT token
		} else {
			return "Invalid credentials!";
		}
	}
}
