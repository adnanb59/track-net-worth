package com.adnan.networth.objs;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.ArrayList;
import java.util.HashMap;

@Embeddable
public class Resource {
    public final String key;
    public HashMap<String, Item> items;
    private double total;

    public Resource(String key) {
        this.key = key;
        items = new HashMap<String, Item>();
        total = 0;
    }

    public void addItem(Item item) {
        items.put(item.label, item);
        total += item.value;
    };

    public Iterable<Item> getItems() {
        return items.values();
    };

    public double updateItem(String key, double val) {
        double v = val - items.get(key).value;
        total += v;
        items.get(key).updateItem(val);
        return v;
    }

    public double getTotal() {
        return total;
    }

    public void removeItem(String key) {
        total -= items.get(key).value;
        items.remove(key);
    }

    public boolean equals(Resource r) {
        return r.key == this.key;
    };
}
