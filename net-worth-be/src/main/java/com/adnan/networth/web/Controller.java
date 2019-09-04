package com.adnan.networth.web;

import com.adnan.networth.objs.Resource;
import com.adnan.networth.service.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
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

    @GetMapping(path = "/currencies")
    public Map<String, String> getCurrency(@PathVariable String type) {
        Map<String, String> ret = new HashMap<String, String>();
        ret.put("currency", this.service.getCurrentCurrency());
        return ret;
    }

    @PatchMapping(path = "/currencies", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void updateCurrency(@PathVariable String type, @RequestBody Map<String, String> curr) {
        this.service.setCurrency(curr.get("currency"));
    }

    @GetMapping()
    public Iterable<Resource> getResources(@PathVariable String type) throws UnsupportedEncodingException {
        return this.service.getResources(type);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Iterable<Resource> addResource(@RequestBody Map<String, String> target, @PathVariable String type) {
         return this.service.addResource(type, target);
    }

    @DeleteMapping()
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

    @DeleteMapping(path="/items")
    public Map<String, String> deleteItemFromResource(@RequestParam String prop, @RequestParam String item, @PathVariable String type) throws UnsupportedEncodingException {
        Map<String, String> data = new HashMap<String, String>();
        String s = this.service.deleteResourceItem(type,
                java.net.URLDecoder.decode(prop, StandardCharsets.UTF_8.name()),
                java.net.URLDecoder.decode(item, StandardCharsets.UTF_8.name())) ? item : null;
        data.put("data", s);
        return data;
    }
}
