package com.adnan.networth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(scanBasePackages = "com.adnan.networth")
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
public class NetworthApplication {
	public static void main(String[] args) {
		SpringApplication.run(NetworthApplication.class, args);
	}
}
