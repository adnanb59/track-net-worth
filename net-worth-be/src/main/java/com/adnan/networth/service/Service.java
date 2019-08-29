package com.adnan.networth.service;

import com.adnan.networth.objs.Item;
import com.adnan.networth.objs.Property;
import com.adnan.networth.objs.Resource;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class Service {
    private Map<String, Property> repo;

    public Service() {
        repo = new HashMap<String, Property>();
        repo.put("assets", new Property("assets"));
        repo.get("assets").addResource(new Resource("Cash and Investments"));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Chequing", 2000));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Savings for Taxes", 4000));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Rainy Day Fund", 506));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Savings for Fun", 5000));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Savings for Travel", 400));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Savings for Personal Development", 200));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Investment 1", 5000));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Investment 2", 60000));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Investment 3", 30000));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Investment 4", 50000));
        repo.get("assets").resources.get("Cash and Investments").addItem(new Item("Investment 5", 24000));
        repo.get("assets").addResource(new Resource("Long Term Assets"));
        repo.get("assets").resources.get("Long Term Assets").addItem(new Item("Primary Home", 455000));
        repo.get("assets").resources.get("Long Term Assets").addItem(new Item("Second Home", 1564321));
        repo.get("assets").resources.get("Long Term Assets").addItem(new Item("Other", 0));
        repo.put("liabilities", new Property("liabilities"));
        repo.get("liabilities").addResource(new Resource("Short Term Liabilities"));
        repo.get("liabilities").resources.get("Short Term Liabilities").addItem(new Item("Credit Card 1", 4342));
        repo.get("liabilities").resources.get("Short Term Liabilities").addItem(new Item("Credit Card 2", 322));
        repo.get("liabilities").resources.get("Short Term Liabilities").addItem(new Item("(others...)", 0));
        repo.get("liabilities").addResource(new Resource("Long Term Debt"));
        repo.get("liabilities").resources.get("Long Term Debt").addItem(new Item("Mortgage 1", 250999));
        repo.get("liabilities").resources.get("Long Term Debt").addItem(new Item("Mortgage 2", 632634));
        repo.get("liabilities").resources.get("Long Term Debt").addItem(new Item("Line of Credit", 10000));
        repo.get("liabilities").resources.get("Long Term Debt").addItem(new Item("Investment Loan", 10000));
        repo.get("liabilities").resources.get("Long Term Debt").addItem(new Item("Student Loan", 0));
        repo.get("liabilities").resources.get("Long Term Debt").addItem(new Item("Car Loan", 0));
    }

    public Iterable<Resource> getResources(String type) {
        Property ret = this.repo.get(type);
        return ret.resources.values();
    }

    public Iterable<Resource> addResource(String type, Map<String, String> target) {
        Property ret = this.repo.get(type);
        String s = target.get("name");
        if (!ret.resources.containsKey(s)) {
            ret.addResource(new Resource(s));
            this.repo.put(type, ret);
        }
        return ret.resources.values();
    }

    public Iterable<Resource> deleteResource(String type, String asset) {
        Property ret = this.repo.get(type);
        ret.deleteResource(asset);
        this.repo.put(type, ret);
        return ret.resources.values();
    }

    public Resource addResourceItem(String type, String asset, Map<String, Double> item) {
        Property ret = this.repo.get(type);
        String s = item.keySet().iterator().next();
        if (!ret.resources.get(asset).items.containsKey(s)) {
            ret.resources.get(asset).addItem(new Item(s, item.get(s)));
            this.repo.put(type, ret);
        }
        return ret.resources.get(asset);
    }

    public Resource updateResourceItem(String type, String asset, Map<String, Double> item) {
        Property ret = this.repo.get(type);
        System.out.println(item);
        String s = item.keySet().iterator().next();
        if (ret.resources.get(asset).items.containsKey(s)) {
            ret.resources.get(asset).updateItem(s, item.get(s));
            this.repo.put(type, ret);
        }
        return ret.resources.get(asset);
    }

    public Resource deleteResourceItem(String type, String asset, Map<String, Double> item) {
        Property ret = this.repo.get(type);
        String s = item.keySet().iterator().next();
        if (!ret.resources.get(asset).items.containsKey(s)) {
            ret.resources.get(asset).removeItem(s);
            this.repo.put(type, ret);
        }
        return ret.resources.get(asset);
    }
}
