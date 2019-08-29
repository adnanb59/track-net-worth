package com.adnan.networth.web;

import com.adnan.networth.objs.Resource;
import com.adnan.networth.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/{type}")
public class Controller {
    @Autowired
    private Service service;

    public Controller(Service service) {
        this.service = service;
    }

    @GetMapping()
    public Iterable<Resource> getResources(@PathVariable String type) throws UnsupportedEncodingException {
        return this.service.getResources(type);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Resource> addResource(@RequestBody Map<String, String> target, @PathVariable String type) {
         return this.service.addResource(type, target);
    }

    @DeleteMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Resource> deleteResource(@RequestParam String prop, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.deleteResource(type, cleanProp);
    }

    @PostMapping(path="/items", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Resource addItemToResource(@RequestParam String prop, @RequestBody Map<String, Double> item, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.addResourceItem(type, cleanProp, item);
    }

    @PatchMapping(path="/items", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Resource updateItemToProperty(@RequestParam String prop, @RequestBody Map<String, Double> item, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.updateResourceItem(type, cleanProp, item);
    }

    @DeleteMapping(path="/items", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Resource deleteItemFromResource(@RequestParam String prop, @RequestBody Map<String, Double> item, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.deleteResourceItem(type, cleanProp, item);
    }
}
