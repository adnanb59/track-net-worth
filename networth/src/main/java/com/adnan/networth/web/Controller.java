package com.adnan.networth.web;

import com.adnan.networth.objs.Resource;
import com.adnan.networth.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/{type}")
@CrossOrigin(origins = "http://localhost:4200")
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

    @PostMapping()
    public Iterable<Resource> addResource(@RequestBody Map<String, String> target, @PathVariable String type) {
         return this.service.addResource(type, target);
    }

    @DeleteMapping()
    public Iterable<Resource> deleteResource(@RequestParam String prop, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.deleteResource(type, cleanProp);
    }

    @PostMapping("/items")
    public Resource addItemToResource(@RequestParam String prop, @RequestBody Map<String, Double> item, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.addResourceItem(type, cleanProp, item);
    }

    @PatchMapping("/items")
    public Resource updateItemToProperty(@RequestParam String prop, @RequestBody Map<String, Double> item, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.updateResourceItem(type, cleanProp, item);
    }

    @DeleteMapping("/items")
    public Resource deleteItemFromResource(@RequestParam String prop, @RequestBody Map<String, Double> item, @PathVariable String type) throws UnsupportedEncodingException {
        String cleanProp = java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name());
        return this.service.deleteResourceItem(type, cleanProp, item);
    }
}
